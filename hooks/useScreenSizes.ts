import { useWindowDimensions } from "react-native";

export function useScreenSizes() {
    const {height} = useWindowDimensions()
    return {
        height: height,
        width: height*3/4
    }
}