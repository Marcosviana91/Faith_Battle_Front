import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Card } from "@/components/cards/";
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

// import { card_list } from "@/components/cards/index";

const card_hero_list = [
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
const card_miracle_list = [
    { "slug": 'cordeiro-de-deus' },
    { "slug": 'diluvio' },
    { "slug": 'fogo-do-ceu' },
    { "slug": 'forca-de-sansao' },
    { "slug": 'liberacao-celestial' },
    { "slug": 'no-ceu-tem-pao' },
    { "slug": 'passagem-segura' },
    { "slug": 'protecao-divina' },
    { "slug": 'ressureicao' },
    { "slug": 'restauracao-da-fe' },
    { "slug": 'sabedoria-de-salomao' },
    { "slug": 'sarca-ardente' },
]
const card_artfacts_list = [
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
const card_sins_list = [
    { "slug": 'fruto-proibido' },
    { "slug": 'idolatria' },
    { "slug": 'traicao' },
]

const ALL_CARDS = [
    {
        "title": "Standard Heróis",
        "list": card_hero_list,
        color: "#6fabfa"
    },
    {
        "title": "Standard Milagres",
        "list": card_miracle_list,
        color: "#9ffc8d"
    },
    {
        "title": "Standard Artefatos",
        "list": card_artfacts_list,
        color: "#fdfd93"
    },
    {
        "title": "Standard Pecados",
        "list": card_sins_list,
        color: "#fd8d8d"
    },
]

export default function CardScreen() {
    const [indexToShow, setIndexToShow] = useState(0)

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
                            <View style={[styles.container, {backgroundColor:card_list.color}]}>
                                {card_list.list.map((card_slug, index) => (
                                    <Card key={index} size="medium" card={card_slug} zone='gallery' />
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
        gap: 10,
        padding: 12,
    }
})