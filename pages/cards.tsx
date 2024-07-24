import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "@/components/cards/index";

// import { card_list } from "@/components/cards/index";

const card_list = [
    {"slug":'abraao'},
    {"slug":'adao'},
    {"slug":'daniel'},
    {"slug":'davi'},
    {"slug":'elias'},
    {"slug":'ester'},
    {"slug":'eva'},
    {"slug":'jaco'},
    {"slug":"jose-do-egito"},
    {"slug":"josue"},
    {"slug":"maria"},
    {"slug":"moises"},
    {"slug":"noe"},
    {"slug":"salomao"},
    {"slug":"sansao"},
]


export default function CardScreen() {

    return (
        <ThemedView style={{ flex: 1 }}>
            <ScrollView>
                <ThemedText>Standard Heros:</ThemedText>
                <View style={[styles.container,]}>
                    {card_list.map((card_slug, index) => (
                        <Card key={index} size="medium" card={card_slug} zone='gallery' />
                    ))}
                </View>
            </ScrollView>
        </ThemedView>

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