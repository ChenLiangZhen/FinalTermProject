import {SafeAreaView} from "react-native-safe-area-context";
import {
	Box, Button, Center,
	HStack,
	KeyboardAvoidingView, Pressable,
	ScrollView, Switch,
	Text,
	useColorMode,
	useColorModeValue, useToast,
	VStack
} from "native-base";
import {WIDTH} from "../util";
import {Feather} from "@expo/vector-icons";
import {useColorScheme} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAccount} from "../globalstate/accountSlice";
import {setDarkTheme} from "../globalstate/accountSlice";
import {Restart} from "fiction-expo-restart";

const Settings = ({navigation}) => {

	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const toast = useToast()
	const toastAlertRef = useRef()
	const toastAlertID = "alert"

	const {
		colorMode,
		toggleColorMode
	} = useColorMode();

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
				      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>重啟程式以套用主題</Text>

				<HStack>
					<Button
						onPress={async () => {

							closeAlertToast()

							if (colorMode === "dark") dispatch(setDarkTheme(false)), toggleColorMode()
							if (colorMode === "light") dispatch(setDarkTheme(true)), toggleColorMode()

							await new Promise(resolve => setTimeout(resolve, 500));


							Restart()
						}}
						_pressed={{bg: useColorModeValue("light.darkgray", "dark.darkgray")}}
						borderWidth={1} color={useColorModeValue("light.primary", "dark.primary")}
						bg={useColorModeValue("light.midgray", "transparent")}
						borderColor={useColorModeValue("light.primary", "dark.flat_bg")} borderRadius={8} mr={2}>

						<Text fontSize={16} fontWeight={"bold"}
						      color={useColorModeValue("light.primary", "dark.flat_bg")}>確認</Text>
					</Button>

					<Button
						onPress={() => {
							closeAlertToast()
						}}
						_pressed={{bg: useColorModeValue("light.darkgray", "dark.darkgray")}}
						bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={8}>
						<Text fontSize={16} fontWeight={"bold"}
						      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>取消</Text>

					</Button>
				</HStack>
			</HStack>
		)
	}

	return (

		<SafeAreaView flex={1}>

			<Box alignItems={"center"} pt={2} flex={1}>

				<Pressable onPress={() => {
					account.info.nickname ? null : navigation.navigate("Signin", {account: {email: "", password: ""}})
				}}>

					<HStack zIndex={100} borderWidth={1} borderColor={useColorModeValue("light.darkgray", "dark.white")}
					        mt={2} mb={6} p={4} pr={6} alignItems={"center"} justifyContent={"space-between"}
					        borderRadius={16} bg={"transparent"} w={WIDTH * .9} h={24}>

						<Center ml={1} h={13} w={13} borderWidth={2} borderRadius={32}
						        borderColor={useColorModeValue("light.flat_bg", "dark.darkgray")}>
							{account.info.nickname ?

								<Text fontSize={28} fontWeight={"bold"}
								      color={useColorModeValue("light.flat_bg", "dark.darkgray")}>{(account.info.nickname).charAt(0)}</Text>

								: <Feather name={"user"} size={42} color={useColorModeValue("white", "black")}/>

							}

						</Center>
						<VStack alignItems={"flex-end"}>

							<Text color={useColorModeValue("light.flat_bg", "dark.flat_bg")} fontWeight={"bold"} fontSize={20}>
								{account.info.nickname != "" ? account.info.nickname : "尚未登入"}
							</Text>

							<Text color={useColorModeValue("light.flat_bg", "dark.flat_bg")} fontWeight={"bold"} fontSize={15}>
								{account.info.nickname != "" ? account.data.notes.length + " 篇日記" : ""}
							</Text>

						</VStack>
					</HStack>

					<HStack position={"absolute"} left={1} top={1} mt={2} mb={6} p={4} pr={6} alignItems={"center"}
					        justifyContent={"space-between"} borderRadius={16}
					        bg={useColorModeValue("light.primary", "dark.primary")} w={WIDTH * .9} h={24}>
					</HStack>

				</Pressable>


				<ScrollView flex={1} showsVerticalScrollIndicator={false}>

					<VStack borderWidth={1} borderColor={useColorModeValue("light.primary", "transparent")} borderRadius={16}
					        alignItems={"center"} mb={colorMode !== "dark" ? 8 : 4}
					        bg={useColorModeValue("light.section_bg", "dark.darkgray")}>
						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} borderBottomRadius={0} px={6}
						        alignItems={"center"} justifyContent={"space-between"} borderRadius={16}
						        bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>月曆設定</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>
						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} px={6} alignItems={"center"}
						        justifyContent={"space-between"} bg={useColorModeValue("light.section_bg", "dark.darkgray")}
						        w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>我的珍藏</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack mb={0} borderTopRadius={0} px={6} alignItems={"center"} justifyContent={"space-between"}
						        borderRadius={16} bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9}
						        h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>活動紀錄</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						{colorMode !== "dark" ? <HStack borderRadius={16} zIndex={-100} position={"absolute"} w={WIDTH * .9}
						                                bg={useColorModeValue("light.primary", "dark.primary")} bottom={-12}
						                                h={32}/> : <></>}
					</VStack>

					<VStack borderWidth={1} borderColor={useColorModeValue("light.primary", "transparent")} borderRadius={16}
					        alignItems={"center"} mb={colorMode !== "dark" ? 8 : 4}
					        bg={useColorModeValue("light.section_bg", "dark.darkgray")}>

						<Pressable flexDirection={"row"}
							onPress={()=> {

								navigation.navigate("AccountManagement")
								console.log("osvsdpg")
							}}
							borderColor={useColorModeValue("light.primary", "dark.primary")} borderBottomRadius={0} px={6}
						        alignItems={"center"} justifyContent={"space-between"} borderRadius={16}
						        bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>帳號管理</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>
						</Pressable>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} px={6} alignItems={"center"}
						        justifyContent={"space-between"} bg={useColorModeValue("light.section_bg", "dark.darkgray")}
						        w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>隱私設定</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack mb={0} borderTopRadius={0} px={6} alignItems={"center"} justifyContent={"space-between"}
						        borderRadius={16} bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9}
						        h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>通知提醒</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						{colorMode !== "dark" ? <HStack borderRadius={16} zIndex={-100} position={"absolute"} w={WIDTH * .9}
						                                bg={useColorModeValue("light.primary", "dark.primary")} bottom={-12}
						                                h={32}/> : <></>}
					</VStack>

					<VStack borderWidth={1} borderColor={useColorModeValue("light.primary", "transparent")} borderRadius={16}
					        alignItems={"center"} mb={colorMode !== "dark" ? 8 : 4}
					        bg={useColorModeValue("light.section_bg", "dark.darkgray")}>
						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} borderBottomRadius={0} px={6}
						        alignItems={"center"} justifyContent={"space-between"} borderRadius={16}
						        bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>語言偏好</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>
						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} px={6} alignItems={"center"}
						        justifyContent={"space-between"} bg={useColorModeValue("light.section_bg", "dark.darkgray")}
						        w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>暗色模式</Text>


							<Switch onToggle={() => {

								addToast()

							}}
							        isChecked={account.misc.darkTheme}
							        offTrackColor={useColorModeValue("light.gray", "light.gray")}
							        onTrackColor={useColorModeValue("light.gray", "light.gray")}
							        offThumbColor={useColorModeValue("light.primary", "dark.primary")}
							        onThumbColor={useColorModeValue("light.flat_bg", "dark.white")}/>


						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack mb={0} borderTopRadius={0} px={6} alignItems={"center"} justifyContent={"space-between"}
						        borderRadius={16} bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9}
						        h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>使用輔助</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						{colorMode !== "dark" ? <HStack borderRadius={16} zIndex={-100} position={"absolute"} w={WIDTH * .9}
						                                bg={useColorModeValue("light.primary", "dark.primary")} bottom={-12}
						                                h={32}/> : <></>}
					</VStack>

					<VStack borderWidth={1} borderColor={useColorModeValue("light.primary", "transparent")} borderRadius={16}
					        alignItems={"center"} mb={colorMode !== "dark" ? 8 : 4}
					        bg={useColorModeValue("light.section_bg", "dark.darkgray")}>
						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} borderBottomRadius={0} px={6}
						        alignItems={"center"} justifyContent={"space-between"} borderRadius={16}
						        bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>回報問題</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>
						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack borderColor={useColorModeValue("light.primary", "dark.primary")} px={6} alignItems={"center"}
						        justifyContent={"space-between"} bg={useColorModeValue("light.section_bg", "dark.darkgray")}
						        w={WIDTH * .9} h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>鼓勵建議</Text>
							<Feather name={"arrow-right"} size={20} color={useColorModeValue("#606060", "#ddd")}/>

						</HStack>

						<HStack borderBottomWidth={1} w={"90%"} borderColor={"#ffae35"}></HStack>

						<HStack mb={0} borderTopRadius={0} px={6} alignItems={"center"} justifyContent={"space-between"}
						        borderRadius={16} bg={useColorModeValue("light.section_bg", "dark.darkgray")} w={WIDTH * .9}
						        h={13}>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>版本</Text>
							<Text fontSize={16} color={useColorModeValue("light.darkgray", "#eee")}>1.0.0a</Text>

						</HStack>

						{colorMode !== "dark" ? <HStack borderRadius={16} zIndex={-100} position={"absolute"} w={WIDTH * .9}
						                                bg={useColorModeValue("light.primary", "dark.primary")} bottom={-12}
						                                h={32}/> : <></>}
					</VStack>


				</ScrollView>

			</Box>
		</SafeAreaView>
	)
}
export default Settings
