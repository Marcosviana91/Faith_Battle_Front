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
    card_deck?: string[]
    card_hand?: string[]
    card_prepare_camp?: string[]
    card_battle_camp?: string[]
    card_in_forgotten_sea?: string[]
    faith_points?: number,
    wisdom_points?: number
    wisdom_used?: number
}

