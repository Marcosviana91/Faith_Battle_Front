import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    children: string;
    onPress?: () => void;
}

export default function BasicButton(props: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={{ fontWeight: '700', color: 'black' }}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "cyan",
        height: 50,
        // minWidth: 100,
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        borderColor: "gray",
        borderWidth: 1,
        shadowRadius: 8,
    },
});