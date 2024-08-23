import { Pressable, ScrollView, View, StyleSheet, Image } from "react-native";

import { useCards } from "@/hooks/useCards";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";


type SelectableCardsContainerProps = {
    cards: CardProps[],
    card_size?: "small" | "minimum";
    set_selected_card: (card: CardProps) => void;
    selected_card?: CardProps;
}

export function SelectableCardsContainer(props: SelectableCardsContainerProps) {

    return (
        <View style={{ width: "100%" }}>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', gap: 2 }}>
                {props.cards.map((card, _index) => (
                    <Pressable
                        key={_index}
                        onPress={() => {
                            props.set_selected_card(card)
                        }}
                    >
                        <Card size={props.card_size} card={card} selected_card={props.selected_card} />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}


type Props = {
    size?: "small" | "minimum";
    card?: CardProps; //Caso não seja passado um Slug, deve renderizar uma carta virada de costa
    selected_card?: CardProps;
}

export function Card(props: Props) {
    // const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    const { width: windowWidth, height: windowHeight } = useScreenSizes();

    // tamanho padrão
    //  width: 430,
    //  height: 600,
    const defaultWidth = windowWidth
    const defaultHeight = defaultWidth * 1.3
    const smallFactor = 6 // Usado na mão do jogador
    const minimumFactor = 8 // Usado no GameBoard

    const styles = StyleSheet.create({
        imageSmall: {
            height: (defaultHeight / smallFactor),
            width: (defaultWidth / smallFactor),
            borderWidth: 2,
            borderRadius: 12,
        },
        imageMinimum: {
            height: (defaultHeight / minimumFactor),
            width: (defaultWidth / minimumFactor),
            borderWidth: 2,
            borderRadius: 12,
        },
        card_selected: {
            borderColor: 'green',
        },
        card_not_selected: {
            borderColor: 'grey',
        },
    })

    const cardSize = (props.size == 'minimum') ? styles.imageMinimum : styles.imageSmall
    const borderColor = (props.card === props.selected_card) ? styles.card_selected : styles.card_not_selected

    return (
        <View>

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
    )
}