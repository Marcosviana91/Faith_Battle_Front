import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { isSlugInSlugList } from '@/hooks/useCards';
import { addNotify } from '@/store/reducers/notificationReducer';
import { Card, CardCarousel } from '@/components/cards/motions/cardSlider';

// import { card_list } from "@/components/cards/index";

const card_hero_list: CardProps[] = [
    { "slug": 'abraao' },
    { "slug": 'adao' },
    { "slug": 'daniel' },
    { "slug": 'davi' },
    { "slug": 'elias' },
    { "slug": 'ester' },
    { "slug": 'eva' },
    { "slug": 'jaco' },
    { "slug": "jose-do-egito" },
    { "slug": "josue" },
    { "slug": "maria" },
    { "slug": "moises" },
    { "slug": "noe" },
    { "slug": "salomao" },
    { "slug": "sansao" },
]
const card_hero_legendary_list: CardProps[] = [
    { "slug": 'davi_legendary' },
    { "slug": 'josue_legendary' },
    { "slug": "moises_legendary" },
]
const card_miracle_list: CardProps[] = [
    { "slug": 'cordeiro-de-deus' },
    { "slug": 'diluvio' },
    { "slug": 'fogo-do-ceu' },
    { "slug": 'forca-de-sansao' },
    { "slug": 'liberacao-celestial' },
    { "slug": 'no-ceu-tem-pao' },
    { "slug": 'passagem-segura' },
    { "slug": 'protecao-divina' },
    { "slug": 'ressurreicao' },
    { "slug": 'restauracao-de-fe' },
    { "slug": 'sabedoria-de-salomao' },
    { "slug": 'sarca-ardente' },
]
const card_artfacts_list: CardProps[] = [
    { "slug": 'arca-da-alianca' },
    { "slug": 'arca-de-noe' },
    { "slug": 'botas-do-evangelho' },
    { "slug": 'cajado-de-moises' },
    { "slug": 'capacete-da-salvacao' },
    { "slug": 'cinturao-da-verdade' },
    { "slug": 'couraca-da-justica' },
    { "slug": 'escudo-da-fe' },
    { "slug": 'espada-do-espirito' },
    { "slug": 'os-10-mandamentos' },
]
const card_sins_list: CardProps[] = [
    { "slug": 'fruto-proibido' },
    { "slug": 'idolatria' },
    { "slug": 'traicao' },
]
const card_wisdom_list: CardProps[] = [
    { "slug": 'wisdom_card_0' },
    { "slug": 'wisdom_card_1' },
    { "slug": 'wisdom_card_2' },
    { "slug": 'wisdom_card_3' },
    { "slug": 'wisdom_card_4' },
    { "slug": 'wisdom_card_5' },
    { "slug": 'wisdom_card_6' },
    { "slug": 'wisdom_card_7' },
    { "slug": 'wisdom_card_8' },
    { "slug": 'wisdom_card_9' },

]

const ALL_CARDS = [
    {
        "title": "Heróis",
        "list": card_hero_list,
        color: "#123051"
    },
    {
        "title": "Heróis Lendários",
        "list": card_hero_legendary_list,
        color: "#620C7B"
    },
    {
        "title": "Milagres",
        "list": card_miracle_list,
        color: "#185712"
    },
    {
        "title": "Artefatos",
        "list": card_artfacts_list,
        color: "#AA8319"
    },
    {
        "title": "Pecados",
        "list": card_sins_list,
        color: "#791708"
    },
    {
        "title": "Sabedorias",
        "list": card_wisdom_list,
        color: "#656565"
    },
]

export default function CardScreen() {
    const dispatch = useDispatch();
    const serverData = useSelector((state: RootReducer) => state.appReducer.server)
    const [indexToShow, setIndexToShow] = useState(0)
    const [cardSelected, setCardSelected] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(addNotify({
            title: "Cartas Indiponíveis",
            message: 'As cartas com a borda vermelha estão indisponíveis para o jogo.',
        }))
    }, [])

    useEffect(() => {

    }, [indexToShow])

    return (
        <ThemedView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, padding: 4 }}>
                {ALL_CARDS.map((card_list, _index) =>
                (<TabItem
                    key={_index}
                    card_list={card_list}
                    isSelected={_index === indexToShow}
                    setSelected={() => {
                        if (_index === indexToShow) {
                            setIndexToShow(0)
                        } else {
                            setIndexToShow(_index)
                        }
                    }}
                />)
                )}
            </View>
            <ScrollView
                style={{ backgroundColor: ALL_CARDS[indexToShow].color }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        rowGap: 8,
                        paddingVertical: 8,
                    }}
                >

                    {ALL_CARDS[indexToShow].list.map((card_slug, index) => (
                        <Card
                            key={index}
                            card={card_slug}
                            unavailable={!isSlugInSlugList(card_slug.slug, serverData.active_cards)}
                            setCard={() => {
                                setCardSelected(card_slug)
                            }}
                            setShowModal={setShowModal}
                        />
                    ))}
                </View>
            </ScrollView>
            {showModal &&
                <CardCarousel
                    card={cardSelected}
                    bgColor={ALL_CARDS[indexToShow].color}
                    cardList={ALL_CARDS[indexToShow].list}
                    setShowModal={setShowModal}
                    setCard={setCardSelected}
                />
            }
        </ThemedView >
    )
}

type AccordionItemProps = {
    card_list: {
        title: string;
        list: CardProps[];
        color: string;
    }
    isSelected: Boolean
    setSelected: () => void
}

function TabItem(props: AccordionItemProps) {
    const theme = useColorScheme() ?? 'light';
    const sv_isSelected = useSharedValue(0)

    const style_Overlay = useAnimatedStyle(() => {
        return {
            opacity: sv_isSelected.value
        }
    })
    useEffect(() => {
        if (props.isSelected) {
            sv_isSelected.value = withTiming(0)
        } else {
            sv_isSelected.value = withTiming(0.3)
        }
    }, [props.isSelected])

    return (
        <Pressable
            style={{ borderWidth: 1, backgroundColor: props.card_list.color, flexGrow: 1, minWidth: '30%', borderRadius: 8, borderColor: props.isSelected ? theme !== 'dark' ? '#000' : '#fff' : '#666' }}
            onPress={() => {
                props.setSelected()
            }}
        >
            <Animated.View style={[{ backgroundColor: theme === 'light' ? '#fff' : '#000', width: '100%', height: '100%', position: 'absolute', flexGrow: 1, borderRadius: 8 }, style_Overlay]} />
            <ThemedText type={props.isSelected ? 'defaultSemiBold' : 'default'} style={{ textAlign: 'center', paddingHorizontal: 8 }}>{props.card_list.title}</ThemedText>
        </Pressable>
    )
}
