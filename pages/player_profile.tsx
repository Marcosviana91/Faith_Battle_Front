import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';
import { logout } from "@/store/reducers/authReducer";
import { leaveMatch } from "@/store/reducers/matchReducer";

import { Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import { globalStyles } from '@/constants/Styles';

import { useEditUserMutation } from '@/store/api'

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [sendUserData, { data: newUserData }] = useEditUserMutation();
    const [isEditting, setEditting] = useState(false);

    const playerData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [realName, setRealName] = useState(playerData?.real_name);
    const [email, setEmail] = useState(playerData?.email);
    const [email2, setEmail2] = useState(playerData?.email);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        if (newUserData?.data_type == "user_updated" && newUserData.user_data) {
            console.log(newUserData.user_data);
        }
        }, [newUserData])

    return (
        <ThemedView style={[globalStyles.container, { padding: 10 }]}>

            {playerData && (
                <>
                    <>
                        <ThemedText type='title'>Olá {playerData.username}!</ThemedText>
                        <ThemedText type='defaultSemiBold' style={{ position: 'absolute', bottom: 8 }}>Seu ID: {playerData.id}</ThemedText>
                        <ThemedText type='subtitle'>Nome: {playerData.real_name}</ThemedText>
                        <ThemedText type='subtitle'>Email: {playerData.email}</ThemedText>
                        {/* EDITAR */}
                        <TouchableOpacity
                            onPress={() => {
                                setEditting(true);

                            }}
                            style={{ backgroundColor: "cyan", width: 48, height: 48, justifyContent: "center", alignItems: "center", borderRadius: 16 }}
                        >
                            <MaterialIcons name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        {/* SAIR */}
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(logout())
                                dispatch(leaveMatch())
                                navigation.navigate('Home' as never)
                                // Navegar para Tela de login
                            }}
                            style={{ backgroundColor: "red", width: 48, height: 48, position: "absolute", right: 8, justifyContent: "center", alignItems: "center", borderRadius: 16 }}
                        >
                            <MaterialIcons name="logout" size={24} color="black" />
                        </TouchableOpacity>
                    </>
                    <Modal
                        visible={isEditting}
                        transparent
                        animationType='fade'
                    >
                        <View
                            style={{ flex: 1, backgroundColor: '#000000d1', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View
                                style={{ width: '90%', height: 300, backgroundColor: "white", borderRadius: 16, padding: 24 }}
                            >
                                <View style={{ rowGap: 10 }}>
                                    <View style={{ flexDirection: 'row', columnGap: 16 }}>
                                        <Text style={{ width: 120 }}>Nome Completo:</Text>
                                        <TextInput
                                            style={[globalStyles.textInput, { flex: 1 }]}
                                            value={realName}
                                            onChangeText={setRealName}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRealName(playerData?.real_name);
                                            }}
                                        >
                                            <MaterialIcons name="restart-alt" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 16 }}>
                                        <Text style={{ width: 120 }}>Email:</Text>
                                        <TextInput
                                            style={[globalStyles.textInput, { flex: 1 }]}
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setEmail(playerData?.email);
                                            }}
                                        >
                                            <MaterialIcons name="restart-alt" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 16 }}>
                                        <Text style={{ width: 120 }}>Confirma email:</Text>
                                        <TextInput
                                            style={[globalStyles.textInput, { flex: 1 }]}
                                            value={email2}
                                            onChangeText={setEmail2}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setEmail2(playerData?.email);
                                            }}
                                        >
                                            <MaterialIcons name="restart-alt" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 16 }}>
                                        <Text style={{ width: 120 }}>Senha:</Text>
                                        <TextInput
                                            style={[globalStyles.textInput, { flex: 1 }]}
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
                                            <MaterialIcons name="restart-alt" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 16 }}>
                                        <Text style={{ width: 120 }}>Confirma senha:</Text>
                                        <TextInput
                                            style={[globalStyles.textInput, { flex: 1 }]}
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
                                            <MaterialIcons name="restart-alt" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* SAVE AND CLOSE MODAL */}
                                <TouchableOpacity
                                    style={{ position: "absolute", right: 8, bottom: 8, width: 48, height: 48, borderRadius: 16, backgroundColor: "green", justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        const datatosend:UserProps = {
                                            id: playerData.id,
                                            username: playerData.username,
                                            password: password,
                                            real_name: realName,
                                            email: email,
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
                                    style={{ position: "absolute", left: 8, bottom: 8, width: 48, height: 48, borderRadius: 16, backgroundColor: "red", justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        setEditting(false);
                                        setRealName(playerData?.real_name);
                                        setEmail(playerData?.email);
                                        setEmail2(playerData?.email);
                                        setPassword("");
                                        setPassword2("");
                                    }}
                                >
                                    <MaterialIcons name="edit-off" size={24} color="black" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </ThemedView>
    )
};
