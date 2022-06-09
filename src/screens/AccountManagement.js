import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, HStack, Pressable, Text, useColorModeValue, useToast} from "native-base";
import {WIDTH} from "../util";
import {Feather} from "@expo/vector-icons";
import {useFocusEffect} from "@react-navigation/native";
import {apiRequest} from "../apis/apiManager";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {setAccountInfo, setDarkTheme, setData} from "../globalstate/accountSlice";
import {saveToken} from "../apis/credentialManager";
import {Restart} from "fiction-expo-restart";

const AccountManagement = ({navigation}) => {

	const toast = useToast()
	const toastAlertRef = useRef()
	const toastAlertID = "alert"

	const dispatch = useDispatch()


	function closeAlertToast() {
		if (toastAlertRef.current) {
			toast.close(toastAlertRef.current);
		}
	}

	function addToast(type) {

		if (!toast.isActive("alert")) {
			toastAlertRef.current = toast.show({
				id: toastAlertID,
				render: () => {
					return (
						<ToastAlert/>
					)
				}
			});
		}

	}

	const ToastAlert = () => {
		return (
			<HStack alignItems={"center"} justifyContent={"space-between"}
			        bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6}
			        py="1" mb={5}>
				<Text fontWeight={"bold"} fontSize={16}
				      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>確定登出帳號嗎？</Text>

				<HStack>
					<Button
						onPress={async () => {

							closeAlertToast()

							dispatch(setAccountInfo({
								nickname: "",
								email: "",
								password: "",
								userLink: ""
							}))
							dispatch(setData({
								markedNotes: {},
								bookmarkedNotes: [],
								sharedNotes: [],
								notes: []
							}))
							dispatch(setDarkTheme(false))

							saveToken("")

							await new Promise(resolve => setTimeout(resolve, 1000));

							Restart()

						}}
						_pressed={{bg: useColorModeValue("light.darkgray", "dark.darkgray")}}
						borderWidth={1} color={useColorModeValue("light.primary", "dark.primary")}
						bg={useColorModeValue("light.midgray", "transparent")}
						borderColor={useColorModeValue("light.primary", "dark.flat_bg")} borderRadius={8} mr={2}>

						<Text fontSize={14} fontWeight={"bold"}
						      color={useColorModeValue("light.primary", "dark.flat_bg")}>登出</Text>
					</Button>

					<Button
						onPress={() => {
							closeAlertToast()
						}}
						_pressed={{bg: useColorModeValue("light.darkgray", "dark.darkgray")}}
						bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={8}>
						<Text fontSize={14} fontWeight={"bold"}
						      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>取消</Text>

					</Button>
				</HStack>
			</HStack>
		)
	}

	return (
		<SafeAreaView>

			<Box w={"100%"} juatifyContent={"flex-start"} alignItems={"center"}>

				<HStack h={16} w={WIDTH * .9} alignItems={"center"}>

					<Button p={2} onPress={() => {
						navigation.goBack()
					}}
					        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
						<Feather name={"arrow-left"} size={24} color={useColorModeValue("light.primary", "#eee")}/>
					</Button>

				</HStack>

				<Pressable
					onPress={async () => {

						addToast()
						await new Promise(resolve => setTimeout(resolve, 2000));
						closeAlertToast()

					}}

					borderWidth={1} borderColor={"#Ffae35"}
					flexDirection={"row"} mt={4} borderRadius={0} px={6} alignItems={"center"}
					justifyContent={"space-between"}
					borderRadius={16} bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9}
					h={13}>
					<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>登出帳號</Text>
					{/*<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>*/}

				</Pressable>

			</Box>

		</SafeAreaView>
	)
}

export default AccountManagement
