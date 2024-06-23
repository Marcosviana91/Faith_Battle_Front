import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';
import { logout } from "@/store/reducers/authReducer";
import { leaveMatch } from "@/store/reducers/matchReducer";

import { Text, View, TouchableOpacity, Pressable } from 'react-native';

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from '@/constants/Styles';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    
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
                            dispatch(leaveMatch())
                            navigation.navigate('Home' as never)
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
