import { useState } from "react";
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { View, StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import Card from "@/components/cards";
import { FontAwesome } from '@expo/vector-icons';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";


type IndividualContainerContainerProps = {
    size?: "small" | "minimum";
    card: CardProps;
}
type CardsContainerProps = {
    size?: "small" | "minimum";
    zone: "hand" | "prepare" | "battle" | "deck" | "forgotten_sea"
    cards?: CardProps[];
}

function IndividualContainer(props: IndividualContainerContainerProps) {
    const [showComands, setShowComands] = useState(false)
    const WS = useWebSocket(`ws://${URI}/ws/`, {share:true});

    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id


    return (
        <View>
            <Modal visible={showComands} transparent animationType="fade" >
                <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor:"#ffffffb7" }}>
                    <Pressable
                        onPress={() => {
                            const card_move = {
                                "data_type": "match_move",
                                "match_move": {
                                    "match_id": matchData?.id,
                                    "round_match": matchData?.round_match,
                                    "player_move": player?.id,
                                    "card_id": props.card.in_game_id,
                                    "move_type": "move_to_prepare"
                                }
                            }
                            WS.sendJsonMessage(card_move)
                            setShowComands(false)
                        }}
                    >
                        <FontAwesome name="arrow-up" size={80} color="black" />
                    </Pressable>
                    <Card slug={props.card.slug} size={"normal"}
                        in_game on_press={() => {
                            setShowComands(false)
                        }}
                    />
                </View>

            </Modal>

            <Card slug={props.card.slug} size={props.size}
                in_game on_press={() => {
                    // setCardSize("medium")
                    setShowComands(true)
                }}
            />
        </View>
    )
}

export default function CardsContainer(props: CardsContainerProps) {
    const styles = StyleSheet.create({
        cardsContainer: {
            backgroundColor: "#000000cc",
            height: props.size === 'small' ? "auto" : "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 8,
            borderRadius: 4,
            padding: 4,
        },
    })
    return (<View style={[styles.cardsContainer,]}>
        <ScrollView horizontal>
        {props.cards?.map((card, _index) => (
            <IndividualContainer key={_index} card={card} size={props.size} />
        ))}
        </ScrollView>
    </View>)
}


