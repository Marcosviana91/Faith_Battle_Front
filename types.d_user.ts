declare type UserProps = {
    id?: number,
    username?: string,
    password?: string,
    created_at?: string,
    last_login?: string,
    real_name?: string,
    email?: string,
    token?: string,
}

declare type UserStoreProps = {
    user_data?: UserProps,
    player_data?: PlayerProps,
}

declare type PlayerProps = {
    id?: number;
    available_cards?: string[];
    xp_points?: number;
    ready?: boolean;
    card_deck?: string[];
    deck_try?: number;
    card_hand?: string[];
}

declare type PlayersInMatchApiProps = {
    id: number;
    ready?: boolean;
    card_deck?: CardProps[]
    card_hand?: CardProps[]
    card_prepare_camp?: CardProps[]
    card_battle_camp?: CardProps[]
    card_in_forgotten_sea?: CardProps[]
    faith_points?: number,
    wisdom_points?: number
    wisdom_used?: number
}
