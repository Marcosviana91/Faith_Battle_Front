import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "@/components/cards/index";

import { card_list } from "@/components/cards/index";


export default function CardScreen() {

    return (
        <ScrollView>

            <View style={[styles.container,]}>
                { card_list.map((_, index) => (
                    <Card key={index} size="small" id={index+1}></Card>
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