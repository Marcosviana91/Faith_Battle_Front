import { Modal, Pressable, View, type ModalProps } from "react-native";
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = ModalProps & {
    title: string;
    closeModal: () => void;
}

export function ThemedModal(props : Props) {
    return (
        <Modal transparent visible={props.visible}>
            <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: "center" }} lightColor='#ffffffef' darkColor='#000000ef'>
                <ThemedView style={{ width: "90%", minHeight: "25%", borderWidth: 1, borderRadius: 8, padding: 8, justifyContent: "space-between", alignItems: "center" }}>
                    {/* Header */}
                    <View style={{ height: 30, width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginBottom: 12 }}>
                        <ThemedText type='subtitle'>{props.title}</ThemedText>
                        {/* Close Button */}
                        <Pressable
                            onPress={props.closeModal}
                        >
                            <ThemedText type='subtitle'>
                                <AntDesign name="closecircleo" size={24} />
                            </ThemedText>
                        </Pressable>
                    </View>
                    {/* Modal Content */}
                    {props.children}
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}