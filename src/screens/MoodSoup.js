import {Box, Button, HStack, Pressable, Text, TextArea, useColorModeValue, VStack} from "native-base";
import {face, tongo, WIDTH} from "../util";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "react-native";
import {apiRequest} from "../apis/apiManager";
import {useSelector} from "react-redux";
import {selectAccount} from "../globalstate/accountSlice";
import {useCallback, useState} from "react";
import {config, useSpring, animated} from "@react-spring/native";
import {useFocusEffect} from "@react-navigation/native";

const MoodSoup = ({navigation}) => {

	const account = useSelector(selectAccount)

	const [soupTypeSelected, setSoupTypeSelected] = useState("")

	const [cook, setCook] = useState(false)

	const tongoStyle = useSpring({

		top: cook? 0 : 0,
		height: cook? 1000: 200,
		width: cook? 1260: 252,
		opacity: cook? 0: 1,
		config: config.molasses,
	})

	useFocusEffect(
		useCallback(() => {
			setSoupTypeSelected("")
			setCook(false)

		}, [])
	);

	return (

		<SafeAreaView>

			<Box h={"100%"} justifyContent={"center"} alignItems={"center"}>

				{account.info.nickname ?

					<>

						<HStack mt={6} mb={6} w={WIDTH * .85} justifyContent={"space-between"}>
							<Text fontWeight={"bold"} fontSize={20} color={useColorModeValue("#606060", "dark.white")}>今晚，我想來點...</Text>
							<Text fontWeight={"bold"} fontSize={20} color={useColorModeValue("#606060", "dark.white")}>{soupTypeSelected === ""? "" : soupTypeSelected + "湯！"}</Text>
						</HStack>

						<HStack w={WIDTH * .9} justifyContent={"space-between"} mb={8}>

							<Pressable onPress={() => {
								setSoupTypeSelected("學業")
							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bottom={soupTypeSelected === "學業"? 4: 0} bg={"transparent"} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>學業湯</Text>


								</HStack>
								<HStack zIndex={0} left={1} position={"absolute"} mt={4} bottom={soupTypeSelected === "學業"? 6: 2} mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>

							<Pressable onPress={() => {
								setSoupTypeSelected("職場")

							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bg={"transparent"} bottom={soupTypeSelected === "職場"? 4: 0} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>職場湯</Text>


								</HStack>
								<HStack zIndex={0} bottom={soupTypeSelected === "職場"? 6 :2} left={1} position={"absolute"} mt={4} mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>

							<Pressable onPress={() => {
								setSoupTypeSelected("感情")

							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bg={"transparent"}bottom={soupTypeSelected === "感情"? 4: 0} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>感情湯</Text>


								</HStack>
								<HStack zIndex={0} bottom={soupTypeSelected === "感情"? 6: 2} left={1} position={"absolute"} mt={4}  mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>

							<Pressable onPress={() => {
								setSoupTypeSelected("人際")

							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bg={"transparent"} bottom={soupTypeSelected === "人際"? 4: 0} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>人際湯</Text>


								</HStack>
								<HStack zIndex={0} bottom={soupTypeSelected === "人際"? 6: 2} left={1} position={"absolute"} mt={4} mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>

							<Pressable onPress={() => {
								setSoupTypeSelected("人生")

							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bg={"transparent"} bottom={soupTypeSelected === "人生"? 4: 0} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>人生湯</Text>


								</HStack>
								<HStack zIndex={0} bottom={soupTypeSelected === "人生"? 6: 2} left={1} position={"absolute"} mt={4} mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>

							<Pressable onPress={() => {
								setSoupTypeSelected("萬用")

							}}>
								<HStack pointerEvents={"none"}
								        zIndex={100} h={28} w={WIDTH * .12} p={3} mt={4} bg={"transparent"} bottom={soupTypeSelected === "萬用"? 4: 0} borderRadius={40}
								        borderWidth={1} justifyContent={"center"} alignItems={"center"}
								        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


									<Text fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.darkgray")}>萬用湯</Text>


								</HStack>
								<HStack zIndex={0} bottom={soupTypeSelected === "萬用"? 6: 2} left={1} position={"absolute"} mt={4} mb={-3} h={28}
								        w={WIDTH * .12}
								        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
								        justifyContent={"space-between"} alignItems={"center"}>

								</HStack>
							</Pressable>


						</HStack>


						<animated.Image
							alt={"DAGOZE"}
							source={tongo}
							style={tongoStyle}
						/>

						<Pressable onPress={async () => {
							setCook(true)
							await new Promise(resolve => setTimeout(resolve, 2000));
							navigation.navigate("MoodSoupView", {soupType: soupTypeSelected})
						}}>
							<HStack pointerEvents={"none"}
							        zIndex={100} h={14} w={WIDTH * .5} p={3} mt={4} bg={"transparent"} borderRadius={40}
							        borderWidth={1} justifyContent={"center"} alignItems={"center"}
							        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


								<Text fontSize={16} fontWeight={"bold"}
								      color={useColorModeValue("light.primary", "dark.darkgray")}>下鍋煮沸</Text>


							</HStack>
							<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={4} bottom={0} mb={-3} h={14}
							        w={WIDTH * .5}
							        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
							        justifyContent={"space-between"} alignItems={"center"}>

							</HStack>
						</Pressable>

						<Pressable onPress={() => {
							navigation.navigate("SoupWrite")
						}}>
							<HStack pointerEvents={"none"}
							        zIndex={100} h={14} w={WIDTH * .5} p={3} mt={4} bg={"transparent"} borderRadius={40}
							        borderWidth={1} justifyContent={"center"} alignItems={"center"}
							        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


								<Text fontSize={16} fontWeight={"bold"}
								      color={useColorModeValue("light.primary", "dark.darkgray")}>我想燉雞湯！</Text>


							</HStack>
							<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={4} bottom={0} mb={-3} h={14}
							        w={WIDTH * .5}
							        bg={useColorModeValue("light.section_bg", "dark.white")} borderRadius={40}
							        justifyContent={"space-between"} alignItems={"center"}>

							</HStack>
						</Pressable>
					</>

					: <Pressable onPress={() => {
						navigation.navigate("Signin", {account: {email: "", password: ""}})
					}} alignItems={"center"} justifyContent={"center"} borderRadius={16} borderColor={"#ffae35"}
					             borderWidth={1} h={WIDTH * .25} w={WIDTH * .85}>

						<Text fontSize={16} fontWeight={"bold"}
						      color={useColorModeValue("light.darkgray", "dark.white")}>來碗暖的？</Text>
						<Text fontSize={16} fontWeight={"bold"}
						      color={useColorModeValue("light.primary", "dark.primary")}>登入來享受雞湯吧！</Text>

					</Pressable>

				}


			</Box>

		</SafeAreaView>
	)
}
export default MoodSoup
