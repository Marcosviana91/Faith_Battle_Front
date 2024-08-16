declare type RoomApiProps = {
    id?: string;
    name?: string;
    created_by?: PlayerProps;
    // Stage 0: players has connecteds, check decks
    // Stage 1: Sort cards to all players, retry sort
    // Stage 2: The game is in curse
    room_stage?: number;

    connected_players?: PlayerProps[];
    max_players?: number;
    match_type?: string;
    password?: string;
    has_password?: boolean;
}

declare type MoveProps = {
    match_id: string;
    round_match: number;
    player_move: number;
    card_id: string;
    move_type: string // move_to_prepare, move_to_battle, attack, defense, attach, dettach, active, passive
    player_target: number;
    player_target2: number;
    card_target?: string
}


