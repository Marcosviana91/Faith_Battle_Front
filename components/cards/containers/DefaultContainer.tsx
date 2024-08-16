import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { isCardInList, useCards } from "@/hooks/useCards";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { RootReducer } from "@/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Modal, Image } from "react-native"
import { useSelector } from "react-redux";


type DefaultContainerProps = {
    cards: CardProps[],
    card_size?: "normal" | "medium" | "small" | "minimum";
    card_action_function?: (props: { card: CardProps, action_index: number }) => void;
    card_action_component: React.ReactNode[];
    get_selected_card?: (card: CardProps) => void;
    show_action_in_bottom?: boolean;
    show_modal?: boolean;
    set_show_modal?: (show_modal:boolean)=>void;

}

export default function DefaultContainer(props: DefaultContainerProps) {
    const { width: windowWidth } = useScreenSizes();
    const [selectedCard, setSelectedCard] = useState<CardProps>()

    return (
        <>
            <View style={{ width: "100%" }}>
                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', gap: 2 }}>
                    {props.cards.map((card, _index) => (
                        <Pressable
                            key={_index}
                            onPress={() => {
                                setSelectedCard(card)
                                if (props.set_show_modal) {
                                    props.set_show_modal(true)
                                }
                                if (props.get_selected_card) {
                                    props.get_selected_card(card)
                                }
                            }}
                        >
                            <Card size={props.card_size} card={card} />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            {selectedCard && (
                <Modal visible={props.show_modal} transparent animationType='fade' >
                    <ThemedView
                        style={{ flex: 1, maxWidth: windowWidth }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: props.show_action_in_bottom ? "column-reverse" : 'column' }}>
                            {/* Card Commands */}
                            {selectedCard.status === 'ready' &&
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    {props.card_action_component.map((component, _index) => (
                                        <Pressable
                                            key={_index}
                                            style={{ marginBottom: 24 }}
                                            onPress={() => {
                                                if (props.card_action_function) {
                                                    props.card_action_function({ card: selectedCard, action_index: _index })
                                                }
                                                if (props.set_show_modal) {
                                                    props.set_show_modal(false)
                                                }
                                            }}>
                                            {component}
                                        </Pressable>
                                    ))}
                                </View>
                            }
                            {/* A carta em si */}
                            <Pressable
                                onPress={() => {
                                    if (props.set_show_modal) {
                                        props.set_show_modal(false)
                                    }
                                }}
                                style={{ width: "90%", height: "70%", position: "relative" }}>
                                <Image
                                    resizeMode="stretch"
                                    style={[{ width: "100%", height: "100%" }]}
                                    source={useCards({ card_slug: selectedCard.slug })}
                                />
                                {selectedCard.in_game_id  && (selectedCard.card_type === 'hero' || selectedCard.card_type === 'legendary' ) &&
                                    <View>
                                        <View style={{ backgroundColor: "yellow", position: 'absolute', width: 50, height: 50, borderRadius: 40, bottom: 24, left: 24, alignItems: "center", justifyContent: "center" }}>
                                            <ThemedText style={{ color: 'black', fontSize: 32, fontWeight: 700 }}>{selectedCard.attack_point}</ThemedText>
                                        </View>
                                        <View style={{ backgroundColor: "red", position: 'absolute', width: 50, height: 50, borderRadius: 40, bottom: 24, right: 24, alignItems: "center", justifyContent: "center" }}>
                                            <ThemedText style={{ color: 'black', fontSize: 32, fontWeight: 700 }}>{selectedCard.defense_points}</ThemedText>
                                        </View>
                                    </View>
                                }
                            </Pressable>
                        </View>
                    </ThemedView>
                </Modal>
            )}
        </>
    )
}


type SimpleCardProps = {
    size?: "normal" | "medium" | "small" | "minimum";
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
}

export function SimpleCard(props: SimpleCardProps) {
    const { width: windowWidth } = useScreenSizes();
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
            <View style={{ alignSelf: "center" }}>
                <Pressable
                    onPress={() => {
                        setShowModal(!showModal)
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
                    style={{ flex: 1, maxWidth: defaultWidth, alignItems: "center", justifyContent: "center" }}
                >
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
                    </Pressable>
                </ThemedView>
            </Modal>
        </>
    )
}

type Props = {
    size?: "normal" | "medium" | "small" | "minimum";
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
}

export function Card(props: Props) {
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight

    const { width: windowWidth, height: windowHeight } = useScreenSizes();

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
        <View>
            {isCardInList(props.card?.in_game_id!, cards_to_fight!) &&
                <ThemedText style={{ position: 'absolute', zIndex: 1, lineHeight: 80 }}>
                    <MaterialCommunityIcons name="sword" size={80} color="#000000" />
                </ThemedText>
            }
            {/* Overlay para cartas não ready */}
            {props.card?.status!=='ready' && <View style={{width:'100%', height:'100%', backgroundColor:'#000a', position:'absolute', zIndex:1, borderRadius:10}} />}
            <Image
                resizeMode="stretch"
                style={[cardSize, borderColor]}
                source={useCards({ card_slug: props.card?.slug })}
            />
        </View>
    )
}
