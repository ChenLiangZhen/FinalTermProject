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
	useToast,
	VStack
} from "native-base";
import {Feather} from "@expo/vector-icons";
import {HEIGHT, WIDTH} from "../util";
import {config, useSpring, animated} from "@react-spring/native";
import {useCallback, useEffect, useRef, useState} from "react";
import {signApi} from "../apis/api";
import {useFocusEffect} from "@react-navigation/native";
import {Keyboard, Platform} from "react-native";

const Signup = ({navigation}) => {

	const [present, setPresent] = useState(false)
	const [successPresent, setSuccessPresent] = useState(false)

	const [async, setAsync] = useState(false)

	const [showPassword, setShowPassword] = useState(false)

	const [nicknameInput, setNicknameInput] = useState("")
	const [emailInput, setEmailInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")

	const [warningText, setWarningText] = useState("")
	const [firstInput, setFirstInput] = useState(true)

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

		if (nicknameInput === "") {
			setWarningText("請填寫暱稱")

		} else {
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput))
				setWarningText("電子信箱格式錯誤")
			else {

				if (passwordInput.length < 6 && passwordInput != "")
					setWarningText("密碼長度過短")
				else {
					setWarningText("")
				}
			}
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

	useFocusEffect(
		useCallback(() => {

			setSuccessPresent(false)
			setAsync(false)

			setPresent(true)

		}, [])
	);


	return (
		<SafeAreaView flex={1}>

			<Pressable flex={1} onPress={()=> Keyboard.dismiss()}>


			<KeyboardAvoidingView
				keyboardVerticalOffset={500}
				flex={1}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>

				{async ?
					<>

						<animated.View style={btn4}>
							<Spinner size={"lg"} color={"white"}/>
						</animated.View>

						<animated.View style={btn5}>
							<Text opacity={1} color={"#fff"} fontSize={24} fontWeight={"bold"}>註冊成功 !</Text>
						</animated.View>


					</> : <></>
				}


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
								註冊DailySoup
							</Text>

						</HStack>
					</animated.View>

					<animated.View style={btn1}>

						<HStack w={WIDTH * .75} alignItems={"center"} borderBottomWidth={1}
						        borderColor={useColorModeValue("light.gray", "dark.gray")}>
							<Feather name={"user"} color={"#FFAE35"} size={24}/>

							<Input
								value={nicknameInput}

								onChangeText={(text) => {
									setNicknameInput(text)
									setFirstInput(false)

								}}
								borderWidth={0}
								placeholder={"你的名字"}
								autoCapitalize={"none"}
								_focus={{bg: "transparent"}}
								fontSize={16} color={useColorModeValue("light.midgray", "dark.white")}
								zIndex={100} h={12} w={WIDTH * .5} p={3} bg={"transparent"} borderRadius={40}
								justifyContent={"center"} alignItems={"center"}>

							</Input>
						</HStack>

					</animated.View>

					<animated.View style={btn1}>

						<HStack w={WIDTH * .75} alignItems={"center"} borderBottomWidth={1}
						        borderColor={useColorModeValue("light.gray", "dark.gray")}>
							<Feather name={"mail"} color={"#FFAE35"} size={24}/>

							<Input
								value={emailInput}
								onChangeText={(text) => {
									setEmailInput(text)
									setFirstInput(false)
								}}
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
								onChangeText={(text) => {
									setPasswordInput(text)
									setFirstInput(false)

								}}
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
							onPress={async () => {

								if (nicknameInput === "") {

									addToast("忘記填寫名字囉！")
									await new Promise(resolve => setTimeout(resolve, 1000));
									closeConfirmToast()
									return
								}
								if (emailInput === "") {

									addToast("忘記填寫電子信箱囉！")
									await new Promise(resolve => setTimeout(resolve, 1000));
									closeConfirmToast()
									return
								}
								if (passwordInput === "") {

									addToast("忘記填寫密碼囉！")
									await new Promise(resolve => setTimeout(resolve, 1000));
									closeConfirmToast()
									return
								}

								setAsync(true)

								signApi.post("/api/signup", {
									"nickname": nicknameInput,
									"email": emailInput,
									"password": passwordInput
								})
									.then(async res => {

										setSuccessPresent(true)

										await new Promise(resolve => setTimeout(resolve, 1000));
										navigation.navigate("Signin", {
											account: {
												email: emailInput,
												password: passwordInput
											}
										})
										console.log(res)

									}, async rej => {

										setAsync(false)

										if (rej.message === "Request failed with status code 422") {
											addToast("此信箱已被註冊")
											await new Promise(resolve => setTimeout(resolve, 1000));
											closeConfirmToast()

										} else {
											addToast("發生未知錯誤")
											await new Promise(resolve => setTimeout(resolve, 1000));
											closeConfirmToast()
										}

										console.log(rej)
									})
							}}
						>
							<HStack pointerEvents={"none"}
							        zIndex={100} h={12} w={WIDTH * .5} p={3} mt={2} bg={"transparent"} borderRadius={40}
							        borderWidth={1} justifyContent={"center"} alignItems={"center"}
							        borderColor={useColorModeValue("light.midgray", "dark.darkgray")}>


								<Text fontSize={17} fontWeight={"bold"}
								      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>註冊</Text>


							</HStack>
							<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={2} bottom={0} mb={-3} h={12}
							        w={WIDTH * .5}
							        bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={40}
							        justifyContent={"space-between"} alignItems={"center"}>

							</HStack>
						</Pressable>
					</animated.View>

					<animated.View style={btn3}>
						<Pressable
							onPress={() => {
								navigation.navigate("Signin")
							}}
							mt={6} flexDirection={"row"} alignItems={"center"}>
							<Text textDecoration={"textDecorationLine"}
							      color={useColorModeValue("light.midgray", "dark.white")}
							      fontSize={16} fontWeight={"bold"}>
								已有帳號？
							</Text>
							<Pressable

								onPress={() => {
									navigation.navigate("Signin", {account: {email: "", password: ""}})
								}}>

								<Text textDecoration={"textDecorationLine"}
								      color={useColorModeValue("light.primary", "dark.primary")}
								      fontSize={16} fontWeight={"bold"}>
									登入
								</Text>
							</Pressable>
							<Feather name={"arrow-right"} size={18} color={"#FFAE35"}/>
						</Pressable>
					</animated.View>

				</Box>

				{async ?
					<Box justifyContent={"center"} alignItems={"center"} zIndex={100} opacity={.75} position={"absolute"}
					     bg={"black"} w={WIDTH} h={HEIGHT}>

					</Box> : <></>
				}

			</KeyboardAvoidingView>

			</Pressable>
		</SafeAreaView>
	)
}

export default Signup
