import { useRef } from 'react';
import { Animated, StyleSheet, View, PanResponder } from 'react-native';

import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'

import { HelloWave } from '@/components/HelloWave';

import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";

import { globalStyles } from '@/constants/Styles';


export default function HomeScreen() {

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
            onPanResponderMove: (e, state) => {
                // console.log({...state})
                pan.x.setValue( state.dx)
                pan.y.setValue( state.dy)
            },
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        }),
    ).current;

    return (

        <ThemedView style={globalStyles.container}>
            <View style={[globalStyles.headerContainer, { flexBasis: 150 }]}>
                <Animated.View
                    style={{
                        transform: [{ translateX: pan.x }, { translateY: pan.y }], zIndex:999
                    }}
                    {...panResponder.panHandlers}
                >
                    <HeaderBar />
                </Animated.View>
            </View>
            <View style={globalStyles.contentContainer} >
                <HelloWave />
                <ThemedText >Bem-Vindo!</ThemedText>
                <ThemedText >Novo jogo</ThemedText>
            </View>
            <View style={[globalStyles.footerContainer, { flexBasis: 100 }]}>
                <FooterBar />
            </View>
        </ThemedView>
    );

}


const styles = StyleSheet.create({
    gameLogo: {
        height: 226,
        width: 312,
        margin: 'auto',
    },
    textInput: {
        backgroundColor: '#A1CEDC',
        width: 300,
        height: 32,
        borderRadius: 8,
        paddingHorizontal: 8,

    }
});

