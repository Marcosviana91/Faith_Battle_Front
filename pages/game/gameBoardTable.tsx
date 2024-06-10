import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "@/constants/Styles";

import GameBoard from "@/components/gameBoard";
import PlayerIcon from "@/components/gameBoard/playerIcon";

import CardsContainer from "@/components/gameBoard/cardsContainer";


export default function GameBoardTable(props: MatchApiProps) {
    // console.log("Dados da Partida: ", props);
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)
    const player_focus = props.data?.player_focus

    function getPlayerFocusData() {
        const _data = props.data!.players_in_match.filter((player) => player.id===player_focus)
        return _data[0]
    }

    return (
        <View style={globalStyles.container}>
            {/* Icones dos jogadores */}
            <View style={[styles.gameBoardHeader,]}>
                {props.data?.players_in_match.map((player) => (
                    <PlayerIcon key={player.id} id={player.id} />
                ))}
            </View>
            {/*  */}
            <View style={[globalStyles.contentContainer, styles.container]}>
                {player_focus && <View style={[styles.enemyBoard]}>
                    {/* Verificar ID do jogador focado, não usar mais indice da lista */}
                    <GameBoard {...getPlayerFocusData()} />
                </View>}
                <View>
                    {/* Verificar ID do jogador logado */}
                    <GameBoard {...props.data!.players_in_match[0]} />
                </View>
            </View>
            {/* Mão do jogador */}
            <View style={[styles.playerFooter,]}>
                <ScrollView horizontal>
                    <CardsContainer size="normal" cards={props.data?.players_in_match[0].cards_in_hand}/>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d84b09',

    },
    gameBoardHeader: {
        backgroundColor: "#00000094",
        height: 60,
        width: '100%',
        flexDirection: "row",
    },
    enemyBoard: {
        transform: [{ rotateZ: '180deg' }]
    },
    playerFooter: {
        backgroundColor: "#46000075",
        height: 120,
        paddingHorizontal: 10,
    },
})