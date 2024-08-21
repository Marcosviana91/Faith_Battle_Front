import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: NotificationReducerProps = {
    notifications: [
        // {
        //     id: "1",
        //     move_type: "",
        //     player_trigger_id: 1,
        //     card_trigger_id: "1-adao-asd123",
        //     player_target_id: 2,
        // },
        // {
        //     id: "2",
        //     move_type: "",
        //     player_trigger_id: 2,
        //     card_trigger_id: "2-adao-asd123",
        //     player_target_id: 3,
        //     card_target_id: "3-noe-asd123",
        // },
        // {
        //     id: "3",
        //     move_type: "",
        //     player_trigger_id: 2,
        //     card_trigger_id: "2-diluvio-asd123",
        //     player_target_id: 1,
        // },
        // {
        //     id: "4",
        //     title: "Nova rodada!",
        //     message: "Sua vez!",
        // }
    ]
}


const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        addNotify: (state, action: PayloadAction<NotificationProps>) => {
            let notification = action.payload
            notification.id = String(new Date().getTime())
            state.notifications = [...state.notifications, notification]
        },
        rmvNotify: (state, action: PayloadAction<string>) => {
            var _temp_array_notifications = [...state.notifications]
            _temp_array_notifications = _temp_array_notifications.filter((_notify) => _notify.id != action.payload)
            state.notifications = _temp_array_notifications
        }
    }
})
export const { addNotify, rmvNotify } = matchSlice.actions
export default matchSlice.reducer