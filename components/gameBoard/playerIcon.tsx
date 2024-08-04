import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from '@/store';

import { setPlayerFocus } from "@/store/reducers/matchReducer";

import { View, Image, Text, StyleSheet, Pressable } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useGetUserDataMutation } from '@/store/api'
import { globalStyles } from "@/constants/Styles";
import { useAvatar } from "@/hooks/usePlayerData";

type Props = {
    id: number
    type: "normal" | "mini"
    isTarget?: boolean
    isCurrent?: boolean
    isReady?: boolean
    size?: number
}


export default function PlayerIcon(props: Props) {
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [getUser, { data: userData, error: userError }] = useGetUserDataMutation();
    const [avatar, setAvatar ] = useState()


    const styles = StyleSheet.create({
        playerIconMini: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: props.size ? props.size : 50,
            height: props.size ? props.size : 50,
            borderRadius: 25,
            borderColor: "blue",
            borderWidth: 2,
            overflow: "hidden",
        },
        playerIcon: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#88f",
            width: 75,
            height: 125,
            borderRadius: 25,
            borderColor: "blue",
            borderWidth: 2,
            overflow: "hidden",
        },
        playerImage: {
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: 12,
        },
        playerIconCurrent: {
            fontSize: 50,
            color: "#0000008d",
            borderRadius: 25,
            position: "absolute",
        },
        playerIconTarget: {
            fontSize: 80,
            color: "#000000a4",
            position: "absolute",
            left: -15,
            top: -15,
        },
    })
    useEffect(() => {
        if (props.id > 0) {
            getUser(props.id)
        }
    }, [])
    useEffect(() => {
        if (userData) {
            setAvatar(useAvatar({avatar_index:userData.user_data?.avatar!}))
        }
    }, [userData])

    if (props.type === 'normal') {
        if (props.id === 0) {
            return (
                <View style={[styles.playerIcon, { backgroundColor: '#777', borderColor: '#444' }]}>
                    <Text>OPEN</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: "flex-start", width: 75, overflow: "hidden" }}>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>{userData?.user_data?.username}</Text>
                <View style={[styles.playerIcon, styles.playerImage]}>
                    <Image
                        style={{ height: 125, width: 75 }}
                        source={ avatar}
                    />
                    {props.isReady &&
                        <View style={{ position: 'absolute', height: "100%", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff9b" }}>
                            <Ionicons
                                name="checkmark-circle"
                                size={32} color="black"
                            />
                        </View>
                    }
                </View>
            </View>
        )
    }


    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainer}>
                <Pressable onPress={
                    () => {
                        if (playerData?.id !== props.id) {
                            dispatch(setPlayerFocus(props.id))
                        }
                    }
                }>
                    <View
                        style={{
                            position: "absolute",
                            top: -12,
                            zIndex: 1,
                            backgroundColor: '#ffffffaa',
                            paddingHorizontal: 2,
                            borderRadius: 8,
                            minWidth: props.size ? props.size : 50,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: "700" }}>{userData?.user_data?.username}</Text>
                    </View>
                    <View style={styles.playerIconMini}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={avatar}
                        />
                    </View>
                    {props.isTarget && <MaterialCommunityIcons style={styles.playerIconTarget} name="target" />}
                    {props.isCurrent && <MaterialCommunityIcons style={styles.playerIconCurrent} name="play" />}
                </Pressable>
            </View>
        </View>
    )
}
