import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"

import SearchRoomRow from '@/components/searchRoomRow';
import { ThemedTextInput } from "@/components/themed/ThemedTextInput";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useGetRoomsQuery } from '@/store/api';


export default function SearchRoomList() {
    const [roomList, setRoomList] = useState<RoomApiProps[]>([])
    const [showFilter, setShowFilter] = useState(false)
    const [filterText, setFilterText] = useState("")
    const dataRoomList = useGetRoomsQuery()


    useEffect(() => {
        setRoomList(dataRoomList.data?.room_list!)
    }, [dataRoomList])

    return (

        <View style={{ width: '100%' }}>
            <View style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                    <Pressable
                        onPress={() => {
                            setShowFilter(!showFilter)
                        }}
                    >
                        {showFilter ? <MaterialCommunityIcons name="filter-remove" size={32} color="black" /> : <MaterialCommunityIcons name="filter-plus" size={32} color="black" />}
                    </Pressable>
                    <ThemedTextInput style={{ flex: 1 }} onChangeText={setFilterText} placeholder='filtrar por id ou nome' />
                    <Pressable
                        onPress={dataRoomList.refetch}
                    >
                        <MaterialCommunityIcons name="reload" size={32} color="black" />
                    </Pressable>
                </View>
                {showFilter &&
                    <View>
                        <Text>Times: </Text>
                        <Text>Sala com senha: </Text>
                    </View>
                }
            </View>
            {roomList && (
                <>
                    <View >
                        <Text style={{alignSelf:'center'}}>{roomList.length} salas encontradas</Text>
                        <SearchRoomRow id={'0'} />
                    </View>
                    <ScrollView style={{ height: 270 }}>
                        <View style={[styles.roomListContainer, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]} >
                            {roomList.map((room) => {
                                if (room.name?.toLowerCase().includes(filterText.toLowerCase()) || room.id?.toLowerCase().includes(filterText.toLowerCase())) {
                                    return <SearchRoomRow key={room.id} {...room} />
                                }
                            })}
                        </View>
                    </ScrollView>
                </>

            )}
        </View>

    )
}

const styles = StyleSheet.create({
    roomListContainer: {
        backgroundColor: "red",
        flex: 1,
        rowGap: 4,
    }
});