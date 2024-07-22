import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from '@/store';

import { setPlayerFocus } from "@/store/reducers/matchReducer";

import { View, Image, Text, StyleSheet, Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { globalStyles } from "@/constants/Styles";
import { URI } from "@/store/server_urls";

type Props = {
    id: number
    isTarget?: boolean
    isCurrent?: boolean
}


export default function PlayerIcon(props: Props) {
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootReducer) => state.authReducer.user_data)

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
                    <View style={styles.playerIcon}>
                        {/* <Text style={{ fontSize: 24 }}>{props.id}</Text> */}
                        <Image
                        style={{height:50, width: 50}}
                            source={{
                                uri: `http://${URI}/static/profile_images/${props.id}.png`,
                            }}
                        />
                    </View>
                    {props.isTarget && <MaterialCommunityIcons style={styles.playerIconTarget} name="target" />}
                    {props.isCurrent && <MaterialCommunityIcons style={styles.playerIconCurrent} name="play" />}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playerIcon: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: "blue",
        borderWidth: 2,
        overflow: "hidden",
    },
    playerIconCurrent: {
        fontSize: 50,
        color: "#000000",
        borderRadius:25,
        position: "absolute",
    },
    playerIconTarget: {
        fontSize: 80,
        color: "#000000f6",
        position: "absolute",
        left: -15,
        top: -15,
    },
})