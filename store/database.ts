import AsyncStorage from '@react-native-async-storage/async-storage';

// key_name user_data, player_data

const storeData = async ( key_name: string, value: UserProps) => {
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
    }
};

export { storeData, getData}