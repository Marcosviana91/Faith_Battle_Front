import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicButton from "./button/basic";

export default function FooterBar() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <BasicButton onPress={() =>
                    navigation.navigate('Cartas')
                }>Cartas</BasicButton>
            <BasicButton onPress={() =>
                    navigation.navigate('Jogar')
                }>Jogar</BasicButton>
            <BasicButton onPress={() =>
                    navigation.navigate('Profile')
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
