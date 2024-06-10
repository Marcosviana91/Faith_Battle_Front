import { Provider } from "react-redux";
import { Slot } from "expo-router";

import { store } from '@/store';


export default function RootLayout() {
    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    );
}