import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { Image, StyleSheet, View, TouchableOpacity, ImageBackground, Pressable, ScrollView, ToastAndroid, Platform } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { ThemedTextInput } from '@/components/themed/ThemedTextInput'
import BasicButton from '@/components/button/basic';

import { Ionicons } from '@expo/vector-icons';


import { globalStyles } from '@/constants/Styles';

import { useLoginMutation, useNewUserMutation, useGetUserDataMutation } from '@/store/api'
import { getData, storeData } from '@/store/database';

import { login } from "@/store/reducers/authReducer";
import { addNotify } from "@/store/reducers/notificationReducer"

import { useKeyboard } from "@/hooks/useKeyboard";
import { useAvatar, AVATAR } from '@/hooks/usePlayerData';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [backGroundImage, setBackGroundImage] = useState(0)
  const [userToken, setUserToken] = useState('')

  const [doLogin, { data: tokenAuthData, error: authError }] = useLoginMutation();
  const [getUser, { data: userData, error: userError }] = useGetUserDataMutation();
  const [createUser, { data: newUserData, error: newUserError }] = useNewUserMutation();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const [isCreating, setCreating] = useState(false)
  const [realName, setRealName] = useState('')
  // const [email, setEmail] = useState('')
  const [showAvatarList, setShowAvatarList] = useState(false);
  const [myAvatar, setMyAvatar] = useState(1);


  const backGroun_list = [
    require("@/assets/images/Backgrounds/01.png"),
    require("@/assets/images/Backgrounds/02.png")
  ]
  const keyboardIsShow = useKeyboard()

  useEffect(() => {
    getData('faith_battle_user').then(_data => {
      if (_data) {
        dispatch(login(_data))
      }
    })
  }, [])

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
      console.log(authError)
      if (Platform.OS === "android") {
        ToastAndroid.show('Não foi possivel conectar as servidor!', ToastAndroid.SHORT);
      }
      else {
        window.alert('Não foi possivel conectar as servidor!')
      }
    }
    if (tokenAuthData) {
      if (tokenAuthData.access_token) {
        setUserToken(tokenAuthData.access_token)
        getUser(tokenAuthData.id)
      } else if (tokenAuthData.status_code === 403) {
        if (tokenAuthData.detail === 'user deactivated') {
          if (Platform.OS === "android") {
            ToastAndroid.show('usuário desativado.', ToastAndroid.SHORT);
          }
          else {
            window.alert('usuário desativado.')
          }
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show('Usuário ou senha inválidos.', ToastAndroid.SHORT);
          }
          else {
            window.alert('Usuário ou senha inválidos.')
          }

        }
      } else if (tokenAuthData.status_code === 400) {
        if (Platform.OS === "android") {
          ToastAndroid.show('usuário não encontrado.', ToastAndroid.SHORT);
        }
        else {
          window.alert('usuário não encontrado.')
        }
      }
    }
  }, [authError, tokenAuthData])

  useEffect(() => {
    if (userData) {
      console.log(userData)
      let data = { ...userData, "token": userToken }
      storeData('faith_battle_user', data)
      dispatch(login(data))
    }
  }, [userData])

  useEffect(() => {
    if (newUserError) {
      dispatch(addNotify({
        message: 'Nome de usuário já está em uso'
      }))
    }
  }, [newUserError])

  return (
    <ImageBackground
      source={backGroun_list[backGroundImage]}
      style={{ flex: 1, }}
      imageStyle={{ width: "100%", height: "100%" }}
      resizeMode='stretch'
      blurRadius={3}
    >
      <ThemedView style={globalStyles.container} lightColor="#fff7" darkColor="#000c">
        {!(keyboardIsShow[0] && isCreating) && <View style={{ flexBasis: (keyboardIsShow[0] ? 200 : 300) }}>
          <Image
            source={require('@/assets/images/Faith_Batlle.png')}
            style={(keyboardIsShow[0] ? styles.gameLogo_kb_did_show : styles.gameLogo)}
          />
        </View>}
        <View style={{ flexBasis: 500, justifyContent: ((keyboardIsShow[0] && isCreating) ? "center" : "flex-start"), alignItems: "center" }}>
          <ThemedView lightColor='#b4b4b4d5' darkColor='#242424d3' style={{ padding: 16, borderRadius: 8, borderColor: "#000", borderWidth: 1 }}>
            {!showAvatarList &&
              <>
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
                <ThemedTextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePassword}
                  keyboardType={(hidePassword ? 'default' : "visible-password")}
                />
              </>
            }
            {isCreating && (
              <>
                {!showAvatarList &&
                  <>
                    <ThemedText>Nome Completo:</ThemedText>
                    <ThemedTextInput value={realName} onChangeText={setRealName} />
                  </>
                }
                {/* <ThemedText>E-mail:</ThemedText>
                                <ThemedTextInput value={email} onChangeText={setEmail} /> */}
                {!showAvatarList &&
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingEnd: 16, marginTop: 12 }}>
                    <ThemedText>Avatar:</ThemedText>
                    <Pressable
                      onPress={() => {
                        setShowAvatarList(true);
                      }}
                    >
                      <ThemedView>
                        <Image
                          style={{ height: 40, width: 40, borderWidth: 2 }}
                          source={useAvatar({ avatar_index: myAvatar! })}
                        />
                      </ThemedView>
                    </Pressable>
                  </View>
                }
                {showAvatarList &&
                  <View style={{ height: 200 }}>
                    <ScrollView>
                      <View style={{ gap: 2 }}>
                        {AVATAR.map((avt, _index) => {
                          if (_index === 0) {
                            return null
                          }
                          return (
                            <Pressable
                              onPress={() => {
                                setMyAvatar(_index);
                                setShowAvatarList(false)
                              }}
                              key={_index}
                            >

                              <ThemedView style={{ flexDirection: "row", width: 150, justifyContent: "space-between", alignItems: 'center', borderWidth: 1, borderRadius: 4, paddingHorizontal: 2, borderColor: _index === myAvatar ? "green" : '' }}>
                                <ThemedText style={{ fontSize: 16, paddingStart: 4 }}>{avt.name}</ThemedText>
                                <Image
                                  style={{ height: 30, width: 30, borderWidth: 2 }}
                                  source={useAvatar({ avatar_index: _index })}
                                />
                              </ThemedView>
                            </Pressable>
                          )
                        })}
                      </View>
                    </ScrollView>
                  </View>
                }
              </>
            )}
          </ThemedView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 300 }}>
            {isCreating ? (
              <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", minWidth: 200, columnGap: 10, height: 50 }}>
                <BasicButton
                  disabled={userName === '' || password === ''}
                  darkColor='#060'
                  lightColor='#1ad81a'
                  onPress={() => {
                    createUser({
                      // email: email,
                      first_name: realName,
                      password: password,
                      username: userName,
                      avatar: myAvatar,
                    })
                    setRealName('')
                    // setEmail('')
                    setCreating(false)
                  }}>Criar</BasicButton>
                <BasicButton
                  darkColor='#770000'
                  lightColor='#ff6161'
                  onPress={() => {
                    setRealName('')
                    // setEmail('')
                    setCreating(false)
                    setShowAvatarList(false)
                  }}
                >Cancelar</BasicButton>
              </View>
            ) : (
              <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", minWidth: 200, columnGap: 10, height: 50 }}>
                <BasicButton
                  disabled={userName === '' || password === ''}
                  onPress={() => {
                    doLogin({ username: userName, password: password })
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
  },
  gameLogo_kb_did_show: {
    height: 226 * 0.8,
    width: 312 * 0.8,
    margin: 'auto',
  }
});
