import {Dimensions, LogBox} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Provider, useSelector} from "react-redux";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import {store} from "./src/globalstate/store";
import MonthlyDiary from "./src/screens/MonthlyDiary";
import DiaryView from "./src/screens/DiaryView";
import DiaryWrite from "./src/screens/DiaryWrite";
import {extendTheme, HStack, Pressable, StatusBar, Text, useColorMode, useColorModeValue, useTheme} from "native-base";
import MoodSoup from "./src/screens/MoodSoup";
import Settings from "./src/screens/Settings"
import {Feather} from "@expo/vector-icons";
import {Restart} from 'fiction-expo-restart';
import SoupWrite from "./src/screens/SoupWrite";
import DiaryOverview from "./src/screens/DiaryOverview";
import Splash from "./src/screens/Splash";
import Welcome from "./src/screens/Welcome";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import {useEffect, useState} from "react";
import {selectAccount} from "./src/globalstate/accountSlice";
import MoodSoupView from "./src/screens/MoodSoupView";
import AccountManagement from "./src/screens/AccountManagement";
import MoodReport from "./src/screens/MoodReport";

LogBox.ignoreLogs(['ViewPropTypes']);
LogBox.ignoreLogs(['Failed prop type']);

const WIDTH = Dimensions.get("window").width

const NativeStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const NativebaseTheme = extendTheme({

	colors: {
		// Add new color
		light: {
			primary: '#ffae35',
			secondary: '#ffca74',
			section_bg: "#FDF8EF",
			flat_bg: '#ffffff',
			gray: '#b0b0b0',
			midgray: '#808080',
			darkgray: '#606060',
		},
		// Redefinig only one shade, rest of the color will remain same.
		dark: {
			primary: '#FFAE35',
			secondary: '#FEE3B9',
			section_bg: "#FDF8EF",
			flat_bg: '#111111',
			gray: '#b0b0b0',
			white: '#eee',
			darkgray: '#272727',
		},
	},
	sizes: {
		px: 1,
		1: 4,
		2: 8,
		3: 12,
		4: 16,
		5: 20,
		6: 24,
		7: 28,
		8: 32,
		9: 36,
		10: 40,
		11: 44,
		12: 48,
		13: 52,
		14: 56,
		15: 60,
		16: 64,
		17: 68,
		18: 72,
		19: 76,
		20: 80,
		21: 84,
		22: 88,
		23: 92,
		24: 96,
		25: 100,
		26: 104,
		28: 112,
		30: 120,
		32: 128,
		34: 136,
		36: 144,
		38: 152,
		40: 160,
		44: 176,
		48: 192,
		56: 224,
		64: 256,
		72: 288,
		80: 320,
		96: 384,
		120: 480,
		144: 576
	}
});

const NavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#fff"
	},
};

const NavigationDarkTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#111"
	},
};

export default function App() {

	let {
		colorMode,
		toggleColorMode
	} = useColorMode();

	return (
		<Provider store={store}>
			<NativeBaseProvider theme={NativebaseTheme}>
					<StackNavigator/>
			</NativeBaseProvider>
		</Provider>
	)
}

const StackNavigator = () => {

	const account = useSelector(selectAccount)

	let {
		colorMode,
		toggleColorMode
	} = useColorMode();

	useEffect(()=> {
		if(colorMode === "light" && account.misc.darkTheme === true){
			toggleColorMode()
		}

		if(colorMode === "dark" && account.misc.darkTheme === false){
			toggleColorMode()
		}
	},[])

	return (
		<NavigationContainer theme={account.misc.darkTheme === true? NavigationDarkTheme: NavigationTheme}>
			<StatusBar barStyle={colorMode === "dark"? "light-content" : "dark-content"} backgroundColor={colorMode === "dark"? "#111": "white"}/>

			<NativeStack.Navigator
				initialRouteName={"Splash"}
				screenOptions={{
					headerShown: false,
				}}
			>
				<NativeStack.Screen component={TabNavigator} name={"TabNavigator"}/>
				<Tab.Screen component={MonthlyDiary} name={"MonthlyDiary"}/>
				<Tab.Screen component={DiaryWrite} name={"DiaryWrite"}/>
				<Tab.Screen component={DiaryView} name={"DiaryView"}/>
				<Tab.Screen component={SoupWrite} name={"SoupWrite"}/>
				<Tab.Screen component={DiaryOverview} name={"DiaryOverview"}/>
				<Tab.Screen component={Splash} name={"Splash"}/>
				<Tab.Screen component={Welcome} name={"Welcome"}/>
				<Tab.Screen component={Signin} name={"Signin"}/>
				<Tab.Screen component={Signup} name={"Signup"}/>
				<Tab.Screen component={MoodSoupView} name={"MoodSoupView"}/>
				<Tab.Screen component={AccountManagement} name={"AccountManagement"}/>
			</NativeStack.Navigator>
		</NavigationContainer>

	)
}

const CustomTab = ({state, navigation, descriptor}) => {

	const colorPrimary = useColorModeValue("light.primary", "dark.primary")
	const colorGray = useColorModeValue("light.gray", "dark.gray")
	const colorBg = useColorModeValue("light.flat_bg", "dark.flat_bg")
	const colorFlat = useColorModeValue("light.flat_bg", "dark.flat_bg")

	const {
		toggleColorMode
	} = useColorMode();

	const {
		colors
	} = useTheme()

	return (

		<>

			<HStack zIndex={100} h={22} w={WIDTH * .9} px={4} ml={WIDTH * .05} mb={12} bg={colorBg} borderRadius={100}
			        borderWidth={1} justifyContent={"space-between"} alignItems={"center"} borderColor={colorPrimary}>

				<Pressable bg={state.index === 0 ? useColorModeValue("#fdf8ef" , "transparent") : useColorModeValue("light.flat_bg", "transparent")} px={2} py={1} borderRadius={100} onPress={() => {
					navigation.navigate("MainScreen")
				}} justifyContent={"center"} alignItems={"center"}>
					<Feather name={"calendar"} size={state.index === 0 ? 28 : 24}
					         color={state.index === 0 ? colors.light.primary : colors.light.gray}/>
					<Text mt={1} fontWeight={state.index === 0 ? "bold" : "normal"}
					      color={state.index === 0 ? colorPrimary : colorGray}>
						心情日記
					</Text>
				</Pressable>

				<Pressable bg={state.index === 1 ? useColorModeValue("#fdf8ef" , "transparent") : useColorModeValue("light.flat_bg", "transparent")} px={2} py={1} borderRadius={100} onPress={() => {

					navigation.navigate("MoodSoup")
				}} justifyContent={"center"} alignItems={"center"}>
					<Feather name={"coffee"} size={state.index === 1 ? 28 : 24}
					         color={state.index === 1 ? colors.light.primary : colors.light.gray}/>
					<Text mt={1} fontWeight={state.index === 1 ? "bold" : "normal"}
					      color={state.index === 1 ? colorPrimary : colorGray}>
						心靈雞湯
					</Text>
				</Pressable>

				<Pressable bg={state.index === 2 ? useColorModeValue("#fdf8ef" , "transparent") : useColorModeValue("light.flat_bg", "transparent")} px={2} py={1} borderRadius={100} onPress={() => {

					navigation.navigate("MoodReport")
				}} justifyContent={"center"} alignItems={"center"}>
					<Feather name={"trello"} size={state.index === 2 ? 28 : 24}
					         color={state.index === 2 ? colors.light.primary : colors.light.gray}/>
					<Text mt={1} fontWeight={state.index === 2 ? "bold" : "normal"}
					      color={state.index === 2 ? colorPrimary : colorGray}>
						心情報告
					</Text>
				</Pressable>

				<Pressable bg={state.index === 3 ? useColorModeValue("#fdf8ef" , "transparent") : useColorModeValue("light.flat_bg", "transparent")} px={2} py={1} borderRadius={100} onPress={() => {

					navigation.navigate("Settings")
				}} justifyContent={"center"} alignItems={"center"}>
					<Feather name={"user"} size={state.index === 3 ? 28 : 24}
					         color={state.index === 3 ? colors.light.primary : colors.light.gray}/>
					<Text mt={1} fontWeight={state.index === 3 ? "bold" : "normal"}
					      color={state.index === 3 ? colorPrimary : colorGray}>
						我的帳號
					</Text>
				</Pressable>

			</HStack>
			<HStack zIndex={0} position={"absolute"} bottom={0} mb={9} h={24} w={WIDTH * .9} ml={WIDTH * .05}
			        bg={useColorModeValue("light.secondary", "dark.primary" )} borderRadius={48} borderColor={"#FFAE35"} borderWidth={1}
			        justifyContent={"space-between"} alignItems={"center"}></HStack>

		</>
	)
}

const TabNavigator = () => {

	const {
		colorMode,
		toggleColorMode
	} = useColorMode();

	return (
		<Tab.Navigator

			tabBar={({state, navigation, descriptors}) => <CustomTab state={state} navigation={navigation}
			                                                         descriptors={descriptors}/>}

			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen component={MainScreen} name={"MainScreen"}/>
			<Tab.Screen component={MoodSoup} name={"MoodSoup"}/>
			<Tab.Screen component={MoodReport} name={"MoodReport"}/>
			<Tab.Screen component={Settings} name={"Settings"}/>
		</Tab.Navigator>
	)
}

