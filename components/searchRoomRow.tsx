import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import ConnectBoxDialog from './connectBoxDialog';


export default function SearchRoomRow(props: RoomApiProps) {
    const [showBoxDialog, setShowBoxDialog] = useState(false)

    if (props.id === 0) {
        return (
            <View style={styles.room_row}>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 40 }]}>Id:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 120 }]}>Nome da Sala:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 80 }]}>Estilo:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 80 }]}>Jogadores:</Text>
            </View>
        )
    }
    return (
        <Pressable
            onPress={() => {
                setShowBoxDialog(!showBoxDialog)
            }}
        >
            {showBoxDialog && (
                <ConnectBoxDialog onClose={()=> setShowBoxDialog(false)} {...props} />
            )}
            <View style={styles.room_row}>
                <Text style={[styles.row_item, { flexBasis: 40 }]}>{props.id}</Text>
                <Text style={[styles.row_item, { flexBasis: 120 }]}>{props.room_name}</Text>
                <Text style={[styles.row_item, { flexBasis: 80 }]}>{props.room_game_type}</Text>
                <Text style={[styles.row_item, { flexBasis: 80 }]}>{props.room_current_players} / {props.room_max_players}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    room_row: {
        flexDirection: "row",
        columnGap: 2,
    },
    row_item: {
        backgroundColor: "cyan",
        flexGrow: 1,
        height: 30,
        verticalAlign: "middle",
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'monospace',
    }
})