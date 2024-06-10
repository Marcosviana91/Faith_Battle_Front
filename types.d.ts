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

declare type RoomApiProps = {
    room_id: number;
    room_name?: string;
    room_game_style?: string;
    room_max_players?: number;
    room_current_players?: number;
}

declare type MovesInMatchApiPRops = {
    moved_at: string;
    match_id: number
}

declare type PlayersInMatchApiPRops = {
    id: number;
    deck?: number[]
    wisdom?: int
    cards_in_hand?: number[]
    cards_in_battle_zone?: number[]
    cards_in_prepare_zone?: number[]
    cards_in_forgotten_sea?: number[]
}

declare type MatchApiProps = {
    data?: {
        id: number;
        start_match: string;
        end_match?: string;
        match_type: number;
        player_focus?: number;
        players_in_match: PlayersInMatchApiPRops[];
    }
}
