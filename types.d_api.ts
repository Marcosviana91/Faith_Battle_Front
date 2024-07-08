declare type APIResponseProps = {
    data_type: string,
    message?: string,
    user_data?: UserProps,
    room_data?: RoomApiProps
    player_data?: PlayersInMatchApiProps
    room_list?: RoomApiProps[]
    // player_in_match_data?: any,
    // card_data?: any,
}
