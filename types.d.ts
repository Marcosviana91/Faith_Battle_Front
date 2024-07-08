declare type MatchApiProps = {
    id?: string;
    start_match?: string;
    match_type?: string;
    players_in_match?: PlayersInMatchApiProps[];
    round_match?: number;
    max_players?: number;
    player_turn?: number;
    player_focus_id?: number;
    can_others_move?: boolean;
    end_match?: string;
}

declare type CardProps = {
    slug: string,
    path: ImageSourcePropType,
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

declare type MatchReducerProps = {
    room_data?: RoomApiProps,
    match_data?: MatchApiProps,
    player_data?: PlayersInMatchApiProps;
}

