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
        <>
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
        </>
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
    const previuousCard = currentCardIndex > 0 ? props.cardList[currentCardIndex - 1] : undefined
    const nextCard = (currentCardIndex < props.cardList.length - 1) ? props.cardList[currentCardIndex + 1] : undefined
    const [activePanGesture, setActivePanGesture] = useState(true)
    const [isNext, setIsNext] = useState(1)

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

    const tapGesture = Gesture.Tap()
        .onStart(() => {
            props.setShowModal(false)
        })
        .runOnJS(true)

    const CHANGE_CARD_OFFSET = windowWidth * 1/2
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollX = useSharedValue<number>(currentCardIndex);

    useDerivedValue(() => {
        scrollTo(
            animatedRef,
            scrollX.value * (styles.imageMinimum.width + 16),
            0,
            true
        );
    });

    const panGesture = Gesture.Pan()
        .enabled(activePanGesture)
        .onUpdate((e) => {
            if (positionX.value > CHANGE_CARD_OFFSET) {
                if (activePanGesture && previuousCard) {
                    setIsNext(-1)
                    props.setCard(previuousCard)
                    setActivePanGesture(false)
                    scrollX.value = currentCardIndex -3
                }
            } else if (positionX.value < (CHANGE_CARD_OFFSET) * -1) {
                if (activePanGesture && nextCard) {
                    setIsNext(1)
                    props.setCard(nextCard)
                    setActivePanGesture(false)
                    scrollX.value = currentCardIndex - 1
                }
            }
            positionX.value = e.translationX
        })
        .onEnd(() => {
            positionX.value = (styles.image.width / 2) * isNext
            positionX.value = withTiming(0, { duration: 250 })
            setTimeout(() => {
                setActivePanGesture(true)
            }, 300)
        })
        .runOnJS(true)


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }],
    }));

    return (
        <>
            <Modal transparent animationType='fade' >
                <ThemedView
                    style={{ flex: 1, maxWidth: defaultWidth, alignItems: "center", justifyContent: "center", backgroundColor: props.bgColor }}
                >
                    <GestureHandlerRootView
                        style={{ width: "90%", height: "70%", position: "relative" }}
                    >
                        <GestureDetector gesture={tapGesture}>
                            <GestureDetector gesture={panGesture}>
                                <Animated.View style={[animatedStyle, { width: "100%", height: "100%" }]}>
                                    <View style={{ flex: 1, flexDirection: 'row', columnGap: windowWidth * 0.1, position: 'relative' }}>
                                        <Image
                                            resizeMode="stretch"
                                            style={[styles.image, { width: "100%", height: "100%", position: 'absolute', left: -windowWidth }]}
                                            source={useCards({ card_slug: previuousCard?.slug })}
                                        />
                                        <Image
                                            resizeMode="stretch"
                                            style={[styles.image, { width: "100%", height: "100%" }]}
                                            source={useCards({ card_slug: props.card?.slug })}
                                        />
                                        <Image
                                            resizeMode="stretch"
                                            style={[styles.image, { width: "100%", height: "100%", position: 'absolute', left: windowWidth }]}
                                            source={useCards({ card_slug: nextCard?.slug })}
                                        />

                                    </View>
                                </Animated.View>
                            </GestureDetector>
                        </GestureDetector>
                    </GestureHandlerRootView>
                    {/* Siblings card list */}
                    <ThemedView style={{ marginTop: 50, width: '90%', borderRadius: 18, padding: 8, alignItems: 'center' }}>
                        <Animated.ScrollView horizontal ref={animatedRef} >
                            {props.cardList.map((_card, _index) => (
                                <Pressable
                                    key={_index}
                                    onPress={() => {
                                        props.setCard(_card)
                                        scrollX.value = props.cardList.findIndex(__card => __card === _card) - 2
                                    }}
                                >
                                    <Image
                                        resizeMode="stretch"
                                        style={[styles.imageMinimum, { margin: 8 }, _card === props.card && styles.card_ready]}
                                        source={useCards({ card_slug: _card?.slug })}
                                    />
                                </Pressable>
                            ))}
                        </Animated.ScrollView>
                    </ThemedView>
                </ThemedView>
            </Modal>
        </>
    )
}