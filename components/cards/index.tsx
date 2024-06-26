import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";

export const card_list: CardProps[] = [
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
        path: require("@/assets/images/Cards/Artefatos/Botas do Evangélio.png"),
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
]

var default_card = require('@/assets/images/Cards/Card.png')


type Props = {
    slug?: string; //Caso não seja passado um ID, deve renderizar uma carta virada de costa
    size?: "normal" | "medium" | "small" | "minimum";
}

function getCardSource(slug: string|undefined) {
    if (!slug) {
        return default_card
    }
    for (const card of card_list) {
        if (card.slug === slug) {
            return card.path
        }
    }
}

export default function Card(props: Props) {
    const [showModal, setShowModal] = useState(false)
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

    return (
        <>
                <Pressable
                    onPress={() => {
                        setShowModal(!showModal)
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={cardSize}
                        source={getCardSource(props.slug)}
                    />
                </Pressable>

            <Modal visible={showModal} transparent animationType='fade' >
                <Pressable

                    onPress={() => {
                        setShowModal(!showModal)
                    }}
                >
                    <View style={{ width: '100%', height: "100%", backgroundColor: '#000c', alignItems: "center", justifyContent: "center" }}>
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={getCardSource(props.slug)}
                            />
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

// tamanho padrão
//  height: 600,
//  width: 430,
const defaultHeight = 600
const defaultWidth = 430
const mediumFactor = 4
const smallFactor = 6
const minimumFactor = 10

const styles = StyleSheet.create({
    image: {
        height: defaultHeight,
        width: defaultWidth,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 14,
    },
    imageMedium: {
        height: (defaultHeight / mediumFactor),
        width: (defaultWidth / mediumFactor),
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 12,
    },
    imageSmall: {
        height: (defaultHeight / smallFactor),
        width: (defaultWidth / smallFactor),
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 12,
    },
    imageMinimum: {
        height: (defaultHeight / minimumFactor),
        width: (defaultWidth / minimumFactor),
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 12,
    },
})