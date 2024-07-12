
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import Card from "@/components/cards";
import CardsContainer from "./cardsContainer";

export default function GameBoard(props: PlayersInMatchApiProps) {
    const wisdom_cards = []
    for (let wp = 0; wp < props.wisdom_points!; wp++) {
        wisdom_cards.push(`wisdom_card_${wp}`)
    }
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
                <CardsContainer cards={props.card_battle_camp} />
            </ScrollView>
            <ScrollView horizontal style={styles.zonaPreparacao}>
                <CardsContainer cards={props.card_prepare_camp} />
            </ScrollView>
            {/* <ScrollView horizontal style={styles.zonaSabedoria}>
                <CardsContainer cards={wisdom_cards} />
            </ScrollView> */}
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