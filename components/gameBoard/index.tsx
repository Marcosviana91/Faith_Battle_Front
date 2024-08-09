import { useSelector } from "react-redux";
import { RootReducer } from "@/store";

import { View, Image, StyleSheet } from "react-native";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import PrepareContainer from "../cards/containers/PrepareContainer";
import BattleContainer from "../cards/containers/BattleContainer";


export default function GameBoard(props: PlayersInMatchApiProps) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const { width: windowWidth, height: windowHeight } = useScreenSizes();
    const styles = StyleSheet.create({
        board: {
            width: "100%",
            height: "100%",
            resizeMode: "stretch",
        },
        wisdom: {
            position: "absolute",
            right: windowWidth * 0.205,
            bottom: windowHeight * 0.04,
            zIndex: 1
        },
        deck: {
            position: "absolute",
            right: windowWidth * 0.105,
            bottom: windowHeight * 0.04,
            zIndex: 1
        },
        forgotten: {
            position: "absolute",
            right: windowWidth * 0,
            bottom: windowHeight * 0.04,
            zIndex: 1
        },
        zonaPreparacao: {
            position: "absolute",
            bottom: windowHeight * 0.03,
            left: windowWidth * 0.015,
            width: windowWidth * 0.62,
            height: windowHeight * 0.117,
        },
        zonaBatalha: {
            position: "absolute",
            bottom: windowHeight * 0.16,
            left: windowWidth * 0.015,
            width: windowWidth * 0.965,
            height: windowHeight * 0.125,
        },
    })

    return (
        <View style={{
            width: '100%',
            height: windowHeight * 0.3,
            transform: [{ rotateZ: player?.id == props.id ? '0deg' : '180deg' }]
        }}>
            <Image
                style={styles.board}
                // resizeMode="stretch"
                source={require('@/assets/images/GameBoard.png')}
            />
            <View style={styles.wisdom}>
                {/* <Card size="minimum" /> */}
            </View>
            <View style={styles.deck}>
                {/* <Card size="minimum" /> */}
            </View>
            <View style={styles.forgotten}>
                {/* <Card size="minimum" /> */}
            </View>
            {/* Zona de Batalha */}
            <View style={styles.zonaBatalha}>
                <BattleContainer cards={props.card_battle_camp!} />
            </View>
            {/* Zona de Preparação */}
            <View style={styles.zonaPreparacao}>
                <PrepareContainer cards={props.card_prepare_camp!} />
            </View>
        </View>
    )
}
