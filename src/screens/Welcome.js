import {SafeAreaView} from "react-native-safe-area-context";
import {Box, HStack, Pressable, Text, useColorModeValue} from "native-base";
import {Feather} from "@expo/vector-icons";
import {WIDTH} from "../util";
import {config, useSpring, animated} from "@react-spring/native";
import {useEffect, useState} from "react";

const Welcome = ({navigation}) => {

	const [present, setPresent] = useState(false)

	const welcomeStyle = useSpring({

		justifyContent: "center",
		alignItems: "center",
		opacity: present? 1: 0,
		top: present? 0: 100,
		config: config.molasses
	})

	const btn1 = useSpring({
		opacity: present? 1: 0,
		top: present? 0: 50,
		delay:750,
		config: config.slow
	})

	const btn2 = useSpring({
		opacity: present? 1: 0,
		top: present? 0: 50,
		delay:900,
		config: config.slow
	})

	const btn3 = useSpring({
		opacity: present? 1: 0,
		top: present? 0: 50,
		delay:1050,
		config: config.slow
	})

	useEffect(()=> {
		setPresent(true)
	})

	return(

		<SafeAreaView>
			<Box h={"100%"} justifyContent={"center"} alignItems={"center"}>

				<animated.View style={welcomeStyle}>
					<Text mb={4} letterSpacing={3} fontWeight={"bold"} fontSize={21} color={useColorModeValue("light.primary", "dark.primary")}>
						歡迎來到DailySoup!
					</Text>

					<Text mb={64} letterSpacing={1} fontSize={17} color={useColorModeValue("light.midgray", "dark.white")}>
						開始紀錄你的心情吧！
					</Text>
				</animated.View>

				<animated.View style={btn1}>
					<Pressable
						onPress={()=> {
							navigation.navigate("Signin", {account: {email: "", password: ""}})
						}}
					>
						<HStack pointerEvents={"none"}
						        zIndex={100} h={12} w={WIDTH * .5} p={3} mt={5} bg={"transparent"} borderRadius={40}
						        borderWidth={1} justifyContent={"center"} alignItems={"center"}
						        borderColor={useColorModeValue("light.midgray", "dark.darkgray")}>


							<Text fontSize={17} fontWeight={"bold"} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>登入</Text>


						</HStack>
						<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={5} bottom={0} mb={-3} h={12} w={WIDTH * .5}
						        bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={40}
						        justifyContent={"space-between"} alignItems={"center"}>

						</HStack>
					</Pressable>
				</animated.View>

				<animated.View style={btn2}>
					<Pressable
						onPress={()=> {
							navigation.navigate("Signup")
						}}
					>
						<HStack pointerEvents={"none"}
						        zIndex={100} h={12} w={WIDTH * .5} p={3} mt={5} bg={"transparent"} borderRadius={40}
						        borderWidth={1} justifyContent={"center"} alignItems={"center"}
						        borderColor={useColorModeValue("light.midgray", "dark.darkgray")}>


							<Text fontSize={17} fontWeight={"bold"} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>註冊</Text>


						</HStack>
						<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={5} bottom={0} mb={-3} h={12} w={WIDTH * .5}
						        bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={40}
						        justifyContent={"space-between"} alignItems={"center"}>

						</HStack>
					</Pressable>
				</animated.View>

				<animated.View style={btn3}>
					<Pressable
						onPress={()=> {
							navigation.navigate("TabNavigator")
						}}
						mt={8} flexDirection={"row"} alignItems={"center"}>
						<Text textDecoration={"textDecorationLine"} color={useColorModeValue("light.midgray", "dark.white")} fontSize={16} fontWeight={"bold"}>
							直接使用
						</Text>
						<Feather name={"arrow-right"} size={18} color={useColorModeValue("#606060", "#eee")}/>
					</Pressable>
				</animated.View>

			</Box>
		</SafeAreaView>
	)
}

export default Welcome
