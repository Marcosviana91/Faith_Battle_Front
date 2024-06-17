declare type UserProps = {
    id?: Number,
    username: string,
    password?: string,
    created_at?: string,
    last_login?: string,
    real_name: string,
    email: string,
}

declare type AuthProps = {
    username: string,
    password: string,
}

declare type UserStoreProps = {
    data?: UserProps
}

declare type CardProps = {
    path: ImageSourcePropType ,
}

declare type RouterScreenProps = {
    navigation?: any,
    route?: {
        key: string,
        name: string,
        params: UserProps,
    }
}

declare type APIResponseProps = {
    type: string,
    message: string,
    data?: UserProps
}

declare type APIMoveProps = {
    match_room_id?: number;
    match_round?: number;
    player_move?: number;
    card_id?: number;
    move_type?: string
    player_target?: number
    card_target?: string
}

declare type APIGameDataProps = {
    data_type: string;
    room_id?: number;
    player_id?: number;
    move?: number;
    retry_cards?: number;
}

declare type RoomApiProps = {
    id: number;
    created_by?: number;
    room_name?: string;
    room_game_type?: string;
    room_current_players?: number;
    room_max_players?: number;
    has_password?: boolean;
}

declare type MovesInMatchApiProps = {
    moved_at: string;
    match_id: number
}

declare type PlayersInMatchApiProps = {
    id: number;
    deck?: string[]
    wisdom?: number
    cards_in_hand?: string[]
    cards_in_battle_zone?: string[]
    cards_in_prepare_zone?: string[]
    cards_in_forgotten_sea?: string[]
}

declare type MatchApiProps = {
    data?: {
        id: number;
        start_match?: string;
        end_match?: string;
        match_type: number;
        player_focus?: number;
        players_in_match: PlayersInMatchApiProps[];
    },
    match_list?: RoomApiProps[]
}
