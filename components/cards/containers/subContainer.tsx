import React, { useState } from 'react';
import { View, Image, StyleSheet, Modal, Pressable, ScrollView } from "react-native";
import { ThemedView } from '../../themed/ThemedView';

import { useSelector } from 'react-redux';
import { RootReducer } from '@/store';
import { useCards, isCardInList } from '@/hooks/useCards';
import { ThemedText } from '../../themed/ThemedText';
import { useScreenSizes } from '@/hooks/useScreenSizes';

type CardsContainerProps = {
    cards?: CardProps[];
    cards_action?: React.ReactNode;
    get_selected_card?: (card_index: number) => void;
}

// SubContainer
export function SubCardsContainer(props: CardsContainerProps) {
    const styles = StyleSheet.create({
        cardsContainer: {
            // backgroundColor: "#000000cc",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,

            columnGap: 8,
            padding: 4,
        },
    })

    return (
        <View style={{ width: '100%', height: 230 }}>
            {props.cards?.length === 0 ?
                <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{ fontSize: 60, lineHeight: 200 }}>Sem cartas</ThemedText>
                </View> :
                <ScrollView horizontal>
                    <View style={[styles.cardsContainer]}>
                        {props.cards?.map((card, _index) => (
                            <SubCard key={_index} index={_index} card={card} card_actions={props.cards_action} get_selected_card={props.get_selected_card} />
                        )
                        )}
                    </View>
                </ScrollView>
            }
        </View>
    )
}


type Props = {
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    index?: number;
    // target_slug?: string;
    card_actions?: React.ReactNode;
    get_selected_card?: (card_index: number) => void;
}

function SubCard(props: Props) {
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight

    const { width: windowWidth } = useScreenSizes();
    const [showModal, setShowModal] = useState(false)

    // tamanho padrão
    //  width: 430,
    //  height: 600,
    const defaultWidth = windowWidth
    const defaultHeight = defaultWidth * 1.3
    const mediumFactor = 4 //Usado na Página de Cartas

    const styles = StyleSheet.create({
        image: {
            height: (defaultHeight / mediumFactor),
            width: (defaultWidth / mediumFactor),
            borderWidth: 2,
            borderRadius: 14,
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
            {/* <View style={{ alignSelf: isCardInList(props.card?.in_game_id!, cards_to_fight!) ? "flex-start" : "center", backgroundColor:'red' }}> */}
            <View style={{ alignSelf: "center" }}>
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
                </Pressable>
            </View>

            <Modal visible={showModal} transparent animationType='fade' >
                <ThemedView
                    style={{ flex: 1, maxWidth: windowWidth }}
                >
                    {/* Card Commands */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                        {props.card_actions}
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Pressable
                            onPress={() => {
                                setShowModal(!showModal)
                            }}
                            style={{ width: "90%", height: "70%" }}>
                            <Image
                                resizeMode="stretch"
                                style={[styles.image, { width: "100%", height: "100%" }]}
                                source={useCards({ card_slug: props.card?.slug })}
                            />
                            {/* Pontos de Ataque e Defesa */}
                            {props.card && props.card.in_game_id &&
                                <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                                    <View style={{ height: 60, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <ThemedView lightColor="#ffe600" darkColor="#585000" style={{ width: 60, height: 60, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                                            <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 32, fontWeight: 700, lineHeight: 60 }}>{props.card.attack_point}</ThemedText>
                                        </ThemedView>
                                        <ThemedView lightColor="#ff3838" darkColor="#421313" style={{ width: 60, height: 60, borderRadius: 40, alignItems: "center", justifyContent: "center" }}>
                                            <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 32, fontWeight: 700, lineHeight: 60 }}>{props.card.defense_points}</ThemedText>
                                        </ThemedView>
                                    </View>
                                </View>
                            }
                        </Pressable>
                    </View>
                </ThemedView>
            </Modal>
        </>
    )
}
