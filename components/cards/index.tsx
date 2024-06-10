import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";

export const card_list: CardProps[] = [
    // Artefatos
    {
        path: require("@/assets/images/Cards/Artefatos/Arca da Aliança.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Arca de Noé.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Botas do Evangélio.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Cajado de Moisés.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Capacete da Salvação.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Cinturão da Verdade.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Couraça da Justiça.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Escudo da Fé.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Espada do Espírito.png"),
    },
    {
        path: require("@/assets/images/Cards/Artefatos/Os 10 Mandamentos.png"),
    },
    // Heróis
    {
        path: require("@/assets/images/Cards/Heróis/Abraão.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Adão.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Daniel.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Davi.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Elias.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Ester.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Eva.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Jacó.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/José do Egito.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Josué.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/MAria.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Moisés.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Noé.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Salomão.png"),
    },
    {
        path: require("@/assets/images/Cards/Heróis/Sansão.png"),
    },
    // Lendárias
    {
        path: require("@/assets/images/Cards/Lendárias/Davi.png"),
    },
    {
        path: require("@/assets/images/Cards/Lendárias/Josué.png"),
    },
    {
        path: require("@/assets/images/Cards/Lendárias/Moisés.png"),
    },
    // Milagres
    {
        path: require("@/assets/images/Cards/Milagres/Cordeiro de Deus.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Dilúvio.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Fogo do Céu.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Força de Sansão.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Liberação Celestial.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/No Céu Tem Pão.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Passagem Segura.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Proteção Divina.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Ressurreição.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Restauração da Fé.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Sabedoria de Salomão.png"),
    },
    {
        path: require("@/assets/images/Cards/Milagres/Sarça Ardente.png"),
    },
    // Pecados
    {
        path: require("@/assets/images/Cards/Pecados/Fruto Proibido.png"),
    },
    {
        path: require("@/assets/images/Cards/Pecados/Idolatria.png"),
    },
    {
        path: require("@/assets/images/Cards/Pecados/Traição.png"),
    },
]

var default_card = require('@/assets/images/Cards/Card.png')


type Props = {
    id?: number; //Caso não seja passado um ID, deve renderizar uma carta virada de costa
    size?: "normal" | "medium" | "small" | "minimum";
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
            {props.id ? (
                <Pressable
                    onPress={() => {
                        setShowModal(!showModal)
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={cardSize}
                        source={card_list[props.id - 1].path}
                    />
                </Pressable>
            ) :
                (
                    <Image
                        resizeMode="contain"
                        style={cardSize}
                        source={default_card}
                    />
                )
            }
            <Modal visible={showModal} transparent animationType='fade' >
                <Pressable

                    onPress={() => {
                        setShowModal(!showModal)
                    }}
                >
                    <View style={{ width: '100%', height: "100%", backgroundColor: '#000c', alignItems: "center", justifyContent: "center" }}>
                        {props.id ? (
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={card_list[props.id - 1].path}
                            />
                        ) :
                            (
                                <Image
                                    resizeMode="contain"
                                    style={styles.image}
                                    source={default_card}
                                />
                            )
                        }
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