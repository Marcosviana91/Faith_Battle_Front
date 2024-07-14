import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    children: string;
    onPress?: () => void;
    lightColor?: string;
    darkColor?: string;
}

export default function BasicButton(props: Props) {
    const backgroundColor = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'button_txtInput');
    const styles = StyleSheet.create({
        button: {
            backgroundColor: backgroundColor,
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

    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={{ fontWeight: '700', color: 'black', textAlign:"center" }}>{props.children}</Text>
        </TouchableOpacity>
    )
}

