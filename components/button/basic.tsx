import { TouchableOpacity, Text, StyleSheet, View, DimensionValue } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';
import React from "react";

type Props = {
    children: string | React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    lightColor?: string;
    darkColor?: string;
    height?: DimensionValue | undefined;
}

export default function BasicButton(props: Props) {
    const backgroundColor = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'button_txtInput');
    const backgroundColorDisabled = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'button_background_disabled');
    const styles = StyleSheet.create({
        button: {
            backgroundColor: props.disabled ? backgroundColorDisabled :backgroundColor,
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
        <View style={{height: props.height? props.height : 50, minWidth: 100}}>
            <TouchableOpacity disabled={props.disabled} style={styles.button} onPress={props.onPress}>
                <Text style={{ fontWeight: '700', color: 'black', textAlign:"center" }}>{props.children}</Text>
            </TouchableOpacity>
        </View>
    )
}

