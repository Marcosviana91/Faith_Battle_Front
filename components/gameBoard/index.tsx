import { useSelector } from "react-redux";
import { RootReducer } from "@/store";

import { View, Image, StyleSheet } from "react-native";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import PrepareContainer from "../cards/containers/PrepareContainer";
import BattleContainer from "../cards/containers/BattleContainer";
import { ForgottenContainer } from "../cards/containers/ForgottenContainer";


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
            width: 75,
            height: 85,
            position: "absolute",
            right: 8,
            bottom: windowHeight * 0.03,
            zIndex: 1,
            borderRadius: 8
        },
        zonaPreparacao: {
            position: "absolute",
            bottom: windowHeight * 0.026,
            left: windowWidth * 0.015,
            maxWidth: '80%',
            height: windowHeight * 0.122,
        },
        zonaBatalha: {
            position: "absolute",
            bottom: windowHeight * 0.162,
            left: windowWidth * 0.015,
            maxWidth: '96%',
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
                <ForgottenContainer  card_list={props.card_in_forgotten_sea}/>
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
