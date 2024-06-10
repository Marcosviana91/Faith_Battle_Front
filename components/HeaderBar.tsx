import { Image, StyleSheet, Text, View } from 'react-native';

export default function HeaderBar() {

    return (
        <View style={styles.container}>
            <Image source={require("@/assets/images/Faith_Batlle.png")} style={styles.gameLogo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: "100%",
        borderEndEndRadius: 24,
        borderEndStartRadius: 24
    },
    gameLogo: {
        margin: 'auto',
        transform: [{scale: 1}],
    }
});
