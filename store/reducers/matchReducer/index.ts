import { createSlice, PayloadAction } from '@reduxjs/toolkit'

var initialState: MatchReducerProps = {
    room_data: undefined,
    match_data: undefined,
    player_data: undefined,
    players_data: [],
    player_match_settings: {
        player_view_id: undefined,
        cards_to_fight: [],
        current_skill: {
            slug: "",
            deck: [],
        },
    },
}


const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<RoomApiProps | undefined>) => {
            state.room_data = action.payload
        },
        setPlayer: (state, action: PayloadAction<PlayersInMatchApiProps>) => {
            state.player_data = action.payload
        },
        addPlayersData: (state, action: PayloadAction<UserProps>) => {
            const _temp_array = state.players_data?.map(p => p)
            if (_temp_array && _temp_array?.length > 0) {
                state.players_data = [..._temp_array, action.payload]
            }
            else {
                state.players_data = [action.payload]
            }
        },
        setMatch: (state, action: PayloadAction<MatchApiProps>) => {
            state.match_data = action.payload
        },
        setPlayerFocus: (state, action: PayloadAction<number>) => {
            state.match_data!.player_focus_id = action.payload
        },
        toggleCardsToFight: (state, action: PayloadAction<CardProps>) => {
            let __temp_list = state.player_match_settings!.cards_to_fight!.map((card) => card)
            const card = action.payload
            if (__temp_list!.find((_card) => _card.in_game_id == card.in_game_id)) {
                __temp_list = __temp_list.filter((_card) => _card.in_game_id != card.in_game_id)
            } else {
                __temp_list?.push(card)
            }
            state.player_match_settings!.cards_to_fight = __temp_list
        },
        setCardsToFight: (state, action: PayloadAction<CardProps[]>) => {
            state.player_match_settings!.cards_to_fight = action.payload
        },
        setCurrentSkill: (state, action: PayloadAction<{ slug: string, deck: CardProps[] } | undefined>) => {
            state.player_match_settings!.current_skill = action.payload!
        },
        clearCardsToFight: (state) => {
            state.player_match_settings!.cards_to_fight = []
        },
        leaveMatch: (state) => {
            state.room_data = undefined
            state.match_data = undefined
            state.player_data = undefined
        },

    }
})
export const { setMatch, setRoom, setPlayer, addPlayersData, setPlayerFocus, toggleCardsToFight, setCardsToFight, setCurrentSkill, clearCardsToFight, leaveMatch } = matchSlice.actions
export default matchSlice.reducer