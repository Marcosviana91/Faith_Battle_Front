import React, { useState } from 'react';
import { View, Image, StyleSheet, Modal, Pressable, useWindowDimensions, ScrollView } from "react-native";
import { ThemedView } from '../themed/ThemedView';
import { ThemedText } from '../themed/ThemedText';
import { useCards, isCardInList } from '@/hooks/useCards';

// import { CardRetry, CardMoveToPrepare, CardMoveToBattle, CardToggleAttack, ShowCardDefense, CardToggleDefense, CardRetreatToPrepare } from "@/components/cards/cards_commands";

import { useSelector } from 'react-redux';
import { RootReducer } from '@/store';

type CardsContainerProps = {
    size?: "small" | "minimum" | "medium";
    zone?: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight" | "gallery";
    cards?: CardProps[];
    target_index?: number;
    target_slug?: string;
}

export function CardsContainer(props: CardsContainerProps) {
    const styles = StyleSheet.create({
        cardsContainer: {
            // backgroundColor: "#000000cc",
            height: props.size === 'small' ? "auto" : "100%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,

            columnGap: (props.zone == "select" || props.zone == "retry") ? 0 : 8,
            padding: (props.zone == "select" || props.zone == "retry") ? 0 : 4,
        },
    })

    console.log("Container target: " + props.target_slug)

    return (
        <ScrollView horizontal>
            <View style={[styles.cardsContainer]}>
                {props.cards?.map((card, _index) => (
                    <Card key={_index} index={props.target_index! >= 0 ? props.target_index : _index} card={card} size={props.size} zone={props.zone} target_slug={props.target_slug} />
                )
                )}
            </View>
        </ScrollView>
    )
}


type Props = {
    size?: "normal" | "medium" | "small" | "minimum";
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    card_action?: React.ReactNode;
    get_selected_card?: (card_index: number) => void;
    index?: number;

    in_game?: boolean;
    zone?: "gallery" | "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight"
    target_slug?: string;
}


export function Card(props: Props) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const fight_camp = useSelector((state: RootReducer) => state.matchReducer.match_data)?.fight_camp
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight

    const player_id = props.card?.in_game_id?.split("-")[0]
    const { width: windowWidth } = useWindowDimensions();
    const [showModal, setShowModal] = useState(false)

    // tamanho padrão
    //  width: 430,
    //  height: 600,
    const defaultWidth = windowWidth
    const defaultHeight = defaultWidth * 1.3
    const mediumFactor = 4 //Usado na Página de Cartas
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
    if (props.zone == "retry") { borderColor = styles.card_used }
    if (props.zone == "select") { borderColor = styles.card_ready }

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
                            {props.card_action}
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
