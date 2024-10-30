import * as FileSystem from 'expo-file-system';

import { SITE } from "@/store/server_urls";

const avatarDir = FileSystem.documentDirectory + 'avatars/';
const avatarFileUri = (avatarFile: string) => avatarDir + `${avatarFile}`;
const avatarUrl = (avatarFile: string) => `http://${SITE}/static/general/img/Avatar/${avatarFile}`;


export const getAvatarFromServer = async (avatarList: string[]) => {
    var avatarReadyList = checkAvatarFileExists(avatarList)
        .then(resposta01 => {
            if (resposta01.avatars_to_download_list.length > 0) {
                console.log("Falta baixar", resposta01.avatars_to_download_list)
                getMultipleAvatars(resposta01.avatars_to_download_list)
                    .then(() => checkAvatarFileExists(avatarList)
                        .then((resposta02) => resposta02.avatar_ready_list)
                    )
            } else {
                return resposta01.avatar_ready_list
            }
        })

    return avatarReadyList
}

// Checks if avatar directory exists. If not, creates it
export async function ensureFileExists(avatarFile: string) {
    const fileInfo = await FileSystem.getInfoAsync(avatarDir+avatarFile);
    return fileInfo.exists
}

// Checks if avatar directory exists. If not, creates it
export async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(avatarDir);
    if (!dirInfo.exists) {
        console.log("Avatar directory doesn't exist, creating…");
        await FileSystem.makeDirectoryAsync(avatarDir, { intermediates: true });
    }
}

// Checks if avatar file in a list exists. If not return avatar list to download and a dict with their current path
export async function checkAvatarFileExists(avatar_array: string[]) {
    var avatar_ready_list: string[] = []
    var avatars_to_download_list: string[] = []
    await Promise.all(
        avatar_array.map(async file_name => {
            const fileInfo = await FileSystem.getInfoAsync(avatarDir + file_name);
            if (fileInfo.exists) {
                avatar_ready_list.push(file_name)
            } else {
                avatars_to_download_list.push(file_name);
            }
        })
    )
    return {
        'avatar_ready_list': avatar_ready_list,
        'avatars_to_download_list': avatars_to_download_list
    }
}

// Downloads all avatars specified as array of file names
export async function getMultipleAvatars(avatarFiles: string[]) {
    try {
        await ensureDirExists();

        console.log('Downloading', avatarFiles.length, 'avatar files…');
        await Promise.all(avatarFiles.map(file_name => FileSystem.downloadAsync(avatarUrl(file_name), avatarFileUri(file_name))));
    } catch (e) {
        console.error("Couldn't download gif files:", e);
    }
}

// Returns URI to our local avatar file
// If our avatar doesn't exist locally, it downloads it
export async function getSingleAvatar(avatarFile: string) {
    await ensureDirExists();

    const fileUri = avatarFileUri(avatarFile);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
        console.log(`Avatar ${avatarFile} isn't cached locally. Downloading…`);
        await FileSystem.downloadAsync(avatarUrl(avatarFile), fileUri);
    }
    return fileUri;
}

// Returns Base64 string to use as image source.
export async function getAvatarBase64(avatarFile: string) {
    await getSingleAvatar(avatarFile)

    const base64 = await FileSystem.readAsStringAsync(avatarFileUri(avatarFile), { encoding: 'base64' })
    return 'data:image/png;base64,' + base64
}

type avatar_dict = {
    //  'file_name.extension': file//path/to/file_name.extension;
    [key: string]: string;
}
// Returns Base64 string to use as image source.
export async function getAvatarBase64Dict(avatarFiles: string[]) {
    let avatarBase64Dict: avatar_dict = {}
    await Promise.all(avatarFiles.map(async file_name => {
        var base64 = await FileSystem.readAsStringAsync(avatarFileUri(file_name), { encoding: 'base64' })
        avatarBase64Dict[file_name] = 'data:image/png;base64,' + base64
        // return 'data:image/png;base64,' + base64
    }));
    // console.log("avatarBase64List", avatarBase64List)
    return avatarBase64Dict;
}

// // Exports shareable URI - it can be shared outside your app
// export async function getGifContentUri(avatarFile: string) {
//     return FileSystem.getContentUriAsync(await getSingleGif(avatarFile));
// }

// // Deletes whole giphy directory with all its content
// export async function deleteAllGifs() {
//     console.log('Deleting all GIF files…');
//     await FileSystem.deleteAsync(avatarDir);
// }
