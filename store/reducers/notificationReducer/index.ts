import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: NotificationReducerProps = {
    notifications: [
        {
            id: "1",
            move_type: "",
            player_trigger_id: 1,
            card_trigger_id: "1-adao-asd123",
            player_target_id: 2,
        },
        {
            id: "2",
            move_type: "",
            player_trigger_id: 2,
            card_trigger_id: "2-adao-asd123",
            player_target_id: 3,
            card_target_id: "3-noe-asd123",
        },
        {
            id: "3",
            move_type: "",
            player_trigger_id: 2,
            card_trigger_id: "2-diluvio-asd123",
            player_target_id: 1,
        }
    ]
}


const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        addNotify: (state, action: PayloadAction<NotificationProps>) => {
            state.notifications = [...state.notifications, action.payload]
        },
        rmvNotify: (state, action: PayloadAction<NotificationProps>) => {
            var _temp_array_notifications = [...state.notifications]
            console.log(_temp_array_notifications)
            // state.notifications = action.payload
        }
    }
})
export const { addNotify, rmvNotify } = matchSlice.actions
export default matchSlice.reducer