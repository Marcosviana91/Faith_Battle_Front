import { Platform, View } from "react-native";
import { Provider } from "react-redux";
import { Slot } from "expo-router";

import { store } from '@/store';
import { ThemedView } from "@/components/themed/ThemedView";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { ConnectionStatus } from '@/components/connectionSpot';
import { NotificationBox } from "@/components/notificationBox";


export default function RootLayout() {
    const { width: windowWidth, height: windowHeight } = useScreenSizes();
    return (
        <Provider store={store}>
            {Platform.OS === 'android' && <ThemedView style={{ height: 50 }} lightColor="#fffc" darkColor="#000c" />}
            <View style={{ height: windowHeight, maxWidth: windowWidth }}>
                <ConnectionStatus />
                <NotificationBox />
                <Slot />
                {Platform.OS === 'android' && <ThemedView style={{ height: 50 }} lightColor="#fffc" darkColor="#000c" />}
            </View>
        </Provider>
    );
}