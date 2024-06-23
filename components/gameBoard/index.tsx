
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import Card from "@/components/cards";
import CardsContainer from "./cardsContainer";

export default function GameBoard(props: PlayersInMatchApiProps) {

    return (
        <>
            <Image
                style={styles.board}
                // resizeMode="stretch"
                source={require('@/assets/images/GameBoard.png')}
            />
            <View style={styles.wisdom}>
                <Card size="minimum" />
            </View>
            <View style={styles.deck}>
                <Card size="minimum" />
            </View>
            <ScrollView horizontal style={styles.zonaBatalha}>
                <CardsContainer cards={props.cards_in_battle_zone} />
            </ScrollView>
            <ScrollView horizontal style={styles.zonaPreparacao}>
                <CardsContainer cards={props.cards_in_prepare_zone} />
            </ScrollView>
            <ScrollView horizontal style={styles.zonaSabedoria}>
                <CardsContainer />
            </ScrollView>
            <View style={styles.forgotten}>
                <Card size="minimum" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    board: {
        width: 400,
        height: 250,
        resizeMode: "stretch",

    },
    wisdom: {
        position: "absolute",
        left: 270,
        bottom: 96,
        height: 60,
    },
    deck: {
        position: "absolute",
        left: 312,
        bottom: 96,
        height: 60,
    },
    forgotten: {
        position: "absolute",
        left: 352,
        bottom: 96,
        height: 60,
    },
    zonaSabedoria: {
        position: "absolute",
        bottom: 10,
        left: 4,
        width: 390
    },
    zonaPreparacao: {
        position: "absolute",
        bottom: 96,
        left: 4,
        width: 260
    },
    zonaBatalha: {
        position: "absolute",
        bottom: 180,
        left: 4,
        width: 390
    },
})