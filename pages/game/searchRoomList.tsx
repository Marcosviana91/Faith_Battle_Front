import { useState, useEffect } from 'react';
import { TextInput, View, Text, ScrollView, StyleSheet } from "react-native"

import SearchRoomRow from '@/components/searchRoomRow';

import { globalStyles } from '@/constants/Styles';

import { useGetRoomsQuery } from '@/store/api';


export default function SearchRoomList() {
    const [roomList, setRoomList] = useState<RoomApiProps[]>([])
    const dataRoomList = useGetRoomsQuery()


    useEffect(() => {
        dataRoomList.refetch()
        if (dataRoomList.data?.room_list) {
            setRoomList(dataRoomList.data.room_list)
        }
    }, [])


    return (

        <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text>Filtro:</Text>
                <TextInput style={[globalStyles.textInput, { flex: 1 }]} />
            </View>
            <SearchRoomRow id={0} />
            {roomList && (
                <ScrollView style={{ height: 270 }}>
                    <View style={styles.roomListContainer} >
                        {roomList.map((room) => {
                            return <SearchRoomRow key={room.id} {...room} />
                        })}
                    </View>
                </ScrollView>

            )}
        </View>

    )
}

const styles = StyleSheet.create({
    roomListContainer: {
        backgroundColor: "red",
        width: "95%",
        flex: 1,
        borderRadius: 8,
        padding: 8,
        rowGap: 8,
    }
});