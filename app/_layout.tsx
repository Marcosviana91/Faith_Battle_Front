import { Platform } from "react-native";
import { Provider } from "react-redux";
import { Slot } from "expo-router";

import { store } from '@/store';
import { ThemedView } from "@/components/themed/ThemedView";


export default function RootLayout() {
    return (
        <Provider store={store}>
            {Platform.OS === 'android' && <ThemedView style={{ height: 50 }} lightColor="#fffc" darkColor="#000c" />}
            <Slot />
        </Provider>
    );
}