import AsyncStorage from '@react-native-async-storage/async-storage';

// key_name faith_battle_user

const storeData = async (key_name: string, value: UserProps) => {
    console.log(`Armazenando ${key_name}: ${value}`);
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key_name, jsonValue);
    } catch (e) {
        // saving error
    }
};

const getData = async (key_name: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key_name);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return null;
    }
};

const removeData = async (key_name: string) => {
    try {
        await AsyncStorage.removeItem(key_name)
    } catch (e) {
        // remove error
    }
}

export { storeData, getData, removeData }