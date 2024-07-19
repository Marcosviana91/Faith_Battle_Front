import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    children: string;
    onPress?: () => void;
    disabled?: boolean;
    lightColor?: string;
    darkColor?: string;
}

export default function BasicButton(props: Props) {
    const backgroundColor = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'button_txtInput');
    const backgroundColorDisabled = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');
    const styles = StyleSheet.create({
        button: {
            backgroundColor: props.disabled ? backgroundColorDisabled :backgroundColor,
            height: 50,
            // minWidth: 100,
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            borderColor: "gray",
            borderWidth: 1,
        },
    });

    return (
        <TouchableOpacity disabled={props.disabled} style={styles.button} onPress={props.onPress}>
            <Text style={{ fontWeight: '700', color: 'black', textAlign:"center" }}>{props.children}</Text>
        </TouchableOpacity>
    )
}

