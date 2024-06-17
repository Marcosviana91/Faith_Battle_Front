import { useSelector, useDispatch } from 'react-redux'

import { RootReducer } from '@/store';
import { logout } from "@/store/reducers/authReducer";

import { Text, View, TouchableOpacity, Pressable } from 'react-native';

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from '@/constants/Styles';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)

    return (
        <ThemedView style={[globalStyles.container, { padding:10 }]}>
            
            {playerData && (
                <>
                    <ThemedText type='title'>Olá {playerData.username}!</ThemedText>
                    <ThemedText type='subtitle'>Nome: {playerData.real_name}</ThemedText>
                    <ThemedText type='subtitle'>Email: {playerData.email}</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(logout())
                            // Navegar para Tela de login
                        }}
                        style={{backgroundColor: "red", width: 200, height:30}}
                    >
                        <Text>SAIR</Text>
                    </TouchableOpacity>
                </>

            )}
        </ThemedView>
    )
};
