declare type MatchApiProps = {
    id?: string;
    start_match?: string;
    match_type?: string;
    round_match?: number;
    player_turn?: number;
    player_focus_id?: number;
    can_others_move?: boolean;
    players_in_match?: PlayersInMatchApiProps[];
    end_match?: string;
    fight_camp?: {
        player_attack_id?: number;
        attack_cards?: CardProps[];
        player_defense_id?: number;
        defense_cards?: CardProps[];
        fight_stage: number;
    };
}

declare type CardProps = {
    slug: string,
    path?: ImageSourcePropType,
    in_game_id?: string,
    attack_point?: number,
    defense_points?: number,
    wisdom_cost?: number,
    status?: "ready" | "not-enough" | "used"
}


declare type APIMoveProps = {
    match_id?: string;
    round_match?: number;
    player_move?: number;
    card_id?: number;
    move_type?: string
    player_target?: number
    card_target?: string
    card_list?: CardProps[]
}

declare type MatchReducerProps = {
    room_data?: RoomApiProps,
    match_data?: MatchApiProps,
    player_data?: PlayersInMatchApiProps,
    player_match_settings?: {
        player_view_id?: number,
        cards_to_fight: CardProps[]
    },
}

