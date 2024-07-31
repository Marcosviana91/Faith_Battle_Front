import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from "react-native";

import HomeScreen from '@/pages/home/index';
import GamePage from '@/pages/game/index';
import ProfileScreen from '@/pages/player_profile';
import CardScreen from '@/pages/cards';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
            <Stack.Navigator screenOptions={{headerShown:(Platform.OS !== 'android')}}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home', headerShown: false }}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Jogar" component={GamePage} />
                <Stack.Screen name="Cartas" component={CardScreen} />
            </Stack.Navigator>
    );
}
