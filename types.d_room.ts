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


