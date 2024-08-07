import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { isCardInList, useCards } from "@/hooks/useCards";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { RootReducer } from "@/store";
import { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Modal, Image } from "react-native"
import { useSelector } from "react-redux";


type DefaultContainerProps = {
    cards: CardProps[],
    card_size?: "normal" | "medium" | "small" | "minimum";
    card_action_function: (props: { card_slug: string }) => void;
    card_action_component: React.ReactNode;
    get_selected_card?: (card_index: number) => void;

}

export default function DefaultContainer(props: DefaultContainerProps) {
    return (
        <View>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', gap: 2 }}>
                {props.cards.map((card, _index) => (
                    <Card key={_index} size={props.card_size}
                        card={card} index={_index}
                        card_action_component={props.card_action_component}
                        card_action_function={props.card_action_function}
                        get_selected_card={props.get_selected_card} />
                ))}
            </ScrollView>
        </View>
    )
}


type Props = {
    size?: "normal" | "medium" | "small" | "minimum";
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    card_action_function: (props: { card_slug: string }) => void;
    card_action_component: React.ReactNode;

    get_selected_card?: (card_index: number) => void;
    index?: number;
}


function Card(props: Props) {
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight

    const { width: windowWidth, height: windowHeight } = useScreenSizes();
    const [showModal, setShowModal] = useState(false)

    // tamanho padrão
    //  width: 430,
    //  height: 600,
    const defaultWidth = windowWidth
    const defaultHeight = defaultWidth * 1.3
    const mediumFactor = 5 //Usado na seleção de cartas/retry
    const smallFactor = 6 // Usado na mão do jogador
    const minimumFactor = 8 // Usado no GameBoard

    const styles = StyleSheet.create({
        image: {
            height: defaultHeight,
            width: defaultWidth,
            borderWidth: 2,
            borderRadius: 14,
        },
        imageMedium: {
            height: (defaultHeight / mediumFactor),
            width: (defaultWidth / mediumFactor),
            borderWidth: 2,
            borderRadius: 12,
        },
        imageSmall: {
            height: (defaultHeight / smallFactor),
            width: (defaultWidth / smallFactor),
            borderWidth: 2,
            borderRadius: 12,
        },
        imageMinimum: {
            height: (defaultHeight / minimumFactor),
            width: (defaultWidth / minimumFactor),
            borderWidth: 2,
            borderRadius: 12,
        },
        card_ready: {
            borderColor: 'green',
        },
        card_used: {
            borderColor: 'red',
        },
        card_not_enough: {
            borderColor: 'grey',
        },
    })

    var cardSize = styles.image
    switch (props.size) {
        case 'medium':
            cardSize = styles.imageMedium
            break;
        case 'small':
            cardSize = styles.imageSmall
            break;

        case 'minimum':
            cardSize = styles.imageMinimum
            break;

        default:
            cardSize = styles.image
            break;
    }

    var borderColor = styles.card_ready
    switch (props.card?.status) {
        case 'ready':
            borderColor = styles.card_ready
            break;
        case 'used':
            borderColor = styles.card_used
            break;

        case 'not-enough':
            borderColor = styles.card_not_enough
            break;

        default:
            borderColor = styles.card_not_enough
            break;
    }

    return (
        <>
            <View style={{ alignSelf: isCardInList(props.card?.in_game_id!, cards_to_fight!) ? "flex-start" : "center" }}>
                <Pressable
                    onPress={() => {
                        setShowModal(!showModal)
                        if (props.get_selected_card && typeof (props.index) === "number") {
                            props.get_selected_card(props.index)
                        }
                    }}
                >
                    <Image
                        resizeMode="stretch"
                        style={[cardSize, borderColor]}
                        source={useCards({ card_slug: props.card?.slug })}
                    />
                </Pressable>
            </View>

            <Modal visible={showModal} transparent animationType='fade' >
                <ThemedView
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        {/* Card Commands */}
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <Pressable
                                onPress={() => {
                                    props.card_action_function({card_slug:props.card?.slug!})
                                    setShowModal(!showModal)
                                }}>
                                {props.card_action_component}
                            </Pressable>
                        </View>
                        <Pressable
                            onPress={() => {
                                setShowModal(!showModal)
                            }}
                            style={{ width: "90%", height: "70%", position: "relative" }}>
                            <Image
                                resizeMode="stretch"
                                style={[styles.image, { width: "100%", height: "100%" }]}
                                source={useCards({ card_slug: props.card?.slug })}
                            />
                            {props.card?.in_game_id &&
                                <View style={{ backgroundColor: "yellow", position: 'absolute', width: 50, height: 50, borderRadius: 40, bottom: 24, left: 24, alignItems: "center", justifyContent: "center" }}>
                                    <ThemedText style={{ color: 'black', fontSize: 32, fontWeight: 700 }}>{props.card?.attack_point}</ThemedText>
                                </View>
                            }
                            {props.card?.in_game_id &&
                                <View style={{ backgroundColor: "red", position: 'absolute', width: 50, height: 50, borderRadius: 40, bottom: 24, right: 24, alignItems: "center", justifyContent: "center" }}>
                                    <ThemedText style={{ color: 'black', fontSize: 32, fontWeight: 700 }}>{props.card?.defense_points}</ThemedText>
                                </View>
                            }
                        </Pressable>
                    </View>
                </ThemedView>
            </Modal>
        </>
    )
}
