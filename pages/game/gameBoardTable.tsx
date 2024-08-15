import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, StyleSheet } from "react-native";
import { globalStyles } from "@/constants/Styles";

import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

import GameBoard from "@/components/gameBoard";
import { IconsContainer } from "@/components/player_user/playerIcon";
import FightCamp from '@/components/gameBoard/fightCamp';
import TopBar from '@/components/gameBoard/topBar';
import { usePlayerData } from '@/hooks/usePlayerData';
import HandContainer from '@/components/cards/containers/HandContainer';
import { OnInvoke as EsterOnInvoke } from '@/components/cards/cardsComands/ester';
import { OnInvoke as MariaOnInvoke } from '@/components/cards/cardsComands/maria';
import { OnInvoke as EliasOnInvoke } from '@/components/cards/cardsComands/elias';


export default function GameBoardTable() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const card_skill = useSelector((state: RootReducer) => state.matchReducer.player_match_settings?.current_skill)
    const player_focus_id = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    const player_data = usePlayerData(player?.id!)
    const player_focus_data = usePlayerData(player_focus_id!)

    function OnInvoke(props: {slug:string}) {
        switch (props.slug) {
            case 'ester':
                return <EsterOnInvoke />
            case 'maria':
                return <MariaOnInvoke />
        
            case 'elias':
                return <EliasOnInvoke />
        
            default:
                break;
        }
    }

    return (
        <>
            {!matchData?.end_match &&
                <ThemedView style={globalStyles.container}>
                    <TopBar />
                    {/* Aplicar DRY */}
                    {/* Icones dos jogadores */}
                    {!fight_camp &&
                        <IconsContainer player_id={player?.id} matchData={matchData} />
                    }
                    {/* Fight Camp */}
                    <FightCamp />
                    {/* GameBoards */}
                    <View style={[globalStyles.contentContainer]}>
                        {/* Enemy board */}
                        {player_focus_id !== 0 && player_focus_id !== player?.id &&
                            <GameBoard {...player_focus_data} />
                        }
                        {/* Player board */}
                        <GameBoard {...player_data} />
                    </View>
                    {/* Mão do jogador */}
                    <View>
                        <HandContainer />
                    </View>
                </ThemedView>
            }
            {/* Modal das habilidades das cartas */}
            {card_skill && card_skill.slug !== '' &&
                <OnInvoke slug={card_skill.slug} />
            }
            {/* Tela de Statisticas // falta fazer */}
            {matchData?.end_match &&
                <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TopBar />
                    <ThemedText>A partida acabou: {matchData.end_match}</ThemedText>
                </ThemedView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    gameBoardHeader: {
        height: 80,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
    }
})