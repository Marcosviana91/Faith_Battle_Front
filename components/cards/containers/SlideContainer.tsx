import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, StyleSheet, Pressable, Image, Text } from "react-native"


import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { SlideUp } from '@/components/cards/motions/moveCard';

import { useCards } from "@/hooks/useCards";

type SlideUpContainerProps = {
    small?: boolean;
    cards: CardProps[],
    card_up_action: (card: CardProps) => void;
    card_down_action?: (card: CardProps) => void;

    set_selected_card: (card: CardProps) => void; // Usado para exibir o modal
    show_modal?: boolean;
    set_show_modal?: (show_modal: boolean) => void;
}

export function SlideUpContainer(props: SlideUpContainerProps) {

    return (
        <View style={{ width: "100%", height: '100%' }}>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', gap: 2 }} showsHorizontalScrollIndicator={false}>
                {props.cards.map((card, _index) => (
                    <SlideUp
                        key={_index}
                        up_action={(onUp) => {
                            if (onUp) {
                                props.card_up_action(card)
                            } else {
                                if ( props.card_down_action) {
                                    props.card_down_action(card)
                                }
                            }
                        }}
                    >
                        <Card card={card} small={props.small} />
                    </SlideUp>
                ))}
            </ScrollView>
        </View>
    )
}

export function SlideDownContainer(props: SlideUpContainerProps) {

    return (
        <View style={{ width: "100%", height: '100%' }}>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', gap: 2 }}>
                {props.cards.map((card, _index) => (
                    <SlideUp
                        key={_index}
                        up_action={(onUp) => {
                            if (onUp) {
                                props.card_up_action(card)
                            } else {
                                if ( props.card_down_action) {
                                    props.card_down_action(card)
                                }
                            }
                        }}
                    >
                        <Card card={card} small={props.small} />
                    </SlideUp>
                ))}
            </ScrollView>
        </View>
    )
}

type Props = {
    small?: boolean
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
}

function Card(props: Props) {
    //     const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight
    //     const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!


    const styles = StyleSheet.create({
        image: {
            height: 150,
            width: 120,
            borderWidth: 2,
            borderRadius: 12,
        },
        card_down: {
            borderColor: 'green',
        },
        card_up: {
            borderColor: 'red',
        },
    })


    //     useEffect(() => {
    //         if (props.card?.in_game_id) {
    //             setCurrentCardId(props.card?.in_game_id!.split('_')[0])
    //         }
    //     }, [props.card])

    return (
        <View>
            <Image
                resizeMode="stretch"
                style={styles.image}
                source={useCards({ card_slug: props.card?.slug })}
            />
        </View>

        //             {/* Overlay para cartas não ready */}
        //             {props.card?.status !== 'ready' && String(player.id) === current_card_id && <View style={{ width: '100%', height: '100%', backgroundColor: '#000a', position: 'absolute', zIndex: 1, borderRadius: 10 }} />}
        //             <Image
        //                 resizeMode="stretch"
        //                 style={[cardSize]}
        //                 source={useCards({ card_slug: props.card?.slug })}
        //             />
        //             {/* Pontos de Ataque e Defesa */}
        //             {props.card?.in_game_id && (props.card?.card_type === 'hero' || props.card?.card_type === 'legendary') &&
        //                 <View style={{ height: 30, width: '100%', position: 'absolute', bottom: 2, alignItems: 'center' }}>
        //                     <View style={{ height: 30, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>

        //                         <ThemedView lightColor="#ffe600" darkColor="#585000" style={{ flexGrow: 1, height: 30, borderTopStartRadius: 8, borderBottomStartRadius: 8, alignItems: "center", justifyContent: "center" }}>
        //                             <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.attack_point}</ThemedText>
        //                         </ThemedView>

        //                         <ThemedView lightColor="#ff3838" darkColor="#421313" style={{ flexGrow: 1, height: 30, borderTopEndRadius: 8, borderBottomEndRadius: 8, alignItems: "center", justifyContent: "center" }}>
        //                             <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.defense_point}</ThemedText>
        //                         </ThemedView>

        //                     </View>
        //                 </View>
        //             }
        //         </View>
    )
}
