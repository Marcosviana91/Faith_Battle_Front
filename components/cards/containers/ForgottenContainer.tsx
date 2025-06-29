import { ThemedModal } from "@/components/themed/ThemedModal";
import { useState } from "react";
import { Pressable, Image } from "react-native";
import DefaultContainer from "./DefaultContainer";
import { useCards } from "@/hooks/useCards";


export function ForgottenContainer(props: { card_list?: CardProps[] }) {
    const [showModal, setShowModal] = useState(false)

    return (<>
        {showModal && props.card_list ?
            <ThemedModal title="Mar do Esquecimento" closeModal={() => { setShowModal(false) }}>
                <DefaultContainer cards={props.card_list} card_size="small" show_modal={false} />
            </ThemedModal> :
            <Pressable style={{ flex: 1, backgroundColor: '#00000088' }} onPress={() => { setShowModal(true) }} >
                <Image
                    resizeMode="stretch"
                    style={[{ width: "100%", height: "100%", opacity:0.8 }]}
                    source={useCards({card_slug:''})}
                />
            </Pressable>
        }
    </>)
}