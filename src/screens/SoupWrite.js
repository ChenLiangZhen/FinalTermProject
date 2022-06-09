import {face, WIDTH} from "../util";
import {
	Box,
	Button, Divider,
	HStack,
	Menu,
	Pressable,
	Select,
	Text,
	TextArea,
	useColorModeValue,
	useToast,
	VStack
} from "native-base";
import {Feather} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {apiRequest} from "../apis/apiManager";
import {useSelector} from "react-redux";
import {selectAccount} from "../globalstate/accountSlice";

const SoupWrite = ({navigation}) => {

	const [soup, setSoup] = useState("")

	const account = useSelector(selectAccount)

	const toast = useToast()
	const toastConfirmRef = useRef()
	const toastConfirmID = "confirm"

	const [soupType, setSoupType] = useState("選擇湯種")

	function closeConfirmToast() {
		if (toastConfirmRef.current) {
			toast.close(toastConfirmRef.current);
		}
	}

	useEffect(() => {

		console.log(soupType)

	}, [soupType])

	function addToast(text) {

		if (!toast.isActive("confirm")) {
			toastConfirmRef.current = toast.show({
				id: toastConfirmID,
				render: () => {
					return (
						<ToastConfirm msg={text}/>
					)
				}
			});
		}

	}

	const ToastConfirm = ({msg}) => {
		return (
			<HStack alignItems={"center"} justifyContent={"space-between"}
			        bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6}
			        py="1" mb={5}>
				<Text fontWeight={"bold"} fontSize={16}
				      color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>{msg}</Text>
			</HStack>
		)
	}

	const [shouldOverlapWithTrigger] = useState(false);
	const [position, setPosition] = useState("auto");

	return (

		<SafeAreaView>

			<Box justifyContent={"center"} alignItems={"center"}>
				<HStack w={"100%"} px={WIDTH * .05} h={16} mb={8} justifyContent={"space-between"} alignItems={"center"}>

					<HStack>
						<Button p={2} onPress={() => {
							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"arrow-left"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>

						<Button p={2} onPress={() => {
							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							{/*<Text fontSize={20} fontWeight={"bold"}*/}
							{/*      color={useColorModeValue("light.darkgray", "dark.white")}>撰寫心靈雞湯</Text>*/}

						</Button>
					</HStack>


					<HStack>
						{/*<Button p={2} onPress={() => {*/}
						{/*	navigation.goBack()*/}
						{/*}}*/}
						{/*        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>*/}
						{/*	<Feather name={"bookmark"} size={24} color={"#606060"}/>*/}
						{/*</Button>*/}

						{/*<Button p={2} onPress={() => {*/}
						{/*	navigation.goBack()*/}
						{/*}}*/}
						{/*        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>*/}
						{/*	<Feather name={"upload"} size={24} color={"#606060"}/>*/}
						{/*</Button>*/}

						{/*<Button p={2} onPress={() => {*/}
						{/*	removeNote()*/}
						{/*}}*/}
						{/*        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>*/}
						{/*	<Feather name={"trash"} size={24} color={"#606060"}/>*/}
						{/*</Button>*/}
					</HStack>

				</HStack>

				<HStack m={2} w={WIDTH * .9} justifyContent={"flex-end"}>
					<Menu
						mr={3}
						borderRadius={8}
						bg={useColorModeValue("white", "black")}
						borderWidth={1}
						borderColor={"#ffae35"}
						shadow={"none"}
						shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
						placement={position == "auto" ? undefined : position}
						trigger={triggerProps => {
							return <Button
								_pressed={{bg: "transparent"}}
								bg={"transparent"}
								variant="solid" {...triggerProps}>
								<HStack alignItems={"center"}>
									<Text mr={2} fontSize={16} fontWeight={"bold"}
									      color={useColorModeValue("light.primary", "dark.primary")}>{soupType}</Text>
									<Feather name={"arrow-down"} size={16} color={useColorModeValue("#ffae35", "#ffae35")}/>
								</HStack>
							</Button>;
						}}>

						<Menu.OptionGroup onChange={(type) => {

							console.log(type)
							setSoupType(type)

						}} defaultValue={soupType} title={"請選擇湯種"}  type="radio">

							<Menu.ItemOption value="學業">學業</Menu.ItemOption>
							<Menu.ItemOption value="職場">職場</Menu.ItemOption>
							<Menu.ItemOption value="感情">感情</Menu.ItemOption>
							<Menu.ItemOption value="人際">人際</Menu.ItemOption>
							<Menu.ItemOption value="人生">人生</Menu.ItemOption>
							<Menu.ItemOption value="萬用">萬用</Menu.ItemOption>

						</Menu.OptionGroup>
					</Menu>
				</HStack>

				<HStack>

					<VStack padding={4}
					        zIndex={100} h={96} w={WIDTH * .9} p={3} bg={"transparent"} borderRadius={16}
					        borderWidth={1} justifyContent={"space-between"} alignItems={"flex-start"}
					        borderColor={useColorModeValue("light.primary", "dark.primary")}>


						<TextArea onChangeText={(content) => {
							setSoup(content)
						}}
						          lineHeight={24} letterSpacing={1} w={"100%"} h={"100%"} borderWidth={0}
						          placeholder={"寫段心靈雞湯送給別人！"} fontSize={16} fontWeight={"bold"} mb={4}
						          color={useColorModeValue("light.darkgray", "dark.white")}
						          _focus={{bg: useColorModeValue("light.flat_bg", "dark.flat_bg")}}
						          bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}/>

					</VStack>
					{/*<HStack zIndex={0} top={2} left={2} position={"absolute"} bottom={0} mb={-3} h={96} w={WIDTH * .9}*/}
					{/*        bg={useColorModeValue("light.section_bg", "dark.section_bg")} borderRadius={40}*/}
					{/*        justifyContent={"space-between"} alignItems={"center"}>*/}

					{/*</HStack>*/}

				</HStack>

				<Pressable onPress={async () => {

					if(soupType != "選擇湯種" && soup != ""){

						apiRequest("post", "/api/add-soup", {

							soupId: account.info.userLink + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getMilliseconds(),
							soupType: soupType,
							data: {
								soup: soup,
								soupAuthor: account.info.nickname
							}
						}).then(async res => {

							addToast("成功送出雞湯！")
							await new Promise(resolve => setTimeout(resolve, 1000));
							closeConfirmToast()

							navigation.goBack()

							console.log(res)
						})

					} else {

						addToast("資料不完整哦！")
						await new Promise(resolve => setTimeout(resolve, 1500));
						closeConfirmToast()
					}

				}}>
					<HStack pointerEvents={"none"}
					        zIndex={100} h={14} w={WIDTH * .5} p={3} mt={4} bg={"transparent"} borderRadius={40}
					        borderWidth={1} justifyContent={"center"} alignItems={"center"}
					        borderColor={useColorModeValue("light.primary", "dark.darkgray")}>


						<Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.primary", "dark.darkgray")}>發送
							！</Text>


					</HStack>
					<HStack zIndex={0} top={1} left={1} position={"absolute"} mt={4} bottom={0} mb={-3} h={14} w={WIDTH * .5}
					        bg={useColorModeValue("light.section_bg", "dark.primary")} borderRadius={40}
					        justifyContent={"space-between"} alignItems={"center"}>

					</HStack>
				</Pressable>

			</Box>

		</SafeAreaView>

	)
}

export default SoupWrite
