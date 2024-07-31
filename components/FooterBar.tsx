import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicButton from "./button/basic";

export default function FooterBar() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <BasicButton onPress={() =>
                    navigation.navigate('Cartas' as never)
                }>Cartas</BasicButton>
            <BasicButton onPress={() =>
                    navigation.navigate('Jogar' as never)
                }>Jogar</BasicButton>
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
