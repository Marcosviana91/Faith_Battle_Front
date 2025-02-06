import { FontAwesome } from "@expo/vector-icons"
import { useEffect } from "react"
import { View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

export default function FullLoading() {
    const SpinnerDegree = useSharedValue(0)

    const SpinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: SpinnerDegree.value + 'deg'
            }]
        }
    })

    useEffect(() => {
        SpinnerDegree.value = withRepeat(withTiming(359, { duration: 2000, easing: Easing.linear }), -1)
    }, [])

    return (
        <View style={{ position: 'absolute', zIndex: 1, backgroundColor: '#cccccc73', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={SpinnerStyle}>
                <FontAwesome name="spinner" size={60} />
            </Animated.View>
        </View>
    )
}