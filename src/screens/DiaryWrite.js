import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, HStack, Input, Pressable, Text, TextArea, useColorModeValue, VStack} from "native-base";
import {Feather} from "@expo/vector-icons";
import {Image} from "react-native";
import {face, WIDTH} from "../util";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAccount, setData} from "../globalstate/accountSlice";
import {apiRequest} from "../apis/apiManager";

const DiaryWrite = ({route, navigation}) => {

	const {date, note} = route.params;

	const [noteTitle, setNoteTitle] = useState(note? note.title: "")
	const [noteContent, setNoteContent] = useState(note? note.content: "")
	const [selectedMood, setSelectedMood] = useState(note? note.mood: "")

	const dispatch = useDispatch()
	const account = useSelector(selectAccount)

	//
	// Debug 用
	//

	useEffect(() => {

		console.log(date)

		console.log(account.data.notes)
		console.log(new Date().getMilliseconds())

	}, [account])


	useEffect(() => {

		let newNotesData = []
		newNotesData = newNotesData.concat(account.data.notes)

		console.log(noteTitle + noteContent)

		let duplicateIndex = newNotesData.findIndex(item => item.dateString === date.dateString)
		console.log(duplicateIndex >= 0)

		if (noteTitle === "" && noteContent === "" && duplicateIndex >= 0) {
			console.log("DELETE!!!")
			newNotesData.splice(duplicateIndex, 1)
		}

		if (duplicateIndex >= 0) { //如果有找到相同日期的日記 就直接覆蓋

			console.log("FOUND DUPLICATE " + duplicateIndex)

			newNotesData.splice(duplicateIndex, 1, {
				id: "" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + new Date().getMinutes() + new Date().getMilliseconds(),
				y: date.year,
				m: date.month,
				d: date.day,
				dateString: date.dateString,
				title: noteTitle,
				content: noteContent,
				mood: selectedMood
			})

		} else {

			newNotesData.push({ //如果沒有找到相同日期的日記 就新增一個item
				id: "" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + new Date().getMinutes() + new Date().getMilliseconds(),
				y: date.year,
				m: date.month,
				d: date.day,
				dateString: date.dateString,
				title: noteTitle,
				content: noteContent,
				mood: selectedMood
			})
		}

		dispatch(setData({
			notes: newNotesData,
			markedNotes: {
				...account.data.markedNotes,
				[date.dateString]: {marked: true, dotColor: "#ffae35"}
			}
		}))


		if (noteTitle === "" && noteContent === "") {

			dispatch(setData({
				...account.data,
				markedNotes: {
					...account.data.markedNotes,
					[date.dateString]: {}
				}
			}))
		}

	}, [noteTitle, noteContent, selectedMood])



	return (
		<SafeAreaView>

			<Box>

				<HStack px={WIDTH * .05} h={16} mb={8} justifyContent={"space-between"} alignItems={"center"}>

					<HStack>

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

							apiRequest("put", "/api/update-data", {

								userLink: account.info.userLink,
								data: account.data

							}).then(res=> {
								console.log(res)
							})

							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"check"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>

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

				<VStack>

					<Input onChangeText={(title) => {
						setNoteTitle(title)
					}}
					       value={noteTitle}
					       borderWidth={0} placeholder={"標題..."} fontSize={22} fontWeight={"bold"} px={WIDTH * .07} p={2}
					       mb={4}
					       color={useColorModeValue("#606060", "#ccc")}
					       _focus={{bg: useColorModeValue("light.flat_bg", "dark.flat_bg")}}
					       bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}/>

					<VStack zIndex={100} h={32} w={WIDTH * .9} p={3} ml={WIDTH * .05} mb={10} bg={useColorModeValue("light.flat_bg", "dark.flat_bg")} borderRadius={40}
					        borderWidth={2} justifyContent={"center"} alignItems={"center"}
					        borderColor={useColorModeValue("light.primary", "dark.primary")}>


						<Text fontSize={18} fontWeight={"bold"} color={useColorModeValue("light.darkgray", "dark.primary")}>
							{account.info.nickname!= "" ? account.info.nickname + "，" + "過得如何呢？" : "嗨！ 過得如何呢？"}
						</Text>

						<HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"} px={8} mt={2} h={16}>

							<Pressable onPress={() => {
								setSelectedMood("smile"), console.log(selectedMood)
							}}>
								<Image
									alt={"smile"}
									source={selectedMood === "smile" ? face.filled.smile : face.outlined.smile}
									style={selectedMood === "smile" ? {
										width: 54,
										height: 54
									} : {
										width: 42,
										height: 42
									}}
								/>
							</Pressable>
							<Pressable onPress={() => {
								setSelectedMood("neutral") , console.log(selectedMood)
							}}>
								<Image
									alt={"neutral"}

									source={selectedMood === "neutral" ? face.filled.neutral : face.outlined.neutral}
									style={selectedMood === "neutral" ? {
										width: 54,
										height: 54
									} : {
										width: 42,
										height: 42
									}}
								/>
							</Pressable>
							<Pressable onPress={() => {
								setSelectedMood("sad")
							}}>
								<Image
									alt={"sad"}

									source={selectedMood === "sad" ? face.filled.sad : face.outlined.sad}
									style={selectedMood === "sad" ? {
										width: 54,
										height: 54
									} : {
										width: 42,
										height: 42
									}}
								/>
							</Pressable>
							<Pressable onPress={() => {
								setSelectedMood("angry")
							}}>
								<Image
									alt={"angry"}

									source={selectedMood === "angry" ? face.filled.angry : face.outlined.angry}
									style={selectedMood === "angry" ? {
										width: 54,
										height: 54
									} : {
										width: 42,
										height: 42
									}}
								/></Pressable>
						</HStack>


					</VStack>
					<HStack zIndex={0} position={"absolute"} bottom={0} mb={7} h={32} w={WIDTH * .9} ml={WIDTH * .05}
					        bg={useColorModeValue("light.secondary", "dark.primary")} borderRadius={40}
					        borderColor={useColorModeValue("light.primary", "dark.primary")} borderWidth={1}
					        justifyContent={"space-between"} alignItems={"center"}>

					</HStack>
				</VStack>

				<VStack>
					<HStack zIndex={100} h={96} w={WIDTH * .9} p={3} ml={WIDTH * .05} bg={useColorModeValue("light.flat_bg", "dark.flat_bg")} borderRadius={40}
					        borderWidth={2} justifyContent={"space-between"} alignItems={"flex-start"}
					        borderColor={useColorModeValue("light.primary", "dark.primary")}>

						<TextArea onChangeText={(content) => {
							setNoteContent(content)
						}}
						          value={noteContent}

						          lineHeight={24} letterSpacing={1} w={"100%"} h={"100%"} borderWidth={0}
						          placeholder={"記下你的心情吧！"} fontSize={16} fontWeight={"bold"} mb={4}
						          color={useColorModeValue("#606060", "#ccc")}
						          _focus={{bg: useColorModeValue("light.flat_bg", "dark.flat_bg")}}
						          bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}/>

					</HStack>
					<HStack zIndex={0} position={"absolute"} bottom={0} mb={-3} h={32} w={WIDTH * .9} ml={WIDTH * .05}
					        bg={useColorModeValue("light.secondary", "dark.primary")} borderRadius={40}
					        borderColor={useColorModeValue("light.primary", "dark.primary")} borderWidth={1}
					        justifyContent={"space-between"} alignItems={"center"}>

					</HStack>
				</VStack>
			</Box>
		</SafeAreaView>
	)
}
export default DiaryWrite
