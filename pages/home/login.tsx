import { Image, StyleSheet, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import BasicButton from '@/components/button/basic';

import Ionicons from '@expo/vector-icons/Ionicons';


import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { globalStyles } from '@/constants/Styles';

import { useLoginMutation, useNewUserMutation, useGetUserDataMutation } from '@/store/api'
import { login } from "@/store/reducers/authReducer";
import { getData, storeData } from '@/store/database';

export default function LoginScreen() {
    const dispatch = useDispatch();
    const [backGroundImage, setBackGroundImage] = useState(0)
    const [userId, setUserId] = useState(0)
    const [userToken, setUserToken] = useState('')

    const [doLogin, { data: tokenAuthData, error: authError }] = useLoginMutation();
    const [getUser, { data: userData, error: userError }] = useGetUserDataMutation();
    const [createUser, { data: newUserData }] = useNewUserMutation();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    const [isCreating, setCreating] = useState(false)
    const [realName, setRealName] = useState('')
    const [email, setEmail] = useState('')

    const backGroun_list = [
        require("@/assets/images/Backgrounds/01.png"),
        require("@/assets/images/Backgrounds/02.png")
    ]

    useEffect(() => {
        setTimeout(() => {
            if (backGroundImage < backGroun_list.length - 1) {
                setBackGroundImage(backGroundImage + 1)
            } else {
                setBackGroundImage(0)
            }
        }, 10000)
    }, [backGroundImage])


    useEffect(() => {
        if (authError) {
            // console.log(authError.data.detail)
            Alert.alert('Não logou', 'Usuário ou senha inválidos.', [
                { text: 'OK' },
            ])
            window.alert('Usuário ou senha inválidos.')
        }
        if (tokenAuthData) {
            if (tokenAuthData.token_type === "Bearer") {
                setUserToken(tokenAuthData.access_token)
                setUserId(tokenAuthData.sub)
            }
        }
    }, [authError, tokenAuthData])

    useEffect(() => {
        if (userId) {
            getUser(userId)
        }

    }, [userId])

    useEffect(() => {
        if (userData) {
            let data = { ...userData.user_data!, "token": userToken }
            dispatch(login(data))
        }
    }, [userData])

    return (
        <ImageBackground
            source={backGroun_list[backGroundImage]}
            style={{ flex: 1, }}
            imageStyle={{ width: "100%", height: "100%" }}
            resizeMode='stretch'
            blurRadius={3}
        >
            <ThemedView style={globalStyles.container} lightColor="#fff7" darkColor="#000c">
                <ThemedView style={{ height: 50 }} lightColor="#fffc" darkColor="#000c" />
                <View style={{ flexBasis: 300 }}>
                    <Image
                        source={require('@/assets/images/Faith_Batlle.png')}
                        style={styles.gameLogo}
                    />
                </View>
                <View style={{ flexBasis: 500, justifyContent: "flex-start", alignItems: "center" }}>
                    <ThemedText>Usuário:</ThemedText>
                    <ThemedTextInput value={userName.trim()} onChangeText={setUserName} />
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText>Senha: </ThemedText>
                        <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }} >
                            <ThemedText>
                                <Ionicons
                                    name={hidePassword ? 'eye-off' : 'eye'}
                                    size={20}
                                />
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                    <ThemedTextInput secureTextEntry={hidePassword} value={password} onChangeText={setPassword} />
                    {isCreating && (
                        <>
                            <ThemedText>Nome Completo:</ThemedText>
                            <ThemedTextInput value={realName} onChangeText={setRealName} />
                            <ThemedText>E-mail:</ThemedText>
                            <ThemedTextInput value={email} onChangeText={setEmail} />
                        </>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 300 }}>
                        {isCreating ? (
                            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", minWidth: 200, columnGap: 10 }}>
                                <BasicButton
                                    darkColor='#060'
                                    lightColor='#1ad81a'
                                onPress={() => {
                                    createUser({
                                        email: email,
                                        real_name: realName,
                                        password: password,
                                        username: userName,
                                    })
                                    setRealName('')
                                    setEmail('')
                                    setCreating(false)
                                }}>Criar</BasicButton>
                                <BasicButton
                                darkColor='#770000'
                                lightColor='#ff6161'
                                    onPress={() => {
                                        setRealName('')
                                        setEmail('')
                                        setCreating(false)
                                    }}
                                >Cancelar</BasicButton>
                            </View>
                        ) : (
                            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", minWidth: 200, columnGap: 10 }}>
                                <BasicButton onPress={() => {
                                    if (userName === '') {
                                        window.alert("Insira um nome")
                                    }
                                    else if (password === '') {
                                        window.alert('Digite uma senha')
                                    }
                                    else {
                                        doLogin({ username: userName, password: password })
                                    }
                                }} >Logar</BasicButton>
                                <BasicButton
                                    darkColor='#060'
                                    lightColor='#1ad81a'
                                    onPress={() => {
                                        setCreating(true)
                                    }}
                                >Criar Conta</BasicButton>
                            </View>
                        )}
                    </View>
                </View>
                <ThemedText type='defaultSemiBold' lightColor="#000" style={{ position: "absolute", bottom: 8, left: 8 }}>Não oficial</ThemedText>
            </ThemedView>
        </ImageBackground>

    );

}


const styles = StyleSheet.create({
    gameLogo: {
        height: 226,
        width: 312,
        margin: 'auto',
    }
});
