import { View, StyleSheet } from "react-native";
import Card from "@/components/cards";


type Props = {
    size?: "normal" | "small";
    cards?: number[];
}

export default function CardsContainer(props: Props) {
    const styles = StyleSheet.create({

        cardsContainer: {
            backgroundColor: "#000000cc",
            height: props.size === 'normal' ? 120 : 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 8,
            borderRadius: 4,
            padding: 4,
        },
    
    })

    return (<View style={[styles.cardsContainer,]}>
        {props.cards?.map(card_id => (
            <Card key={card_id} id={card_id} size={props.size === 'normal' ? 'small' : 'minimum'} />
        ))}
    </View>)
}


