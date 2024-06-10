import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from '@/store';

import { setPlayerFocus } from "@/store/reducers/matchReducer";

import { View, Image, Text, StyleSheet, Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { globalStyles } from "@/constants/Styles";

type Props = {
    id: number
    isTarget?: boolean
    isCurrent?: boolean
}

export default function PlayerIcon(props: Props) {
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)

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
                        <Text style={{ fontSize: 24 }}>{props.id}</Text>
                    </View>
                    {props.isTarget && <MaterialCommunityIcons style={styles.playerIconInner} name="target" />}
                    {props.isCurrent && <MaterialCommunityIcons style={styles.playerIconInner} name="play" />}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playerIcon: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: "blue",
        borderWidth: 2,
    },
    playerIconInner: {
        position: "absolute",
        color: "black",
        fontSize: 50,
    },
})