import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';

import BasicButton from "./button/basic";

export default function FooterBar() {
    const navigation = useNavigation()
    const appData = useSelector((state: RootReducer) => state.appReducer)
    const need_update = (appData.server.version !== appData.settings.version)
    
    return (
        <View style={styles.container}>
            <BasicButton onPress={() =>
                navigation.navigate('Cartas' as never)
            }>Cartas</BasicButton>
            <BasicButton disabled={need_update} onPress={() =>
                navigation.navigate('Jogar' as never)
            }>{need_update ? 'Atualize seu apk' : 'Jogar'}</BasicButton>
            <BasicButton onPress={() =>
                navigation.navigate('Profile' as never)
            }>Perfil</BasicButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: '100%',
        width: '100%',
    },
});
