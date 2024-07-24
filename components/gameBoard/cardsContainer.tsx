import { View, StyleSheet, ScrollView } from "react-native";
import Card from "@/components/cards";


type CardsContainerProps = {
    size?: "small" | "minimum" | "medium";
    zone?: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight" | "elias_destroy"
    cards?: CardProps[];
    target_index?: number;
    target_slug?: string;
}


export default function CardsContainer(props: CardsContainerProps) {
    const styles = StyleSheet.create({
        cardsContainer: {
            // backgroundColor: "#000000cc",
            height: props.size === 'small' ? "auto" : "100%",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,

            columnGap: (props.zone == "select" || props.zone == "retry") ? 0 : 8,
            padding: (props.zone == "select" || props.zone == "retry") ? 0 : 4,
        },
    })

    console.log("Container target: " + props.target_slug)

    return (
        <ScrollView horizontal>
            <View style={[styles.cardsContainer,]}>
                {props.cards?.map((card, _index) => (
                    <Card key={_index} index={props.target_index! >= 0 ? props.target_index : _index} card={card} size={props.size} zone={props.zone} target_slug={props.target_slug} />
                )
                )}
            </View>
        </ScrollView>
    )
}


