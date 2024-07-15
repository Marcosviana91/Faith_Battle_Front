
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, useWindowDimensions } from "react-native";
import Card from "@/components/cards";
import CardsContainer from "./cardsContainer";
import { useEffect } from "react";

export default function GameBoard(props: PlayersInMatchApiProps) {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const styles = StyleSheet.create({
        board: {
            width: "100%",
            height: "100%",
            resizeMode: "stretch",
        },
        wisdom: {
            position: "absolute",
            right: windowWidth*0.205,
            bottom: windowHeight*0.04,
            zIndex: 1
        },
        deck: {
            position: "absolute",
            right: windowWidth*0.105,
            bottom: windowHeight*0.04,
            zIndex: 1
        },
        forgotten: {
            position: "absolute",
            right: windowWidth*0,
            bottom: windowHeight*0.04,
            zIndex: 1
        },
        zonaPreparacao: {
            position: "absolute",
            bottom: windowHeight*0.03,
            left: windowWidth*0.015,
            width: windowWidth*0.62,
            height: windowHeight*0.117,
        },
        zonaBatalha: {
            position: "absolute",
            bottom: windowHeight*0.18,
            left: windowWidth*0.015,
            width: windowWidth*0.92,
            height: windowHeight*0.106,
        },
    })

    return (
        <View style={{ backgroundColor: "red", width: windowWidth * 0.95, height: windowHeight * 0.3 }}>
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
            <View style={styles.forgotten}>
                <Card size="minimum" />
            </View>
            {/* Zona de Batalha */}
            <View style={styles.zonaBatalha}>
                <CardsContainer zone="battle" cards={props.card_battle_camp} />
            </View>
            {/* Zona de Preparação */}
            <View style={styles.zonaPreparacao}>
                <CardsContainer zone="prepare" cards={props.card_prepare_camp} size="minimum" />
            </View>
        </View>
    )
}
