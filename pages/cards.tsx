import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "@/components/cards/index";

// import { card_list } from "@/components/cards/index";

const card_list = [
    'abraao', 'adao', 'daniel',
    'davi', 'elias', 'ester',
    'eva', 'jaco', "jose-do-egito",
    "josue", "maria", "moises",
    "noe", "salomao", "sansao",
]


export default function CardScreen() {

    return (
        <ScrollView>
            <View style={[styles.container,]}>
                { card_list.map((card_slug, index) => (
                    <Card key={index} size="small" slug={card_slug}></Card>
                ))}
            </View>
        </ScrollView>

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