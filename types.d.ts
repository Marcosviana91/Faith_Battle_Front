declare type MatchApiProps = {
    id?: string;
    start_match?: string;
    game_type?: string;
    round_match?: number;
    player_turn?: number;
    player_focus_id?: number;
    can_others_move?: boolean;
    players_in_match?: [PlayersInMatchApiProps[]];
    end_match?: string;
    card_stack?: {
        cards: CardProps[];
    }
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
    description?: string,
    card_type?: string,
    in_game_id?: string,
    attack_point?: number,
    defense_point?: number,
    wisdom_cost?: number,
    status?: "ready" | "not-enough" | "used",
    skill_focus_player_id?: number,
    attachable?: boolean,
    attached_cards?: CardProps[],
    attached_effects?: CardProps[],
    imbloqueavel?: boolean,
    indestrutivel?: boolean,
    incorruptivel?: boolean,
    can_attack?: boolean,
    can_move?: boolean,
}

declare type APIMoveProps = {
    match_id?: string;
    round_match?: number;
    player_move?: number;
    card_id?: number;
    move_type?: string
    player_target_id?: number
    player_target2_id?: number
    card_target_id?: string
    card_list?: CardProps[]
}

declare type MatchReducerProps = {
    room_data?: RoomApiProps,
    match_data?: MatchApiProps,
    player_data?: PlayersInMatchApiProps,
    players_data?: UserProps[],
    player_match_settings?: {
        player_view_id?: number,
        cards_to_fight: CardProps[],
        current_skill: {
            slug: string,
            deck: CardProps[],
            forgotten_sea?: CardProps[],
        }
    },
}

declare type NotificationReducerProps = {
    notifications: NotificationProps[]
}

declare type NotificationProps = {
    id?: string,
    title?: string,
    message?: string,
    player_trigger_id?: number,
    card_trigger_id?: string,
    move_type?: string,
    player_target_id?: number,
    card_target_id?: string,
    stillUntilDismiss?: boolean
}

declare type ServerSettingProps = {
    avatar_list?: string[],
    version: string,
    active_cards: string[],

}
declare type AppSettingProps = {
    version: string,


}

declare type AppSettingReducer = {
    server: ServerSettingProps,
    settings: AppSettingProps
}
