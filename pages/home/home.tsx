import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Animated, StyleSheet, View, PanResponder } from 'react-native';

import { useGetServerDataQuery } from '@/store/api'
import { setServerSettings } from '@/store/reducers/appReducer';

import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'

import { HelloWave } from '@/components/HelloWave';
import { SlideUp } from '@/components/cards/motions/moveCard';

import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";

import { globalStyles } from '@/constants/Styles';


export default function HomeScreen() {
    const dispatch = useDispatch();
    const serverData = useGetServerDataQuery()
    const [onUp, setOnUp] = useState(false)


    useEffect(() => {
        if (serverData.data) {
            dispatch(setServerSettings(serverData.data))
        }
    }, [serverData])

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
            onPanResponderMove: (e, state) => {
                // console.log({...state})
                pan.x.setValue(state.dx)
                pan.y.setValue(state.dy)
            },
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        }),
    ).current;

    useEffect(() => {
        onUp? console.log('Está em cima') : console.log("Está em baixo");
    }, [onUp])

    return (

        <ThemedView style={globalStyles.container}>
            <View style={[globalStyles.headerContainer, { flexBasis: 150 }]}>
                <Animated.View
                    style={{
                        transform: [{ translateX: pan.x }, { translateY: pan.y }], zIndex: 999
                    }}
                    {...panResponder.panHandlers}
                >
                    <HeaderBar />
                </Animated.View>
            </View>
            <View style={globalStyles.contentContainer} >
                <HelloWave />
                <ThemedText >Bem-Vindo!</ThemedText>
                <ThemedText style={{maxWidth:'60%', textAlign:'center'}} >Aqui aparecerão suas estatisticas e anúncios sobre eventos do jogo.</ThemedText>
                {/* <View style={{position:'absolute', bottom:0, flexDirection:'row', gap:8, width:'100%', alignItems:'flex-start', backgroundColor:'green'}}>
                    <SlideUp
                        up_action={setOnUp}
                    >
                        <View style={{width:75, height:100}} />
                    </SlideUp>
                </View> */}
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

