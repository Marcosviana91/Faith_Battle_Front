import { View, StyleSheet, ScrollView } from "react-native";
import Card from "@/components/cards";


type CardsContainerProps = {
    size?: "small" | "minimum";
    zone: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting"
    cards?: CardProps[];
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
    return (
        <ScrollView horizontal>
            <View style={[styles.cardsContainer,]}>
                {props.cards?.map((card, _index) => (
                    <Card key={_index} card={card} size={props.size} zone={props.zone} />
                )
                )}
            </View>
        </ScrollView>
    )
}


