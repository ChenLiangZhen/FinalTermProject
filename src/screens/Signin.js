import {SafeAreaView} from "react-native-safe-area-context";
import {
	Box,
	Button,
	HStack,
	Input,
	KeyboardAvoidingView,
	Pressable,
	Spinner,
	Text,
	useColorModeValue,
	useToast
} from "native-base";
import {Feather} from "@expo/vector-icons";
import {HEIGHT, WIDTH} from "../util";
import {config, useSpring, animated} from "@react-spring/native";
import {useEffect, useRef, useState} from "react";
import {signApi} from "../apis/api";
import {saveToken} from "../apis/credentialManager";
import {setAccountInfo, setData} from "../globalstate/accountSlice";
import {useDispatch} from "react-redux";
import {Keyboard, Platform} from "react-native";

const Signin = ({route, navigation}) => {

	const {account} = route.params

	const [async, setAsync] = useState(false)

	const [present, setPresent] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const [successPresent, setSuccessPresent] = useState(false)

	const dispatch = useDispatch()

	const [emailInput, setEmailInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")

	const [warningText, setWarningText] = useState("")

	const toast = useToast()
	const toastConfirmRef = useRef()
	const toastConfirmID = "confirm"

	function closeConfirmToast() {
		if (toastConfirmRef.current) {
			toast.close(toastConfirmRef.current);
		}
	}

	function addToast(msg) {
		if (!toast.isActive("confirm"))
			toastConfirmRef.current = toast.show({
				id: toastConfirmID,
				render: () => {
					return (
						<ToastConfirm msg={msg}/>
					)
				}
			})
	}

	const ToastConfirm = ({msg}) => {
		return (
			<HStack alignItems={"center"} justifyContent={"space-between"}
			        bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6}
			        py="1" mb={5}>
				<Text fontWeight={"bold"} fontSize={16}
				      color={useColorModeValue("light.flat_bg", "dark.darkgray")}>{msg}</Text>
			</HStack>
		)
	}

	useEffect(() => {

		async function autoLogin() {
			if (account != null) {

				setEmailInput(account.email)
				setPasswordInput(account.password)
				await new Promise(resolve => setTimeout(resolve, 1500));

				setAsync(true)

				signApi.post("/api/signin", {
					"email": account.email,
					"password": account.password
				})
					.then(res => {

						console.log(res.data.user)

						dispatch(setAccountInfo({
							nickname: res.data.user.nickname,
							email: res.data.user.email,
							password: "",
							userLink: res.data.user._id
						}))

						dispatch(setData(res.data.userData.data))

						navigation.navigate("TabNavigator")

						saveToken(res.data.token)
							.then(res => {

								console.log("Token successfully saved to SecureStore.")
							}, rej => {

								console.log("Token save failed.")
							})
					}, async rej => {

						console.log(rej)

						setAsync(false)
						addToast("帳號或密碼錯誤")
						await new Promise(resolve => setTimeout(resolve, 1000));
						closeConfirmToast()
						// console.log(rej)
					})

			}
		}

		if (account.email != "") {

			autoLogin()
		}

	}, [])

	useEffect(() => {


		if (emailInput != "" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput))
			setWarningText("電子信箱格式錯誤")
		else {


			setWarningText("")

		}

	})

	const welcomeStyle = useSpring({

		justifyContent: "center",
		alignItems: "center",
		opacity: present ? 1 : 0,
		top: present ? 0 : 100,
		config: config.molasses
	})

	const btn1 = useSpring({
		opacity: present ? 1 : 0,
		top: present ? 0 : 50,
		delay: 750,
		config: config.slow
	})

	const btn2 = useSpring({

		marginTop: 32,
		opacity: present ? 1 : 0,
		top: present ? 0 : 50,
		delay: 900,
		config: config.slow
	})

	const btn3 = useSpring({
		opacity: present ? 1 : 0,
		top: present ? 0 : 50,
		delay: 1050,
		config: config.slow
	})

	const btn4 = useSpring({

		zIndex: 1000,

		left: WIDTH * .5 - 16,

		position: "absolute",
		top: successPresent ? 400 : 350,
		delay: 0,
		opacity: successPresent ? 0 : 1,
		config: config.slow
	})

	const btn5 = useSpring({

		left: WIDTH * .5 - 52,

		zIndex: 1000,
		color: "white",
		position: "absolute",
		top: successPresent ? 350 : 300,

		opacity: successPresent ? 1 : 0,
		delay: 250,
		config: config.slow
	})

	useEffect(() => {
		setPresent(true)
	})

	return (

		<SafeAreaView flex={1}>

			{async ?
				<>
					<animated.View style={btn4}>
						<Spinner size={"lg"} color={"white"}/>
					</animated.View>
				</> : <></>
			}


			{async ?
				<Box justifyContent={"center"} alignItems={"center"} zIndex={100} opacity={.75} position={"absolute"}
				     bg={"black"} w={WIDTH} h={HEIGHT}>

				</Box> : <></>
			}

			<Pressable flex={1} onPress={() => Keyboard.dismiss()}>

				<KeyboardAvoidingView
					keyboardVerticalOffset={500}
					flex={1}
					// bahavior={"padding"}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>

					<Box flex={1} justifyContent={"flex-start"} alignItems={"center"}>

						<HStack h={16} w={WIDTH * .9} mb={16}>

							<Button p={2} onPress={() => {
								navigation.goBack()
							}}
							        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
								<Feather name={"arrow-left"} size={24} color={useColorModeValue("light.primary", "#eee")}/>
							</Button>

						</HStack>

						<animated.View style={welcomeStyle}>
							<HStack h={240} w={WIDTH * .75}>

								<Text mb={48} letterSpacing={3} fontWeight={"bold"} fontSize={21}
								      color={useColorModeValue("light.primary", "dark.primary")}>
									登入DailySoup
								</Text>

							</HStack>
						</animated.View>

						<animated.View style={btn1}>

							<HStack w={WIDTH * .75} alignItems={"center"} borderBottomWidth={1}
							        borderColor={useColorModeValue("light.gray", "dark.gray")}>
								<Feather name={"mail"} color={"#FFAE35"} size={24}/>

								<Input
									value={emailInput}
									onChangeText={(text) => setEmailInput(text)}
									borderWidth={0}
									autoCapitalize={"none"}
									placeholder={"電子信箱"}
									_focus={{bg: "transparent"}}
									fontSize={16} color={useColorModeValue("light.midgray", "dark.white")}
									zIndex={100} h={12} w={WIDTH * .6} p={3} bg={"transparent"} borderRadius={40}
									justifyContent={"center"} alignItems={"center"}>

								</Input>
							</HStack>

						</animated.View>

						<animated.View style={btn1}>

							<HStack w={WIDTH * .75} alignItems={"center"} borderBottomWidth={1}
							        borderColor={useColorModeValue("light.gray", "dark.gray")}>
								<Feather name={"key"} color={"#FFAE35"} size={24}/>

								<Input
									value={passwordInput}
									onChangeText={(text) => setPasswordInput(text)}
									secureTextEntry={!showPassword}
									borderWidth={0}
									type={"password"}
									autoCapitalize={"none"}
									placeholder={"密碼"}
									_focus={{bg: "transparent"}}
									fontSize={16} color={useColorModeValue("light.midgray", "dark.white")}
									zIndex={100} h={12} w={WIDTH * .6} p={3} bg={"transparent"} borderRadius={40}
									justifyContent={"center"} alignItems={"center"}>

								</Input>

								<Pressable
									onPress={() => {
										setShowPassword(prev => !prev)
									}}
								>
									{showPassword ? <Feather name={"eye"} color={"#FFAE35"} size={22}/>
										: <Feather name={"eye-off"} color={"#FFAE35"} size={22}/>
									}
								</Pressable>


							</HStack>

							<Text mt={4} fontSize={14} color={useColorModeValue("light.midgray", "dark.primary")}
							      alignSelf={"flex-end"}>{warningText}</Text>

						</animated.View>


						<animated.View style={btn2}>
							<Pressable
								onPress={() => {

									setAsync(true)

									signApi.post("/api/signin", {
										"email": emailInput,
										"password": passwordInput
									})
										.then(res => {

											console.log(res.data.user)

											dispatch(setAccountInfo({
												nickname: res.data.user.nickname,
												email: res.data.user.email,
												password: "",
												userLink: res.data.user._id
											}))

											dispatch(setData(res.data.userData.data))


											navigation.navigate("TabNavigator")

											saveToken(res.data.token)
												.then(res => {

													console.log("Token successfully saved to SecureStore.")
												}, rej => {

													console.log("Token save failed.")
												})
										}, async rej => {

											console.log(rej)

											setAsync(false)
											addToast("帳號或密碼錯誤")
											await new Promise(resolve => setTimeout(resolve, 1000));
											closeConfirmToast()
											// console.log(rej)
										})
								}}
							>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={12} w={WIDTH * .5} p={3} mt={5} bg={"transparent"} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.midgray", "dark.darkgray")}>


									<Text fontSize={17} fontWeight={"bold"}
									      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>登入</Text>


								</HStack>
								<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={5} bottom={0} mb={-3} h={12}
								        w={WIDTH * .5}
								        bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>
						</animated.View>

						<animated.View style={btn3}>
							<Pressable
								onPress={() => {
									navigation.navigate("Signup")
								}}
								mt={8} flexDirection={"row"} alignItems={"center"}>
								<Text textDecoration={"textDecorationLine"}
								      color={useColorModeValue("light.midgray", "dark.white")}
								      fontSize={16} fontWeight={"bold"}>
									沒有帳號？
								</Text>
								<Pressable

									onPress={() => {
										navigation.navigate("Signup")
									}}>

									<Text textDecoration={"textDecorationLine"}
									      color={useColorModeValue("light.primary", "dark.primary")}
									      fontSize={16} fontWeight={"bold"}>
										註冊
									</Text>
								</Pressable>
								<Feather name={"arrow-right"} size={18} color={"#FFAE35"}/>
							</Pressable>
						</animated.View>

					</Box>

				</KeyboardAvoidingView>

			</Pressable>


		</SafeAreaView>
	)
}

export default Signin
