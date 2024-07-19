declare type APIResponseProps = {
    data_type: string,
    message?: string,
    user_data?: UserProps,
    room_data?: RoomApiProps
    match_data?: MatchApiProps,
    player_data?: PlayersInMatchApiProps
    room_list?: RoomApiProps[]
    match_move?: APIMoveProps,
    // card_data?: any,
}
