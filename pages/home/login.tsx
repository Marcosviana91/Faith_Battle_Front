import { Image, StyleSheet, TextInput, Button, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import Ionicons from '@expo/vector-icons/Ionicons';


import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { HelloWave } from '@/components/HelloWave';
import { globalStyles } from '@/constants/Styles';

import { useLoginMutation, useNewUserMutation } from '@/store/api'
import { login } from "@/store/reducers/authReducer";
import { getData, storeData } from '@/store/database';

function parseJwt (token: string): TokenProps {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default function LoginScreen() {
    const dispatch = useDispatch();

    const [doLogin, { data: tokenAuthData, error : authError }] = useLoginMutation();
    const [createUser, { data: newUserData }] = useNewUserMutation();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    const [isCreating, setCreating] = useState(false)
    const [realName, setRealName] = useState('')
    const [email, setEmail] = useState('')

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
                const token = tokenAuthData.access_token
                // console.log(token)
                const userData = parseJwt(tokenAuthData.access_token).inf
                userData.token = token
                // console.log(userData)
                dispatch(login(userData))
                
            }

        }
    }, [authError, tokenAuthData])

    return (
        <ThemedView style={globalStyles.container}>
            <View style={[globalStyles.headerContainer, { flexBasis: 250 }]}>
                <Image
                    source={require('@/assets/images/Faith_Batlle.png')}
                    style={styles.gameLogo}
                />
            </View>
            <View style={[globalStyles.contentContainer, { flexBasis: 300 }]}>
                <Text>Usuário:</Text>
                <TextInput style={globalStyles.textInput} value={userName.trim()} onChangeText={setUserName} />
                <View style={{ flexDirection: 'row' }}>
                    <Text>Senha: </Text>
                    <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }} >
                        <Ionicons
                            name={hidePassword ? 'eye-off' : 'eye'}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput secureTextEntry={hidePassword} style={globalStyles.textInput} value={password} onChangeText={setPassword} />
                {isCreating && (
                    <>
                        <Text>Nome Completo:</Text>
                        <TextInput style={globalStyles.textInput} value={realName} onChangeText={setRealName} />
                        <Text>E-mail:</Text>
                        <TextInput style={globalStyles.textInput} value={email} onChangeText={setEmail} />
                    </>
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 300 }}>
                    {isCreating ? (
                        <>
                            <Button color={'green'} title='Salvar' onPress={() => {
                                console.log("Criando...");
                                createUser({
                                    email: email,
                                    real_name: realName,
                                    password: password,
                                    username: userName,
                                })

                                setRealName('')
                                setEmail('')
                                setCreating(false)
                            }} />
                            <Button color={'red'} title='Cancelar' onPress={() => {
                                setRealName('')
                                setEmail('')
                                setCreating(false)
                            }} />
                        </>
                    ) : (
                        <>
                            <Button title='Logar' onPress={() => {
                                if (userName === '') {
                                    window.alert("Insira um nome")
                                }
                                else if (password === '') {
                                    window.alert('Digite uma senha')
                                }
                                else {
                                    doLogin({ username: userName, password: password })
                                }
                            }} />
                            <Button title='Criar Conta' onPress={() => {
                                setCreating(true)
                            }} />
                        </>
                    )}
                </View>
            </View>
            <View style={globalStyles.footerContainer}>
                <TouchableOpacity>
                    <Ionicons name='logo-youtube' size={40} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='logo-twitter' size={40} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='logo-whatsapp' size={40} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='earth' size={40} />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

}


const styles = StyleSheet.create({
    gameLogo: {
        height: 226,
        width: 312,
        margin: 'auto',
    }
});
