import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/store";
import { useGetUserDataMutation } from "@/store/api";
import PlayerAvatar64 from "./PlayerAvatar64";
import { addPlayersData } from "@/store/reducers/matchReducer";
import { View } from "react-native";
import { ThemedText } from "../themed/ThemedText";
import Ionicons from '@expo/vector-icons/Ionicons';


type Props = {
    id: number
    type: "normal" | "mini"
    isTarget?: boolean
    isCurrent?: boolean
    isReady?: boolean
    size?: number
}

export default function PlayerIcon64(props: Props) {
    // 
    const dispatch = useDispatch()
    const playersData = useSelector((state: RootReducer) => state.matchReducer.players_data)
    const _PlayerData = playersData?.filter((player) => player.id === props.id)[0]
    const [getUser, { data: userData, error: userError }] = useGetUserDataMutation();
    console.log("props", props)

    useEffect(() => {
        if (props.id > 0) {
            if (!_PlayerData) {
                getUser(props.id)
            }
        }
    }, [])

    useEffect(() => {
        // console.log("useEffect 2")
        if (userData) {
            if (!_PlayerData) {
                dispatch(addPlayersData(userData))
            }
        }
        // console.log('_PlayerData', _PlayerData)
    }, [userData])


    // "_unknown.jpeg"
    if (props.id === 0) {
        return (
            <View>
                <ThemedText>OPEN</ThemedText>
                <PlayerAvatar64 file_name='_unknown.jpeg' size={50} />
            </View>
        )
    }

    return (<>{_PlayerData &&
        <View style={{ alignItems: 'center' }}>
            <ThemedText style={{ width: '100%', textAlign: 'center' }}>{_PlayerData?.username}</ThemedText>
            <PlayerAvatar64 file_name={_PlayerData?.avatar!} size={props.type == 'normal' ? props.size : 40}
                style={{
                    borderWidth: 2,
                    // borderColor: 'red',
                    borderColor: props.isCurrent ? 'green' : props.isTarget ? 'red': 'black',
                }}
            />
            {props.isReady &&
                <View style={{ position: 'absolute', height: 100, width: 100, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff9b" }}>
                    <Ionicons
                        name="checkmark-circle"
                        size={48} color="black"
                    />
                </View>
            }
        </View>

    }

    </>
        // <PlayerAvatar64 file_name={userData?.avatar!}/>
    )
}