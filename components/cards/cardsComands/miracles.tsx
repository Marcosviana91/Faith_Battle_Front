import { View, Text, Pressable } from 'react-native';
import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

type Props = {
    onPress?: () => void
    card: CardProps
}

export function OnInvoke(props: Props) {
    console.log("Invocou " + props.card.in_game_id)
    return (
        <View>
            <Text style={{backgroundColor:'white'}}>{props.card.in_game_id}</Text>
        </View>
    )
}