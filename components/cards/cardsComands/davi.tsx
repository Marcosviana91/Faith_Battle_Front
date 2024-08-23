import BasicButton from "@/components/button/basic"
import { SelectEnemyIconsContainer } from "@/components/player_user/playerIcon"
import { ThemedModal } from "@/components/themed/ThemedModal"
import { RootReducer } from "@/store"
import { toggleCardsToFight } from "@/store/reducers/matchReducer"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"


type Props = {
    onPress?: () => void
    card: CardProps
    setShowModal: (showModal: boolean) => void
}

export function DaviToggleAttack(props: Props) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [showModal, setShowModal] = useState(false)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()


    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <>
            <Pressable
                style={{ backgroundColor: "blue" }}
                onPress={() => {
                    setShowModal(true)
                }}
            >
                <MaterialCommunityIcons name="sword" size={80} color="black" />
            </Pressable>
            <ThemedModal visible={showModal} title='Escolha um oponente' hideCloseButton>
                <View style={{ width:'95%', minHeight:'15%'}}>
                    <SelectEnemyIconsContainer matchData={matchData} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
                </View>
                <View style={{ height: 50, width: 100 }}>
                    <BasicButton
                        disabled={selectedPlayerId === undefined}
                        onPress={() => {
                            let __temp_card = { ...props.card }
                            __temp_card.skill_focus_player_id = matchData?.player_focus_id
                            dispatch(toggleCardsToFight(__temp_card))
                            props.setShowModal(false)
                            if (props.onPress) { props.onPress() }
                        }}
                    >OK</BasicButton>
                </View>
            </ThemedModal>
        </>
    )
}