import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SimpleCard } from "@/components/cards/containers/DefaultContainer";
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { isSlugInSlugList } from '@/hooks/useCards';
import { addNotify } from '@/store/reducers/notificationReducer';

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
        "title": "Standard Heróis",
        "list": card_hero_list,
        color: "#123051"
    },
    {
        "title": "Standard Heróis",
        "list": card_hero_legendary_list,
        color: "#620C7B"
    },
    {
        "title": "Standard Milagres",
        "list": card_miracle_list,
        color: "#185712"
    },
    {
        "title": "Standard Artefatos",
        "list": card_artfacts_list,
        color: "#AA8319"
    },
    {
        "title": "Standard Pecados",
        "list": card_sins_list,
        color: "#791708"
    },
    {
        "title": "Standard Sabedorias",
        "list": card_wisdom_list,
        color: "#656565"
    },
]


export default function CardScreen() {
    const dispatch = useDispatch();
    const serverData = useSelector((state: RootReducer) => state.appReducer.server)
    const [indexToShow, setIndexToShow] = useState(0)

    const cards_available = serverData?.active_cards


    useEffect(() => {
        dispatch(addNotify({
            title: "Cartas Indiponíveis",
            message: 'As cartas escurecidas estão indisponíveis para o jogo.',
        }))
    }, [])

    return (
        <ThemedView style={{ height: '100%' }}>
            {ALL_CARDS.map((card_list, _index) => (
                <View key={_index} style={{ flexShrink: indexToShow === _index ? 1 : 0 }}>
                    <Pressable
                        key={_index}
                        style={{ padding: 8, borderBottomWidth: 1, flexDirection: "row", gap: 8 }}
                        onPress={() => {
                            if (indexToShow === _index) {
                                setIndexToShow(-1)
                            } else {
                                setIndexToShow(_index)
                            }
                        }}
                    >
                        <ThemedText>
                            <AntDesign name={indexToShow !== _index ? "caretdown" : "caretup"} size={24} />
                        </ThemedText>
                        <ThemedText>{card_list.title}</ThemedText>
                    </Pressable>
                    {indexToShow == _index &&
                        <ScrollView>
                            <View style={[styles.container, { backgroundColor: card_list.color }]}>
                                {card_list.list.map((card_slug, index) => (
                                    <SimpleCard key={index} size="medium" card={card_slug} unavailable={!isSlugInSlugList(card_slug.slug, cards_available)} />
                                ))}
                            </View>
                        </ScrollView>
                    }
                </View>
            ))}
        </ThemedView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: 'wrap',
        gap: 4,
        padding: 12,
    }
})