declare type UserProps = {
    id?: number,
    username?: string,
    password?: string,
    created_at?: string,
    last_login?: string,
    real_name?: string,
    email?: string,
}

declare type AuthProps = {
    username: string,
    password: string,
}

declare type UserStoreProps = {
    data?: UserProps
}

declare type CardProps = {
    slug: string,
    path: ImageSourcePropType ,
}

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


declare type APIMoveProps = {
    match_room_id?: number;
    match_round?: number;
    player_move?: number;
    card_id?: number;
    move_type?: string
    player_target?: number
    card_target?: string
}

declare type RoomApiProps = {
    id?: number;
    created_by?: number;
    // Stage 0: players has connecteds, check decks
    // Stage 1: Sort cards to all players, retry sort
    // Stage 2: The game is in curse
    stage?: number;

    room_name?: string;
    room_current_players?: number;
    room_game_type?: string;
    room_max_players?: number;
    password?: string;
    has_password?: boolean;

    start_match?: string;
    end_match?: string;
    player_focus?: number;

    players_in_match?: PlayersInMatchApiProps[];
}

declare type PlayersInMatchApiProps = {
    id: number;
    ready?: boolean;
    deck?: string[]
    wisdom?: number
    faith?: number,
    cards_in_hand?: string[]
    cards_in_battle_zone?: string[]
    cards_in_prepare_zone?: string[]
    cards_in_forgotten_sea?: string[]
}

declare type MatchReducerProps = {
    room_data?: RoomApiProps,
    player_data?: PlayersInMatchApiProps;
}

