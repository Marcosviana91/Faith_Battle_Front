import { Modal, Pressable, View, type ModalProps } from "react-native";
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useScreenSizes } from "@/hooks/useScreenSizes";

type Props = ModalProps & {
    title?: string;
    hideCloseButton?: boolean
    closeModal?: () => void;
    backgroundTransparent?: boolean
}

export function ThemedModal(props : Props) {
    const {width} = useScreenSizes();
    return (
        <Modal transparent visible={props.visible}>
            <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: "center", maxWidth:width }} lightColor={props.backgroundTransparent ? '#ffffff83' : '#ffffffef' } darkColor={props.backgroundTransparent ? '#00000083' : '#000000ef' }>
                <ThemedView style={{ width: "90%", minHeight: "25%", maxHeight:'100%', borderWidth: 1, borderRadius: 8, padding: 8, justifyContent: "space-between", alignItems: "center", gap:8, marginBottom:'25%'  }}>
                    {/* Header */}
                    <View style={{ height: 30, width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginBottom: 12 }}>
                        <ThemedText type='subtitle'>{props.title}</ThemedText>
                        {/* Close Button */}
                        {!props.hideCloseButton && <Pressable
                            onPress={props.closeModal}
                        >
                            <ThemedText type='subtitle'>
                                <AntDesign name="closecircleo" size={24} />
                            </ThemedText>
                        </Pressable>}
                    </View>
                    {/* Modal Content */}
                    {props.children}
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}