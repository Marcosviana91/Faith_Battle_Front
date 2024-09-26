import { RootReducer } from "@/store"
import { Button, Pressable, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useNavBarDimension } from "@/hooks/useScreenSizes"
import { PlayerIcon } from "./player_user/playerIcon"
import { NotifyCard } from "./cards/containers/DefaultContainer"
import { addNotify, rmvNotify } from "@/store/reducers/notificationReducer"
import Animated, { BounceInDown, Easing, LinearTransition, SlideOutRight, useSharedValue, withTiming } from "react-native-reanimated"
import { useEffect } from "react"
import useAppWebSocket from "@/hooks/useAppWebSocket"

const NOTIFICATION_WIDTH = 300
const NOTIFICATION_TIMEOUT = 5000


export function NotificationBox() {
    const notificationsData = useSelector((state: RootReducer) => state.notificationReducer.notifications)
    const navBarHeight = useNavBarDimension()
    const dispatch = useDispatch()
    const WS = useAppWebSocket()
    const playersData = useSelector((state: RootReducer) => state.matchReducer.players_data)

    useEffect(() => {
        if (WS.lastJsonMessage) {
            const data = WS.lastJsonMessage as APIResponseProps
            if (data.data_type === "notification") {
                console.log('<<< NOTIFICATION: ', data.notification)
                let notification = data.notification!
                if (notification?.message && notification.message.includes('%PLAYER_NAME')) {
                    const name_index_start = notification.message.indexOf('%PLAYER_NAME')
                    const name_index_end = notification.message.indexOf('%',name_index_start+1)
                    const player_id = notification.message.substring(name_index_start+1, name_index_end).split(":")[1]
                    const username = playersData?.filter((player) => player.id === Number(player_id))[0].username!
                    notification.message = notification.message.replace(`%PLAYER_NAME:${player_id}%`, username)
                }
                dispatch(addNotify(notification))
            }
        }
    }, [WS.lastJsonMessage])


    return (
        <View style={{ zIndex: 9000, position: 'absolute', right: 0, bottom: navBarHeight, paddingBottom: 8, width: NOTIFICATION_WIDTH, flexDirection: 'column', justifyContent: 'flex-end', paddingRight: 8, gap: 8 }}>
            {notificationsData.map((notification) => (<Notification key={notification.id} {...notification} />))}
            {/* <Button
                title="ADD"
                onPress={() => {
                    dispatch(addNotify({
                        stillUntilDismiss: true,
                        title: "Nova rodada!",
                        message: "Sua vez!",
                    }))
                }}
            /> */}
        </View>
    )
}

function Notification(props: NotificationProps) {
    const dispatch = useDispatch()

    const width = useSharedValue(NOTIFICATION_WIDTH)

    useEffect(() => {
        if (!props.stillUntilDismiss) {
            width.value = withTiming(0, { duration: NOTIFICATION_TIMEOUT, easing: Easing.linear })
            setTimeout(() => {
                dispatch(rmvNotify(props.id!))
            }, NOTIFICATION_TIMEOUT)
        }
    }, [])


    return (
        <Pressable
            onPress={() => {
                dispatch(rmvNotify(props.id!))
                width.value = 0
            }}
        >
            <Animated.View entering={BounceInDown} exiting={SlideOutRight} layout={LinearTransition}
                style={{ backgroundColor: '#fffb', minHeight: 90, paddingBottom:8, width: NOTIFICATION_WIDTH, borderTopStartRadius: 8, borderBottomStartRadius: 8 }}
            >
                {!props.stillUntilDismiss && <View style={{ width: '100%', height: 8, position: 'absolute' }}>
                    <Animated.View style={{ width: width, alignSelf: 'flex-end', height: 8, backgroundColor: 'red' }} />
                </View>}
                {props.message ?
                    (<View style={{ paddingHorizontal: 8 }}>
                        <View style={{height:30}}>
                            <Text style={{ fontSize: 18, fontWeight: 700 }}>{props.title}</Text>
                        </View>
                        <View>
                            <Text>{props.message}</Text>
                        </View>

                    </View>) :
                    (<View style={{ flexDirection: 'row', paddingTop: 10, paddingEnd: 4, justifyContent: 'flex-end', gap: 16 }}>
                        <View>
                            <PlayerIcon id={props.player_trigger_id!} type="mini" isCurrent />
                        </View>
                        <View>
                            <NotifyCard card_slug={props.card_trigger_id!.split('_')[1]} />
                        </View>
                        <View>
                            <PlayerIcon id={props.player_target_id!} type="mini" isTarget />
                        </View>
                        {props.card_target_id &&
                            <View>
                                <NotifyCard card_slug={props.card_target_id.split('_')[1]} />
                            </View>
                        }
                    </View>)}

            </Animated.View>
        </Pressable>

    )
} 