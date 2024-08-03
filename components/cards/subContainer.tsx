import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Modal, Pressable, useWindowDimensions, ScrollView } from "react-native";
import { ThemedView } from '../themed/ThemedView';
import { ThemedText } from '../themed/ThemedText';

import { useSelector } from 'react-redux';
import { RootReducer } from '@/store';

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
        <ScrollView horizontal>
            <View style={[styles.cardsContainer,]}>
                {props.cards?.map((card, _index) => (
                    <SubCard key={_index} index={_index} card={card} card_actions={props.cards_action} get_selected_card={props.get_selected_card} />
                )
                )}
            </View>
        </ScrollView>
    )
}

// CARDS
const card_list: CardProps[] = [
    // Artefatos
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Arca da Aliança.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Arca de Noé.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Botas do Evangélho.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Cajado de Moisés.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Capacete da Salvação.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Cinturão da Verdade.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Couraça da Justiça.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Escudo da Fé.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Espada do Espírito.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Artefatos/Os 10 Mandamentos.png"),
    },
    // Heróis
    {
        slug: "abraao",
        path: require("@/assets/images/Cards/Heróis/Abraão.png"),
    },
    {
        slug: "adao",
        path: require("@/assets/images/Cards/Heróis/Adão.png"),
    },
    {
        slug: "daniel",
        path: require("@/assets/images/Cards/Heróis/Daniel.png"),
    },
    {
        slug: "davi",
        path: require("@/assets/images/Cards/Heróis/Davi.png"),
    },
    {
        slug: "elias",
        path: require("@/assets/images/Cards/Heróis/Elias.png"),
    },
    {
        slug: "ester",
        path: require("@/assets/images/Cards/Heróis/Ester.png"),
    },
    {
        slug: "eva",
        path: require("@/assets/images/Cards/Heróis/Eva.png"),
    },
    {
        slug: "jaco",
        path: require("@/assets/images/Cards/Heróis/Jacó.png"),
    },
    {
        slug: "jose-do-egito",
        path: require("@/assets/images/Cards/Heróis/José do Egito.png"),
    },
    {
        slug: "josue",
        path: require("@/assets/images/Cards/Heróis/Josué.png"),
    },
    {
        slug: "maria",
        path: require("@/assets/images/Cards/Heróis/MAria.png"),
    },
    {
        slug: "moises",
        path: require("@/assets/images/Cards/Heróis/Moisés.png"),
    },
    {
        slug: "noe",
        path: require("@/assets/images/Cards/Heróis/Noé.png"),
    },
    {
        slug: "salomao",
        path: require("@/assets/images/Cards/Heróis/Salomão.png"),
    },
    {
        slug: "sansao",
        path: require("@/assets/images/Cards/Heróis/Sansão.png"),
    },
    // Lendárias
    {
        slug: "",
        path: require("@/assets/images/Cards/Lendárias/Davi.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Lendárias/Josué.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Lendárias/Moisés.png"),
    },
    // Milagres
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Cordeiro de Deus.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Dilúvio.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Fogo do Céu.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Força de Sansão.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Liberação Celestial.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/No Céu Tem Pão.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Passagem Segura.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Proteção Divina.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Ressurreição.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Restauração da Fé.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Sabedoria de Salomão.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Milagres/Sarça Ardente.png"),
    },
    // Pecados
    {
        slug: "",
        path: require("@/assets/images/Cards/Pecados/Fruto Proibido.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Pecados/Idolatria.png"),
    },
    {
        slug: "",
        path: require("@/assets/images/Cards/Pecados/Traição.png"),
    },
    // Sabedoria
    {
        slug: "wisdom_card_0",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
    {
        slug: "wisdom_card_1",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
    {
        slug: "wisdom_card_2",
        path: require("@/assets/images/Cards/Sabedoria/wisdom_card_0.png")
    },
]

var default_card = require('@/assets/images/Cards/Card.png')
var not_defense = require('@/assets/images/Cards/not-defense.png')


type Props = {
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    index?: number;
    // target_slug?: string;
    card_actions?: React.ReactNode;
    get_selected_card?: (card_index: number) => void;
}

function getCardSource(slug: string | undefined) {
    if (!slug) {
        return default_card
    }
    if (slug === "not-defense") {
        return not_defense
    }
    for (const card of card_list) {
        if (card.slug === slug) {
            return card.path
        }
    }
}

function isCardInList(card_id: string, card_list: CardProps[]) {
    let card_founded = false;
    card_list.map(_card => {
        if (_card.in_game_id == card_id) {
            card_founded = true;
        }
    })
    return card_founded
}

function SubCard(props: Props) {
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
                        source={getCardSource(props.card?.slug)}
                    />
                </Pressable>
            </View>

            <Modal visible={showModal} transparent animationType='fade' >
                <ThemedView
                    style={{ flex: 1 }}
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
                                source={getCardSource(props.card?.slug)}
                            />
                        </Pressable>
                    </View>
                </ThemedView>
            </Modal>
        </>
    )
}
