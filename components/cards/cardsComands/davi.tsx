import BasicButton from "@/components/button/basic"
import { SelectEnemyIconsContainer } from "@/components/player_user/playerIcon"
import { ThemedModal } from "@/components/themed/ThemedModal"
import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { toggleCardsToFight } from "@/store/reducers/matchReducer"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"


type Props = {
    onPress?: () => void
    card: CardProps
    zone?: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight"
    target_index?: number;
    target_slug?: string;
}

export function DaviToggleAttack(props: Props) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [showModal, setShowModal] = useState(false)


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
                <View>
                    <SelectEnemyIconsContainer matchData={matchData}/>
                </View>
                <View style={{ height: 50, width: 100 }}>
                    <BasicButton
                        disabled={matchData?.player_focus_id === player?.id}
                        onPress={() => {
                            let __temp_card = { ...props.card }
                            __temp_card.skill_focus_player_id = matchData?.player_focus_id
                            dispatch(toggleCardsToFight(__temp_card))
                            if (props.onPress) { props.onPress() }
                        }}
                    >OK</BasicButton>
                </View>
            </ThemedModal>
        </>
    )
}