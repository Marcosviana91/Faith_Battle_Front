import { RootReducer } from "@/store"
import { View, Text} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useNavBarDimension } from "@/hooks/useScreenSizes"


export function NotificationBox() {
    const notificationsData = useSelector((state: RootReducer) => state.notificationReducer.notifications)
    const navBarHeight = useNavBarDimension()

    return null ; (
        <View style={{ backgroundColor: '#fff7', zIndex: 9000, position: 'absolute', right: 0, bottom: navBarHeight, paddingBottom: 8, height: "100%", width: 280, flexDirection: 'column-reverse', paddingRight: 8, gap: 8 }}>
            {notificationsData.map((notification) => (<Notification {...notification} />))}

        </View>
    )
}

function Notification(props: NotificationProps) {
    const dispatch = useDispatch()
    return (
        <View style={{ backgroundColor: 'cyan', height: 100 }}>
            <View style={{ width: '100%', height:8 }}>
                <View style={{ width: '5%', alignSelf: 'flex-end', height:8, backgroundColor:'red' }}>
                </View>
            </View>
            <View style={{ backgroundColor:'#fffc', flex:1, flexDirection:'row' }}>

                <Text>{props.player_trigger_id}</Text>
                <Text>{props.card_trigger_id.split('-')[1]}</Text>
                <Text>{props.player_target_id}</Text>
                {props.card_target_id &&
                    <>
                        <Text>{props.card_target_id.split('-')[1]}</Text>
                    </>
                }
            </View>
        </View>
    )
} 