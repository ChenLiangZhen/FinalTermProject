import {SafeAreaView} from "react-native-safe-area-context";
import {
	Box,
	Button,
	HStack,
	Input,
	Pressable,
	Text,
	TextArea,
	Toast,
	useColorModeValue,
	useToast,
	VStack
} from "native-base";
import {face, WIDTH} from "../util";
import {Feather} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectAccount, setData} from "../globalstate/accountSlice";
import {useCallback, useEffect, useRef, useState} from "react";
import {Image} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {apiRequest} from "../apis/apiManager";

const DiaryView = ({route, navigation}) => {

	const {date} = route.params;

	const [noteTitle, setNoteTitle] = useState("")
	const [noteContent, setNoteContent] = useState("")
	const [selectedMood, setSelectedMood] = useState("")

	const dispatch = useDispatch()
	const account = useSelector(selectAccount)

	const toast = useToast()
	const toastAlertRef = useRef()
	const toastConfirmRef = useRef()
	const toastAlertID = "alert"
	const toastConfirmID = "confirm"

	useFocusEffect(

		useCallback(() => {

			let retrieved = account.data.notes.find(item => item.dateString === date.dateString)


			if (retrieved) {

				if(retrieved.title === ""){
					navigation.navigate("DiaryWrite", {date})
				}

				setNoteTitle(retrieved.title)
				setNoteContent(retrieved.content)
				setSelectedMood(retrieved.mood)

			}

		})
	);

	function closeAlertToast() {
		if (toastAlertRef.current) {
			toast.close(toastAlertRef.current);
		}
	}

	function closeConfirmToast() {
		if (toastConfirmRef.current) {
			toast.close(toastConfirmRef.current);
		}
	}

	function addToast(type) {
		if(type === "alert"){
			if (!toast.isActive("alert")) {
				toastAlertRef.current = toast.show({
					id: toastAlertID,
					render: () => {
						return (
							<ToastAlert/>
						)
					}
				});}
		}else {
			if (!toast.isActive("confirm")) {
				toastConfirmRef.current = toast.show({
					id: toastConfirmID,
					render: () => {
						return (
							<ToastConfirm/>
						)
					}
				});}
		}
	}

	const ToastConfirm = () => {
		return(
			<HStack alignItems={"center"} justifyContent={"space-between"} bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6} py="1"  mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>日記已被刪除。</Text>
			</HStack>
		)
	}

	const ToastAlert = () => {
		return(
			<HStack alignItems={"center"} justifyContent={"space-between"} bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6} py="1"  mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>確定刪除日記嗎？</Text>

				<HStack>
					<Button
						onPress={async ()=> {
							closeAlertToast()
							removeNote()
							await new Promise(resolve => setTimeout(resolve, 100));
							addToast("confirm")
							await new Promise(resolve => setTimeout(resolve, 1500));

							apiRequest("put", "/api/update-data", {

								userLink: account.info.userLink,
								data: account.data

							}).then(res=> {
								console.log(res)
							})

							closeConfirmToast()
						}}
						_pressed={{ bg: useColorModeValue("light.darkgray", "dark.darkgray") }}
						 borderWidth={1} color={useColorModeValue("light.primary", "dark.primary")} bg={useColorModeValue("light.midgray", "transparent")} borderColor={useColorModeValue("light.primary", "dark.flat_bg")} borderRadius={8} mr={2}>

						<Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.primary", "dark.flat_bg")}>刪除</Text>
					</Button>

					<Button
						onPress={()=> {
							closeAlertToast()
						}}
						_pressed={{ bg: useColorModeValue("light.darkgray", "dark.darkgray") }}
						bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={8}>
						<Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>取消</Text>

					</Button>
				</HStack>
			</HStack>
		)
	}

	const removeNote = () => {

		let newNotesData = []
		newNotesData = newNotesData.concat(account.data.notes)

		const removeTarget = newNotesData.findIndex(item => item.dateString === date.dateString)
		newNotesData.splice(removeTarget, 1)

		dispatch(setData({
			notes: newNotesData,
			markedNotes: {
				...account.data.markedNotes,
				[date.dateString]: {}
			}
		}))

		console.log(newNotesData)

		navigation.navigate("MainScreen")
	}

	return(

		<SafeAreaView>

			<Box>
				<HStack px={WIDTH * .05} h={16} mb={8} justifyContent={"space-between"} alignItems={"center"}>

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
							<Text fontSize={20} fontWeight={"bold"}
							      color={useColorModeValue("#606060", "#eee")}>{"" + date.year + " / " + date.month + " / " + date.day}</Text>
						</Button>
					</HStack>



					<HStack>
						<Button p={2} onPress={() => {
							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"bookmark"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>

						<Button p={2} onPress={() => {
							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"upload"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>

						<Button p={2} onPress={async () => {
							addToast("alert")
							// await new Promise(resolve => setTimeout(resolve, 1500));
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"trash"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>
					</HStack>

				</HStack>

				<HStack mb={2} pr={8} px={WIDTH * .06} h={20} justifyContent={"space-between"} alignItems={"center"}>

					<Input onChangeText={(title) => {
						setNoteTitle(title)
					}}
					       value={noteTitle} w={WIDTH * .6}
					       borderWidth={0} placeholder={"標題..."} fontSize={22} fontWeight={"bold"} px={WIDTH * .01}
					       color={useColorModeValue("#606060", "#ccc")}
					       _focus={{bg: useColorModeValue("light.flat_bg", "dark.flat_bg")}}
					       bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}/>

					<Image
						alt={"smile"}
						source={selectedMood === "smile" ? face.filled.smile :
							selectedMood === "neutral" ? face.filled.neutral :
								selectedMood === "sad" ? face.filled.sad :
									selectedMood === "angry"? face.filled.angry : null}
						style={{
							width: 54,
							height: 54,
						}}
					/>

				</HStack>

				<Pressable
					onPress={()=> {
						navigation.navigate("DiaryWrite", {date, note: {title: noteTitle, content: noteContent, mood:selectedMood }})
					}}
				>
					<HStack pointerEvents={"none"}
								zIndex={100} h={120} w={WIDTH * .9} p={3} ml={WIDTH * .05} bg={useColorModeValue("light.flat_bg", "dark.flat_bg")} borderRadius={40}
					        borderWidth={2} justifyContent={"space-between"} alignItems={"flex-start"}
					        borderColor={useColorModeValue("light.primary", "dark.primary")}>

						<TextArea
							editable={false}
							onChangeText={(content) => {
							setNoteContent(content)
						}}
						          value={noteContent}

						          lineHeight={24} letterSpacing={1} w={"100%"} h={"100%"} borderWidth={0}
						          placeholder={"記下你的心情吧！"} fontSize={16} fontWeight={"bold"} mb={4}
						          color={useColorModeValue("light.midgray", "#ccc")}
						          _focus={{bg: useColorModeValue("light.flat_bg", "dark.flat_bg")}}
						          bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}/>

					</HStack>
					<HStack zIndex={0} position={"absolute"} bottom={0} mb={-3} h={32} w={WIDTH * .9} ml={WIDTH * .05}
					        bg={useColorModeValue("light.secondary", "dark.primary")} borderRadius={40}
					        borderColor={useColorModeValue("light.primary", "dark.primary")} borderWidth={1}
					        justifyContent={"space-between"} alignItems={"center"}>

					</HStack>
				</Pressable>
			</Box>

		</SafeAreaView>
	)
}
export default DiaryView
