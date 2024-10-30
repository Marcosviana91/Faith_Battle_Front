declare type UserProps = {
    id?: number,
    username?: string,
    password?: string,
    first_name?: string,
    email?: string,
    avatar?: string,
    token?: string,
    xp_points?: number;
    available_cards?: string[];
    decks?: {
        _id: string,
        cards: string[],
    }[];
    selected_deck?: string;
}

declare type UserStoreProps = {
    user_data?: UserProps
}

declare type PlayerProps = {
    id?: number;
    available_cards?: string[];
    xp_points?: number;
    ready?: boolean;
    card_deck?: CardProps[];
    deck_try?: number;
    card_hand?: CardProps[];
    deck?: string[];
}

declare type PlayersInMatchApiProps = {
    id: number;
    ready?: boolean;
    deck_try?: number;
    card_deck?: CardProps[]
    card_hand?: CardProps[]
    card_retry?: CardProps[];
    card_prepare_camp?: CardProps[]
    card_battle_camp?: CardProps[]
    card_in_forgotten_sea?: CardProps[]
    faith_points?: number,
    wisdom_points?: number
    wisdom_available?: number
    fe_inabalavel?: boolean,
    incorruptivel?: boolean
    nao_sofre_danos_de_efeitos?: boolean,
    nao_sofre_ataque_de_herois?: boolean,
    ja_atacou?: number[],
    usou_pecados?: string[],
    usou_milagres?: string[],
    round_eliminado?: number,
    fe_recebida?: number,
    dano_em_fe?: {
        total_aplicado: number,
        total_recebido: number,
        oponentes:{
            [key:number]: {
                dano_aplicado: number,
                dano_recebido: number,
            },
        }
    },

}
