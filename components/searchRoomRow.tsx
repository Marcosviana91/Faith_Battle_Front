import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ConnectBoxDialog from './connectBoxDialog';


export default function SearchRoomRow(props: RoomApiProps) {
    const [showBoxDialog, setShowBoxDialog] = useState(false)


    if (props.id === '0') {
        return (
            <View style={styles.room_row}>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 120 }]}>Id:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 120 }]}>Nome da Sala:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 40 }]}>Times:</Text>
                <Text style={[styles.row_item, { backgroundColor: "yellow", flexBasis: 40 }]}>
                    <FontAwesome name="users" size={24} color="black" />
                </Text>
            </View>
        )
    }

    var connected_players = 0
    props.connected_players!.forEach(team => {
        team.forEach(player => {
            connected_players += 1
        })
    });

    return (
        <Pressable
            onPress={() => {
                setShowBoxDialog(!showBoxDialog)
            }}
        >
            {showBoxDialog && (
                <ConnectBoxDialog onClose={() => setShowBoxDialog(false)} {...props} />
            )}
            <View style={styles.room_row}>
                <Text style={[styles.row_item, { flexBasis: 120 }]}>{props.id}</Text>
                <Text style={[styles.row_item, { flexBasis: 120 }]}>{props.name}</Text>
                <Text style={[styles.row_item, { flexBasis: 40 }]}>{props.teams == 0 ? 'Sem time' : props.teams}</Text>
                <Text style={[styles.row_item, { flexBasis: 40 }]}>{connected_players} / {props.max_players}</Text>
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
        height: 40,
        verticalAlign: "middle",
        fontSize: 14,
        textAlign: 'center',
    }
})