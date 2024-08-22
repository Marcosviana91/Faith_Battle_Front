import React from 'react';
import { View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { ThemedView } from '../../themed/ThemedView';

import { useCards } from '@/hooks/useCards';
import { ThemedText } from '../../themed/ThemedText';
import { useScreenSizes } from '@/hooks/useScreenSizes';

type SelectableCardsContainerProps = {
    cards?: CardProps[];
    card_size?: "small" | "minimum";
    get_selected_card?: (card: CardProps) => void;
    selected_card?: CardProps;
}

// SubContainer
export function SelectableCardsContainer(props: SelectableCardsContainerProps) {
    const styles = StyleSheet.create({
        cardsContainer: {
            // backgroundColor: "#000000cc",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,
            columnGap: 8,
            padding: 4,
        },
    })


    console.log("selected_card ", props.selected_card);

    return (
        // <View style={{ width: '100%', height: 230, backgroundColor:'red' }}>
        <View style={{ width: '100%', backgroundColor:'red' }}>
            {props.cards?.length === 0 ?
                <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{ fontSize: 60, lineHeight: 200 }}>Sem cartas</ThemedText>
                </View> :
                <ScrollView horizontal>
                    <View style={[styles.cardsContainer]}>
                        {props.cards?.map((card, _index) => (
                            <Pressable
                                onPress={() => {
                                    if (props.get_selected_card) {
                                        props.get_selected_card(card)
                                    }
                                }}
                            >
                                <SubCard key={_index} card={card} selected_card={props.selected_card} size={props.card_size} />
                            </Pressable>
                        )
                        )}
                    </View>
                </ScrollView>
            }
        </View>
    )
}


type Props = {
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    selected_card?: CardProps;
    size?:  "small" | "minimum";
}

function SubCard(props: Props) {

    const { width: windowWidth } = useScreenSizes();

    // tamanho padrão
    //  width: 430,
    //  height: 600,
    const defaultWidth = windowWidth
    const defaultHeight = defaultWidth * 1.3
    const mediumFactor = 4 //Usado na Página de Cartas
    const minimumFactor = 7 //Usado na Página de Cartas

    const styles = StyleSheet.create({
        image: {
            height: (defaultHeight / mediumFactor),
            width: (defaultWidth / mediumFactor),
            borderWidth: 2,
            borderRadius: 14,
        },
        imageMinimum: {
            height: (defaultHeight / minimumFactor),
            width: (defaultWidth / minimumFactor),
            borderWidth: 2,
            borderRadius: 14,
        },
        card_ready: {
            borderColor: 'green',
        },
        card_used: {
            borderColor: 'red',
        },
        card_not_enough: {
            borderColor: 'grey',
        },
    })

    var cardSize = styles.image
    if (props.size === 'minimum') {cardSize = styles.imageMinimum}

    // Fazer o esquema de selecionar a carta igual o icone de jogador
    var borderColor = styles.card_not_enough
    if (props.selected_card === props.card) {
        borderColor = styles.card_ready
    }


    return (
        <>
            <View style={{ alignSelf: "center" }}>
                <Image
                    resizeMode="stretch"
                    style={[cardSize, borderColor]}
                    source={useCards({ card_slug: props.card?.slug })}
                />
                {/* Pontos de Ataque e Defesa */}
                {props.card?.in_game_id && (props.card?.card_type === 'hero' || props.card?.card_type === 'legendary') &&
                    <View style={{ height: 30, width: '100%', position: 'absolute', bottom: 2, alignItems: 'center' }}>
                        <View style={{ height: 30, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <ThemedView lightColor="#ffe600" darkColor="#585000" style={{ flexGrow: 1, height: 30, borderTopStartRadius: 8, borderBottomStartRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.attack_point}</ThemedText>
                            </ThemedView>

                            <ThemedView lightColor="#ff3838" darkColor="#421313" style={{ flexGrow: 1, height: 30, borderTopEndRadius: 8, borderBottomEndRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                <ThemedText lightColor="black" darkColor="#9BA1A6" style={{ fontSize: 24, fontWeight: 700, lineHeight: 26 }}>{props.card?.defense_points}</ThemedText>
                            </ThemedView>

                        </View>
                    </View>
                }
            </View>
        </>
    )
}
