import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Props = {
    values: String[]
    onPress?: (arg0: any) => void;
}

export default function ToggleButton(props: Props) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <View style={styles.buttonContainer}>
            {props.values.map((button, _index, _array) => {
                var buttonStyle = {}
                var buttonActive = {}
                if (_index === 0) {
                    buttonStyle = styles.buttonItemStart
                }
                else if (_index === _array.length - 1) {
                    buttonStyle = styles.buttonItemEnd
                }
                if (activeTab === _index) {
                    buttonActive = styles.buttonItemActive
                }
                return (
                    <TouchableOpacity
                        style={[styles.buttonItem, buttonStyle, buttonActive]}
                        key={_index}
                        onPress={()=>{
                            if (props.onPress) {
                                props.onPress(_index)
                            }
                            setActiveTab(_index);
                        }}
                    >
                        <Text>{button.toUpperCase()}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        width: '100%',
        flex:1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 16,
        borderColor: "gray",
        borderWidth: 1,
    },
    buttonItem: {
        backgroundColor: "gray",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },
    buttonItemStart: {
        borderTopStartRadius: 16,
        borderBottomStartRadius: 16,
    },
    buttonItemEnd: {
        borderTopEndRadius: 16,
        borderBottomEndRadius: 16,
        
    },
    buttonItemActive: {
        shadowRadius: 8,
        backgroundColor: "cyan",
    }
});