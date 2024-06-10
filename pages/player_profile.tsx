import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from '@/constants/Styles';

export default function ProfileScreen() {
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)

    return (
        <ThemedView style={[globalStyles.container, { padding:10 }]}>
            
            {playerData && (
                <>
                    <ThemedText type='title'>Olá {playerData.username}!</ThemedText>
                    <ThemedText type='subtitle'>Nome: {playerData.real_name}</ThemedText>
                    <ThemedText type='subtitle'>Email: {playerData.email}</ThemedText>
                </>

            )}
        </ThemedView>
    )
};
