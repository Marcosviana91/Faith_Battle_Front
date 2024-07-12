import { View, StyleSheet } from "react-native";
import Card from "@/components/cards";


type Props = {
    size?: "normal" | "small";
    cards?: string[];
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
        {props.cards?.map((card_id, _index) => (
            <Card key={_index} slug={card_id} size={props.size === 'normal' ? 'small' : 'minimum'} in_game />
        ))}
    </View>)
}


