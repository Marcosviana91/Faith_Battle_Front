import { useWindowDimensions, Dimensions, Platform } from "react-native";

export function useScreenSizes() {
    const {height} = useWindowDimensions()
    return {
        height: height,
        width: height*3/4
    }
}

export function useNavBarDimension() {
    const screen = Dimensions.get('screen')
    const window = Dimensions.get('window')

    return (Platform.OS == "android" ? Math.fround(screen.height - window.height) : 0)

}