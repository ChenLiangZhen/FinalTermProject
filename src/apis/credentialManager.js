import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(value) {
	await SecureStore.setItemAsync("token", value);
}

export async function getToken(){
	let result = await SecureStore.getItemAsync("token");
	if (result) {
		return result
	} else {
		console.log("no token stored!")
	}
}
