import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootReducer } from '@/store';
import { login, logout } from "@/store/reducers/authReducer";
import { leaveMatch } from "@/store/reducers/matchReducer";
import { removeData } from '@/store/database';
import { useEditUserMutation } from '@/store/api'

import PlayerAvatar64 from '@/components/player_user/PlayerAvatar64';
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedTextInput } from '@/components/themed/ThemedTextInput'

import { useAvatar, AVATAR } from '@/hooks/usePlayerData';

import { globalStyles } from '@/constants/Styles';
import { ThemedModal } from '@/components/themed/ThemedModal';
import BasicButton from '@/components/button/basic';


export default function ProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [sendUserData, { data: newUserData }] = useEditUserMutation();
    const [isEditting, setEditting] = useState(false);
    const [showAvatarList, setShowAvatarList] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const playerData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const currentServerData = useSelector((state: RootReducer) => state.appReducer.server)
    const appData = useSelector((state: RootReducer) => state.appReducer.settings)

    const [realName, setRealName] = useState(playerData?.first_name);
    // const [email, setEmail] = useState(playerData?.email);
    // const [email2, setEmail2] = useState(playerData?.email);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [myAvatar, setMyAvatar] = useState(playerData?.avatar);



    useEffect(() => {
        if (newUserData?.data_type == "user_updated" && newUserData.user_data) {
            let data = { ...playerData, "avatar": newUserData.user_data.avatar, "first_name": newUserData.user_data.first_name }
            dispatch(login(data))
        }
    }, [newUserData])

    return (
        <ThemedView style={[globalStyles.container, { padding: 10 }]}>

            {playerData && (
                <>
                    <>
                        {/* Header */}
                        <ThemedView style={{ width: '100%', height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, marginBottom: 4 }}>
                            <ThemedText type='title'>Olá {playerData.username}!</ThemedText>
                            <View style={{ flexDirection: 'row', columnGap: 8 }}>
                                {/* EDITAR */}
                                <TouchableOpacity
                                    disabled
                                    onPress={() => {
                                        setEditting(true);

                                    }}
                                    style={{ backgroundColor: "gray", width: 90, justifyContent: "center", alignItems: "center", flexDirection: 'row', borderRadius: 8 }}
                                >
                                    <MaterialIcons name="edit" size={24} color="white" />
                                    <ThemedText style={{ color: 'white', fontWeight: 700 }}>Editar</ThemedText>
                                </TouchableOpacity>
                                {/* OPEN MODAL - SAIR */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowLogoutModal(true)
                                    }}
                                    style={{ width: 90, justifyContent: "center", alignItems: "center", borderRadius: 8, padding: 2, flexDirection: 'row', borderWidth: 1, borderColor: 'red' }}
                                >
                                    <MaterialIcons name="logout" size={24} color="red" />
                                    <ThemedText style={{ color: 'red', fontWeight: 700 }}>Sair</ThemedText>
                                </TouchableOpacity>
                            </View>

                        </ThemedView>
                        <View style={{ flexDirection: 'row', columnGap: 8, padding: 8 }}>
                            <PlayerAvatar64 file_name={playerData?.avatar!} size={150} style={{ borderWidth: 2, borderColor: 'white' }} />
                            <View style={{ flex: 1, gap: 8 }}>
                                <ThemedText type='subtitle' >Nome completo:</ThemedText>
                                <ThemedText type='defaultSemiBold' style={{ backgroundColor: 'white', paddingStart: 8, width: '100%' }}>{realName ? realName : 'Cadastre seu nome'}</ThemedText>
                                <ThemedText type='subtitle'>Email:</ThemedText>
                                <ThemedText type='defaultSemiBold' style={{ backgroundColor: 'white', paddingStart: 8, width: '100%' }}>{playerData.email ? playerData.email : 'Cadastre seu email'}</ThemedText>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
                            <ThemedText>Acesse o site do projeto para editar seu perfil.</ThemedText>
                            <ThemedText>http://marcosvianadev2.ddns.net:3111/</ThemedText>
                        </View>
                        <View style={{ position: 'absolute', bottom: 8, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '95%' }}>
                            <View>
                                <ThemedText type='defaultSemiBold'>Seu ID: {playerData.id}</ThemedText>
                                <ThemedText type='defaultSemiBold'>Email: {playerData.email}</ThemedText>
                            </View>
                            <ThemedText type='defaultSemiBold'>Versão: {appData.version}</ThemedText>
                        </View>
                        {/* <ThemedText type='subtitle'>Email: {playerData.email}</ThemedText> */}


                    </>
                    {/* <App /> */}
                    <Modal
                        visible={isEditting}
                        transparent
                        animationType='fade'
                    >
                        <ThemedView
                            lightColor='#ffffffd1'
                            darkColor='#000000d1'
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ThemedView
                                style={{ width: '90%', borderRadius: 16, padding: 24, borderWidth: 1 }}
                            >
                                {/* Form */}
                                <View style={{ rowGap: 10 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <ThemedText>Avatar</ThemedText>
                                        {!showAvatarList &&
                                            <Pressable
                                                onPress={() => {
                                                    setShowAvatarList(true)
                                                }}
                                            >
                                                <ThemedView>
                                                    {/* <Image
                                                        style={{ height: 40, width: 40, borderWidth: 2 }}
                                                        source={useAvatar({ avatar_index: myAvatar! })}
                                                    /> */}
                                                </ThemedView>

                                            </Pressable>
                                        }
                                        {showAvatarList &&
                                            <View style={{ height: 200 }}>
                                                <ScrollView>
                                                    <View style={{ gap: 2 }}>
                                                        {AVATAR.map((avt, _index) => {
                                                            return (
                                                                // TODO: editar perfil
                                                                <Pressable
                                                                    onPress={() => {
                                                                        setMyAvatar(_index);
                                                                        setShowAvatarList(false)
                                                                    }}
                                                                    key={_index}
                                                                >
                                                                    <ThemedView style={{ flexDirection: "row", width: 150, justifyContent: "space-between", alignItems: 'center', borderWidth: 1, borderRadius: 4, paddingHorizontal: 2, borderColor: _index === myAvatar ? "green" : '' }}>
                                                                        <ThemedText style={{ fontSize: 20, paddingStart: 4 }}>{avt.name}</ThemedText>
                                                                        <Image
                                                                            style={{ height: 40, width: 40, borderWidth: 2 }}
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
                                    </View>
                                    {!showAvatarList && <View style={{ flexDirection: 'row', columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                        <ThemedText style={{ minWidth: 80, maxWidth: 120 }}>Nome Completo:</ThemedText>
                                        <View style={{ flexDirection: "row" }}>
                                            <ThemedTextInput
                                                value={realName}
                                                onChangeText={setRealName}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setRealName(playerData?.first_name);
                                                }}
                                            >
                                                <ThemedText>
                                                    <MaterialIcons name="restart-alt" size={24} />
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>}
                                    {/* <View style={{ flexDirection: 'row', columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                        <ThemedText style={{ minWidth: 80, maxWidth: 120 }}>Email:</ThemedText>
                                        <View style={{ flexDirection: "row" }}>
                                            <ThemedTextInput
                                                value={email}
                                                onChangeText={setEmail}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setEmail(playerData?.email);
                                                }}
                                            >
                                                <ThemedText>
                                                    <MaterialIcons name="restart-alt" size={24} />
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
                                    {/* <View style={{ flexDirection: 'row', columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                        <ThemedText style={{ minWidth: 80, maxWidth: 120 }}>Confirma email:</ThemedText>
                                        <View style={{ flexDirection: "row" }}>
                                            <ThemedTextInput
                                                value={email2}
                                                onChangeText={setEmail2}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setEmail2(playerData?.email);
                                                }}
                                            >
                                                <ThemedText>
                                                    <MaterialIcons name="restart-alt" size={24} />
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
                                    {!showAvatarList && <View style={{ flexDirection: 'row', columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                        <ThemedText style={{ minWidth: 80, maxWidth: 120 }}>Senha:</ThemedText>
                                        <View style={{ flexDirection: "row" }}>
                                            <ThemedTextInput
                                                value={password}
                                                onChangeText={setPassword}
                                                placeholder='Deixe vazio para não alterar'
                                                placeholderTextColor={'#55f4ff'}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPassword('');
                                                }}
                                            >
                                                <ThemedText>
                                                    <MaterialIcons name="restart-alt" size={24} />
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>}
                                    {!showAvatarList && <View style={{ flexDirection: 'row', columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                                        <ThemedText style={{ minWidth: 80, maxWidth: 120 }}>Confirma senha:</ThemedText>
                                        <View style={{ flexDirection: "row" }}>
                                            <ThemedTextInput
                                                value={password2}
                                                onChangeText={setPassword2}
                                                placeholder='Deixe vazio para não alterar'
                                                placeholderTextColor={'#55f4ff'}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPassword2('');
                                                }}
                                            >
                                                <ThemedText>
                                                    <MaterialIcons name="restart-alt" size={24} />
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>}
                                </View>
                                {/* Modal buttons */}
                                <ThemedView style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, marginTop: 10, paddingTop: 16 }}>
                                    {/* SAVE AND CLOSE MODAL */}
                                    <TouchableOpacity
                                        style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: "green", justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            const datatosend: UserProps = {
                                                id: playerData.id,
                                                username: playerData.username,
                                                password: password,
                                                first_name: realName,
                                                avatar: myAvatar,
                                                // email: email,
                                                token: playerData.token,
                                            }
                                            if (password == "") {
                                                datatosend.password = "__not-change__";
                                            }
                                            sendUserData(datatosend)
                                            setEditting(false);
                                            // dispatch(logout())
                                            // navigation.navigate('Home' as never)
                                        }}
                                    >
                                        <MaterialIcons name="save" size={24} color="black" />
                                    </TouchableOpacity>
                                    {/* CANCEL AND CLOSE MODAL */}
                                    <TouchableOpacity
                                        style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: "#f00", justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            setEditting(false);
                                            setRealName(playerData?.first_name);
                                            // setEmail(playerData?.email);
                                            // setEmail2(playerData?.email);
                                            setPassword("");
                                            setPassword2("");
                                            setMyAvatar(playerData?.avatar);
                                            setShowAvatarList(false);
                                        }}
                                    >
                                        <MaterialIcons name="edit-off" size={24} color="black" />
                                    </TouchableOpacity>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </Modal>
                    {/* Modal Sair */}
                    {showLogoutModal &&
                        <ThemedModal
                            hideCloseButton
                            title='Deseja mesmo sair?'
                            backgroundTransparent
                        >
                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {/* Cancelar */}
                                <BasicButton
                                    onPress={() => {
                                        setShowLogoutModal(false)
                                    }}>
                                    <ThemedText style={{ fontWeight: 700, fontSize: 18 }}>Não</ThemedText>
                                </BasicButton>
                                {/* SAIR */}
                                <BasicButton
                                    onPress={() => {
                                        removeData('faith_battle_user')
                                        dispatch(logout())
                                        dispatch(leaveMatch())
                                        // Navegar para Tela de login
                                        navigation.navigate('Home' as never)
                                        setShowLogoutModal(false)
                                    }}
                                    lightColor='#ff9898'

                                >
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <MaterialIcons name="logout" size={24} color="red" />
                                        <ThemedText style={{ color: 'red', fontWeight: 700, fontSize: 18 }}>Sair</ThemedText>

                                    </View>
                                </BasicButton>

                            </View>
                        </ThemedModal>
                    }
                </>
            )}
        </ThemedView>
    )
};
