import { Platform, View, } from "react-native";
import { Provider } from "react-redux";
import { Slot } from "expo-router";

import { store } from '@/store';
import { ThemedView } from "@/components/themed/ThemedView";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { ConnectionStatus } from '@/components/connectionSpot';
import { NotificationBox } from "@/components/notificationBox";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
    const { width: windowWidth, height: windowHeight } = useScreenSizes();
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Provider store={store}>
                {Platform.OS === 'android' && <ThemedView style={{ height: 50 }} lightColor="#fffc" darkColor="#000c" />}
                <View style={{ flex: 1, height: windowHeight, maxWidth: windowWidth , position:'relative'}}>
                    <ConnectionStatus />
                    <NotificationBox />
                    <Slot />
                </View>
            </Provider>
        </SafeAreaProvider>
    );
}