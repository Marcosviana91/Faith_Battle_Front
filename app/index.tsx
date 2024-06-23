import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'react-native'

import HomeScreen from '@/pages/home/index';
import GamePage from '@/pages/game/index';
import ProfileScreen from '@/pages/player_profile';
import CardScreen from '@/pages/cards';


const Stack = createNativeStackNavigator();

export default function App() {
    StatusBar.setHidden(false)
    StatusBar.setTranslucent(false)
    StatusBar.setBarStyle("light-content")

    return (
        <NavigationContainer independent>
            <StatusBar backgroundColor='#000' barStyle='light-content' />
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home', headerShown: false }}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Jogar" component={GamePage} />
                <Stack.Screen name="Cartas" component={CardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
