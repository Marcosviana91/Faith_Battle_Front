import { StyleSheet, View, Text } from 'react-native';


export default function SearchRoomRow(props: RoomApiProps) {

    if (props.room_id === 0) {
        return (
            <View style={styles.room_row}>
                <Text style={[styles.row_item, {backgroundColor: "yellow", flexBasis:40}]}>Id:</Text>
                <Text style={[styles.row_item, {backgroundColor: "yellow", flexBasis:120}]}>Nome da Sala:</Text>
                <Text style={[styles.row_item, {backgroundColor: "yellow", flexBasis:80}]}>Estilo:</Text>
                <Text style={[styles.row_item, {backgroundColor: "yellow", flexBasis:80}]}>Jogadores:</Text>
            </View>
        )
    }
    return (
        <View style={styles.room_row}>
            <Text style={[styles.row_item, {flexBasis:40}]}>{props.room_id}</Text>
            <Text style={[styles.row_item, {flexBasis:120}]}>{props.room_name}</Text>
            <Text style={[styles.row_item, {flexBasis:80}]}>{props.room_game_style}</Text>
            <Text style={[styles.row_item, {flexBasis:80}]}>{props.room_current_players} / {props.room_max_players}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    room_row: {
        flexDirection: "row",
        columnGap: 2,
    },
    row_item: {
        backgroundColor: "cyan",
        flexGrow:1,
        height: 30,
        verticalAlign:"middle",
        fontSize: 10,
        textAlign:'center',
        fontFamily: 'monospace',
    }
})