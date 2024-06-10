import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import { HelloWave } from '@/components/HelloWave';

import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";

import { globalStyles } from '@/constants/Styles';


export default function HomeScreen(props: UserProps & RouterScreenProps) {

    return (

            <ThemedView style={globalStyles.container}>
                <View style={[globalStyles.headerContainer, { flexBasis: 150 }]}>
                    <HeaderBar />
                </View>
                <View></View>
                <View style={globalStyles.contentContainer} >
                    <HelloWave />
                    <ThemedText >Bem-Vindo! {props.username}</ThemedText>
                    <ThemedText >Novo jogo</ThemedText>
                </View>
                <View style={[globalStyles.footerContainer, { flexBasis: 100 }]}>
                    <FooterBar {...props} />
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

