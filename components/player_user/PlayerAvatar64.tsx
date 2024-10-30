import { getAvatarBase64 } from "@/utils/FileSystem/Avatar"
import { useEffect, useState } from "react"
import { ThemedText } from "../themed/ThemedText"
import { View, Image, type ImageProps, Platform } from "react-native"

type Props = { file_name: string, size?: number, style?: ImageProps['style'] }


export default function PlayerAvatar64(props: Props) {
    // Loads a Avatar file from data storage
    const [base64_avatar_string, setBase64_avatar_string] = useState('')
    let size = 100
    if (props.size) {
        size = props.size
    }

    useEffect(() => {
        if (Platform.OS === 'android') {
            getAvatarBase64(props.file_name).then(file => setBase64_avatar_string(file))
        }
    }, [])

    return (
        <View>
            {base64_avatar_string ?
                <Image
                    style={[{ height: size, width: size }, props.style]}
                    source={{
                        uri: base64_avatar_string,
                    }}
                /> :
                <View style={[{ height: size, width: size }, props.style]}>
                    <ThemedText style={[{ textAlign: "center", fontSize: size * 0.15, lineHeight: size * 0.2 }]}>Não foi possível carregar a imagem</ThemedText>
                </View>

            }
        </View>
    )
}