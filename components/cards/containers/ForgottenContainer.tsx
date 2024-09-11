import { ThemedModal } from "@/components/themed/ThemedModal";
import { useState } from "react";
import { Pressable } from "react-native";
import DefaultContainer from "./DefaultContainer";


export function ForgottenContainer(props:{card_list?: CardProps[]}) {
    const [showModal, setShowModal] = useState(false)

    return (<>
        {showModal && props.card_list ?
            <ThemedModal title="Mar do Esquecimento" closeModal={() => { setShowModal(false) }}>
                <DefaultContainer cards={props.card_list} card_size="small" show_modal={false} />
            </ThemedModal>:
            <Pressable style={{flex:1, backgroundColor:'#00000088'}} onPress={()=>{setShowModal(true)}} />
        }
    </>)
}