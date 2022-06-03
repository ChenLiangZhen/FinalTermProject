import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import {store} from "./src/globalstate/store";

const NativeStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<NavigationContainer>
					<StackNavigator/>
				</NavigationContainer>
			</NativeBaseProvider>
		</Provider>
	)
}

const StackNavigator = () => {
	return (
		<NativeStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<NativeStack.Screen component={MainScreen} name={"MainScreen"}/>
		</NativeStack.Navigator>
	)
}

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarIcon: ({color, size, focused}) => {
				},
				headerShown: false,
				tabBarIconStyle: {
					display: "none"
				}
			}}
		>
			<Tab.Screen component={MainScreen} name={"MainScreen"}/>
		</Tab.Navigator>
	)
}

