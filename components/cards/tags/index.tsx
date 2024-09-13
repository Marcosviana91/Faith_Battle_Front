import { View, Text, StyleSheet } from "react-native";

type TagProps = {
    tag: 'Imbloqueável' | 'Incorruptível' | 'Indestrutível'; //| 'Amigo de Deus' | 'Fé Inabalável' | 'Não efeitos' | 'Intangível';
}

export default function CardTag(props: TagProps) {

    const style = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderColor: '#000',
            padding: 2,
            paddingHorizontal: 4,
            alignItems: "center",
            borderRadius:8,
        }
    })

    var backgroundColor: string
    switch (props.tag) {
        case "Incorruptível":
            backgroundColor = '#f00'
            break
        case "Indestrutível":
            backgroundColor = '#ff0'
            break
        case "Imbloqueável":
            backgroundColor = '#0f0'
            break
    }

    return (
        <View style={[style.container, { backgroundColor }]}>
            <Text style={{ fontWeight: 'bold' }}>{props.tag}</Text>
        </View>
    )
}