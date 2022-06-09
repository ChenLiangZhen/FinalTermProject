import {Box, Button, HStack, Pressable, Text, TextArea, useColorModeValue, VStack} from "native-base";
import {face, WIDTH} from "../util";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "react-native";
import {apiRequest} from "../apis/apiManager";
import {Feather} from "@expo/vector-icons";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

const MoodSoupView = ({route, navigation}) => {

	const {soupType} = route.params

	const [soupContent, setSoupContent] = useState("")
	const [soupAuthor, setAuthor] = useState("")


	useFocusEffect(
		useCallback(() => {

			if (soupType != "") {

				apiRequest("get", "/api/get-soup", {
					params: {
						soupType: soupType
					}

				}).then(res => {

					setSoupContent(res[0].data.soup)
					setAuthor(res[0].data.soupAuthor)
					console.log(res[0].data.soup)


				}).catch((e)=> {

					console.log(e)
					setSoupContent("抱歉，目前" + soupType + "湯缺貨...")
					setAuthor("T^T")
				})
			}
		}, [])
	);

	return (

		<SafeAreaView>

			<Box h={"100%"} justifyContent={"flex-start"} alignItems={"center"}>

				<HStack h={16} w={WIDTH * .9} mb={0}>

					<Button p={2} onPress={() => {
						navigation.goBack()
					}}
					        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
						<Feather name={"arrow-left"} size={24} color={useColorModeValue("light.primary", "#eee")}/>
					</Button>

				</HStack>

				<HStack w={WIDTH * .9} justifyContent={"center"}>
					{soupType === "" ?
						<Text mb={12} fontSize={22} fontWeight={"bold"}
						      color={useColorModeValue("light.darkgray", "dark.white")}>你到底想喝什麼湯？！ 🤬</Text>
						: <Text mb={12} fontSize={22} fontWeight={"bold"}
						        color={useColorModeValue("light.darkgray", "dark.white")}>{"為您準備：" + soupType + "湯"}</Text>
					}
				</HStack>

				<HStack>

					<VStack pointerEvents={"none"} padding={6}
					        zIndex={100} h={96} w={WIDTH * .9} p={3} bg={"transparent"} borderRadius={40}
					        borderWidth={1} justifyContent={"center"} alignItems={"center"}
					        borderColor={useColorModeValue("light.primary", "#fff")}>

						<Text mb={12} fontSize={24} fontWeight={"bold"}
						      color={useColorModeValue("light.darkgray", "dark.flat_bg")}>{soupType === ""? "" : "「 " + soupContent + " 」"}</Text>
						<Text fontSize={18} fontWeight={"bold"}
						      color={useColorModeValue("light.darkgray", "dark.flat_bg")}>{soupType === ""? "" : "來自 " + soupAuthor + " 的雞湯。"}</Text>

					</VStack>
					<HStack zIndex={0} top={2} left={2} position={"absolute"} bottom={0} mb={-3} h={96} w={WIDTH * .9}
					        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
					        justifyContent={"space-between"} alignItems={"center"}>
					</HStack>

				</HStack>

				<Pressable

					onPress={() => {

						if(soupType != ""){

							apiRequest("get", "/api/get-soup", {
								params: {
									soupType: soupType
								}

							}).then(res => {

								setSoupContent(res[0].data.soup)
								setAuthor(res[0].data.soupAuthor)
								console.log(res[0].data.soup)


							}).catch((e)=> {

								console.log(e)
								setSoupContent("就跟你說缺貨咩😒\n不然你去燉雞湯🥰")
								setAuthor("🙄")
							})
						}

					}}
				>
					<HStack pointerEvents={"none"}
					        zIndex={100} h={14} w={WIDTH * .5} p={3} mt={8} bg={"transparent"} borderRadius={40}
					        borderWidth={1} justifyContent={"center"} alignItems={"center"}
					        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


						<Text fontSize={16} fontWeight={"bold"}
						      color={useColorModeValue("light.darkgray", "dark.darkgray")}>再來一碗！</Text>


					</HStack>
					<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={8} bottom={0} mb={-3} h={14} w={WIDTH * .5}
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
					<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={4} bottom={0} mb={-3} h={14} w={WIDTH * .5}
					        bg={useColorModeValue("light.section_bg", "dark.white")} borderRadius={40}
					        justifyContent={"space-between"} alignItems={"center"}>

					</HStack>
				</Pressable>

			</Box>

		</SafeAreaView>
	)
}
export default MoodSoupView
