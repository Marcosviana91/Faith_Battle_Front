import { Pressable, View, Text } from 'react-native';

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayerIcon from '@/components/gameBoard/playerIcon';
import { ThemedText } from '@/components/themed/ThemedText';
import CardsContainer from '@/components/gameBoard/cardsContainer';

export function OnInvoke(props: { in_game_id: string }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    // Aplicar DRY
    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }

    console.log("Invocou " + props.in_game_id)

    return (
        <ThemedModal title='Escolha um oponente e um uma carta.' hideCloseButton closeModal={() => { }} >
            {/* Aplicar DRY */}
            {/* Perguntar se deve exibir a SI mesmo */}
            {/* Icones dos jogadores */}
            <View style={{
                height: 80,
                width: '100%',
                flexDirection: "row",
                justifyContent: "space-around",
            }}>
                {matchData?.players_in_match?.map((_player) => {
                    if (_player.id === player?.id) {
                        return null
                    }
                    return (
                        <View key={_player.id} style={{ alignItems: "center" }}>
                            <PlayerIcon id={_player.id} isCurrent={(_player.id == matchData.player_turn)} isTarget={(_player.id == matchData.player_focus_id)} type='mini' />
                            <View style={{ flexDirection: 'row', marginTop: -16 }}>
                                <MaterialCommunityIcons name="shield-cross" size={24} color="black" />
                                <ThemedText type='defaultSemiBold'>{_player.faith_points}</ThemedText>
                            </View>
                        </View>
                    )
                })}
            </View>
            {/* Cartas no campo de batalha */}
            <CardsContainer zone="elias_destroy" cards={getPlayerData(player_focus!).card_battle_camp} size="minimum" target_slug={props.in_game_id} />
        </ThemedModal>
    )
}