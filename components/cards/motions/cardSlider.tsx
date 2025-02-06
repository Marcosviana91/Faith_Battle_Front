import { useState } from "react";
import { View, StyleSheet, Pressable, Modal, Image, Dimensions } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
    useAnimatedRef,
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    scrollTo,
    useDerivedValue,
} from 'react-native-reanimated';

import { useCards } from "@/hooks/useCards";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { ThemedView } from "@/components/themed/ThemedView";
import React from "react";

type Card2Props = {
    unavailable?: boolean,
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    setCard: () => void,
    setShowModal: (state: boolean) => void,
}

export function Card(props: Card2Props) {
    const { width: windowWidth } = useScreenSizes();

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

    return (
        <View style={{ alignSelf: "center" }}>
            <Pressable
                onPress={() => {
                    props.setShowModal(true)
                    props.setCard()
                }}
            >
                <Image
                    resizeMode="stretch"
                    style={[styles.imageMedium, props.unavailable ? styles.card_used : styles.card_ready]}
                    source={useCards({ card_slug: props.card?.slug })}
                />
            </Pressable>
        </View>
    )
}

type CardCarouselProps = {
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    bgColor: string,
    cardList: CardProps[],
    setShowModal: (state: boolean) => void,
    setCard: (card: CardProps) => void,
}

export function CardCarousel(props: CardCarouselProps) {
    const positionX = useSharedValue(0);
    const windowWidth = Dimensions.get('window').width
    const currentCardIndex = props.cardList.findIndex(_card => _card === props.card)

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

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollX = useSharedValue<number>(currentCardIndex);

    useDerivedValue(() => {
        scrollTo(
            animatedRef,
            scrollX.value * (defaultWidth * 0.9 + 16),
            0,
            false
        );
    });

    return (
        <Modal transparent animationType='fade' onRequestClose={() => { props.setShowModal(false) }} >
            <ThemedView
                style={{ flex: 1, maxWidth: defaultWidth, alignItems: "center", justifyContent: "center", backgroundColor: props.bgColor }}
            >
                <ThemedView style={{ width: '100%', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 4, alignItems: 'center' }}>
                    <Animated.ScrollView horizontal ref={animatedRef} >
                        {props.cardList.map((_card, _index) => (
                            <Pressable
                                key={_index}
                                onPress={() => {
                                    props.setShowModal(false)
                                }}
                            >
                                <Image
                                    resizeMode="stretch"
                                    style={[{
                                        borderRadius: 16,
                                        width: defaultWidth * 0.9,
                                        height: defaultHeight * 0.9,
                                        margin: 8
                                    }, _card === props.card && styles.card_ready]}
                                    source={useCards({ card_slug: _card?.slug })}
                                />
                            </Pressable>
                        ))}
                    </Animated.ScrollView>
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}