import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { isCardInList, useCards } from "@/hooks/useCards";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { RootReducer } from "@/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Modal, Image } from "react-native"
import { useSelector } from "react-redux";


type DefaultContainerProps = {
    cards: CardProps[],
    card_size?: "normal" | "medium" | "small" | "minimum";
    card_action_function?: (props: { card: CardProps, action_index: number }) => void;
    card_action_component: React.ReactNode;
    get_selected_card?: (card: CardProps) => void;
    show_action_in_bottom?: boolean;
    show_modal?: boolean;
    set_show_modal?: (show_modal: boolean) => void;

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
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: props.show_action_in_bottom ? 0 : 24, marginTop: props.show_action_in_bottom ? 24 :0 }}>
                                    {props.card_action_component}
                                </View>
                            }
                            {/* A carta em si */}
                            <Pressable
                                onPress={() => {
                                    if (props.set_show_modal) {
                                        props.set_show_modal(false)
                                    }
                                }}
                                style={{ width: "90%", height: "60%", position: "relative" }}>
                                <Image
                                    resizeMode="stretch"
                                    style={[{ width: "100%", height: "100%" }]}
                                    source={useCards({ card_slug: selectedCard.slug })}
                                />
                                {/* Pontos de Ataque e Defesa */}
                                {selectedCard.in_game_id && (selectedCard.card_type === 'hero' || selectedCard.card_type === 'legendary') &&
                                    <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                                        <View style={{ height: 60, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <ThemedView lightColor="#ffe600" darkColor="#585000" style={{ width: 60, height: 60, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                                                <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 32, fontWeight: 700, lineHeight: 60 }}>{selectedCard.attack_point}</ThemedText>
                                            </ThemedView>
                                            <ThemedView lightColor="#ff3838" darkColor="#421313" style={{ width: 60, height: 60, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                                                <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 32, fontWeight: 700, lineHeight: 60 }}>{selectedCard.defense_points}</ThemedText>
                                            </ThemedView>
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
    unavailable?: boolean,
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
                    {/* Overlay para cartas não disponíveis */}
                    {props.unavailable && <View style={{ width: '100%', height: '100%', backgroundColor: '#000a', position: 'absolute', zIndex: 1, borderRadius: 10 }} />}
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
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    const { width: windowWidth, height: windowHeight } = useScreenSizes();
    const [current_card_id, setCurrentCardId] = useState('')

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

    useEffect(() => {
        if (props.card?.in_game_id) {
            setCurrentCardId(props.card?.in_game_id!.split('_')[0])
        }
    }, [props.card])

    return (
        <View>
            {isCardInList(props.card?.in_game_id!, cards_to_fight!) &&
                <ThemedText style={{ position: 'absolute', zIndex: 1, lineHeight: 80 }}>
                    <MaterialCommunityIcons name="sword" size={80} color="#000000" />
                </ThemedText>
            }
            {/* Overlay para cartas não ready */}
            {props.card?.status !== 'ready' && String(player.id) === current_card_id && <View style={{ width: '100%', height: '100%', backgroundColor: '#000a', position: 'absolute', zIndex: 1, borderRadius: 10 }} />}
            <Image
                resizeMode="stretch"
                style={[cardSize, borderColor]}
                source={useCards({ card_slug: props.card?.slug })}
            />
            {/* Pontos de Ataque e Defesa */}
            {props.card?.in_game_id && (props.card?.card_type === 'hero' || props.card?.card_type === 'legendary') &&
                <View style={{ height: 30, width: '100%', position: 'absolute', bottom: 2, alignItems: 'center' }}>
                    <View style={{ height: 30, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <ThemedView lightColor="#ffe600" darkColor="#585000" style={{ flexGrow: 1, height: 30, borderTopStartRadius: 8, borderBottomStartRadius: 8, alignItems: "center", justifyContent: "center" }}>
                            <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.attack_point}</ThemedText>
                        </ThemedView>

                        <ThemedView lightColor="#ff3838" darkColor="#421313" style={{ flexGrow: 1, height: 30, borderTopEndRadius: 8, borderBottomEndRadius: 8, alignItems: "center", justifyContent: "center" }}>
                            <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.defense_points}</ThemedText>
                        </ThemedView>

                    </View>
                </View>
            }
        </View>
    )
}

type NotifyCardProps = {
    card_slug?: string; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
}

export function NotifyCard(props: NotifyCardProps) {

    return (
        <View>
            <Image
                resizeMode="stretch"
                style={{width:50, height:75}}
                source={useCards({ card_slug: props.card_slug })}
            />
        </View>
    )
}
