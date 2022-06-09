import {SafeAreaView} from "react-native-safe-area-context";
import {face, WIDTH} from "../util";
import {Box, Button, HStack, Text, FlatList, useColorModeValue, VStack, Pressable, Menu} from "native-base";
import {Feather} from "@expo/vector-icons";
import {selectAccount} from "../globalstate/accountSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

const NoteItem = ({item}) => {

	const navigation = useNavigation()

	return (
		<Pressable
			onPress={() => {
				navigation.navigate("DiaryView", {
					date: {
						dateString: item.dateString,
						year: item.y,
						month: item.m,
						day: item.d,
					}
				})
			}}
			h={24} mt={5}>

			<HStack pl={4} borderWidth={1} borderColor={useColorModeValue("light.primary", "dark.primary")} zIndex={100}
			        p={2}
			        pr={5} borderRadius={16} bg={useColorModeValue("light.flat_bg", "dark.flat_bg")}
			        w={WIDTH * .9} h={22} justifyContent={"space-between"} alignItems={"center"}>

				<HStack alignItems={"center"}>

					<Image
						alt={"angry"}

						source={item.mood === "smile" ? face.filled.smile :
							item.mood === "neutral" ? face.filled.neutral :
								item.mood === "sad" ? face.filled.sad :
									item.mood === "angry" ? face.filled.angry : null}
						style={{
							width: 52,
							height: 52
						}}
					/>

					<VStack ml={4}>
						<Text mt={1} color={useColorModeValue("light.darkgray", "dark.white")} fontSize={16}
						      fontWeight={"bold"}>{item.title}</Text>
						<Text h={12} fontSize={13}
						      color={useColorModeValue("light.darkgray", "dark.primary")}>{item.content}</Text>
					</VStack>

				</HStack>

				<VStack h={14} justifyContent={"flex-end"}>
					<Text fontSize={18} fontWeight={"bold"}
					      color={useColorModeValue("light.primary", "dark.primary")}>{item.d}</Text>
				</VStack>

			</HStack>

			<HStack zIndex={0} display={"absolute"} top={-82} p={2} pr={5} borderRadius={16} mb={4}
			        bg={useColorModeValue("light.secondary", "dark.primary")}
			        w={WIDTH * .9} h={23} justifyContent={"space-between"} alignItems={"center"}></HStack>

		</Pressable>

		// <HStack>
		// 	<HStack pointerEvents={"none"}
		// 	        zIndex={100} h={14} w={WIDTH * .5} p={3} mt={4}  bg={"transparent"} borderRadius={40}
		// 	        borderWidth={1} justifyContent={"center"} alignItems={"center"}
		// 	        borderColor={useColorModeValue("light.primary", "dark.primary")}>
		//
		//
		// 		<Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.primary", "dark.primary")}>發送 ！</Text>
		//
		//
		// 	</HStack>
		// 	<HStack zIndex={0} top={2} left={2} position={"absolute"} mt={4} bottom={0} mb={-3} h={14} w={WIDTH * .5}
		// 	        bg={useColorModeValue("light.section_bg", "dark.section_bg")} borderRadius={40}
		// 	        justifyContent={"space-between"} alignItems={"center"}>
		//
		// 	</HStack>
		// </HStack>

	)
}

const DiaryOverview = ({navigation}) => {

	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const [shouldOverlapWithTrigger] = useState(false);
	const [position, setPosition] = useState("auto");

	const [viewingYear, setViewingYear] = useState(new Date().getFullYear())
	const [viewingMonth, setViewingMonth] = useState(new Date().getMonth() + 1)

	const [displayList, setDisplayList] = useState([])

	useEffect(() => {
		console.log(account.data.notes)
	}, [])

	useEffect(() => {
		let rawData = []
		rawData = rawData.concat(account.data.notes)

		let newData = rawData.filter(item => item.m === viewingMonth && item.y === viewingYear)

		let sortedData = newData.sort((a, b) => {
			return a.d < b.d
		})

		setDisplayList(sortedData)


	}, [viewingMonth, viewingYear])

	useEffect(() => {

	}, [account])

	const renderItem = ({item}) => <NoteItem item={item}/>


	return (
		<SafeAreaView>

			<Box h={"100%"} justifyContent={"flex-start"} alignItems={"center"}>

				<HStack w={WIDTH * .9} h={16} justifyContent={"space-between"} alignItems={"center"}>

					<HStack>

						<Pressable p={2} onPress={() => {
							navigation.goBack()
						}}
						           _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"arrow-left"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Pressable>
					</HStack>


					<HStack justifyContent={"flex-start"} mr={12}>

						<Menu
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
										<Text fontSize={20} fontWeight={"bold"}
										      color={useColorModeValue("light.primary", "dark.primary")}>{viewingYear + " 年"}</Text>

									</HStack>
								</Button>;
							}}>

							<Menu.OptionGroup onChange={(value) => {

								setViewingYear(value)

							}} defaultValue={viewingYear} title={"年份"} type="radio">

								<Menu.ItemOption value={2023}>2023</Menu.ItemOption>
								<Menu.ItemOption value={2022}>2022</Menu.ItemOption>
								<Menu.ItemOption value={2021}>2021</Menu.ItemOption>
								<Menu.ItemOption value={2020}>2020</Menu.ItemOption>
								<Menu.ItemOption value={2019}>2019</Menu.ItemOption>
								<Menu.ItemOption value={2018}>2018</Menu.ItemOption>

							</Menu.OptionGroup>
						</Menu>

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
									<HStack alignItems={"center"} right={2}>
										<Text fontSize={20} fontWeight={"bold"}
										      color={useColorModeValue("light.primary", "dark.primary")}>{viewingMonth + " 月"}</Text>
									</HStack>
								</Button>;
							}}>

							<Menu.OptionGroup onChange={(value) => {

								setViewingMonth(value)

							}} defaultValue={viewingMonth} title={"瀏覽月份"} type="radio">

								<Menu.ItemOption value={1}>1月</Menu.ItemOption>
								<Menu.ItemOption value={2}>2月</Menu.ItemOption>
								<Menu.ItemOption value={3}>3月</Menu.ItemOption>
								<Menu.ItemOption value={4}>4月</Menu.ItemOption>
								<Menu.ItemOption value={5}>5月</Menu.ItemOption>
								<Menu.ItemOption value={6}>6月</Menu.ItemOption>
								<Menu.ItemOption value={7}>7月</Menu.ItemOption>
								<Menu.ItemOption value={8}>8月</Menu.ItemOption>
								<Menu.ItemOption value={9}>9月</Menu.ItemOption>
								<Menu.ItemOption value={10}>10月</Menu.ItemOption>
								<Menu.ItemOption value={11}>11月</Menu.ItemOption>
								<Menu.ItemOption value={12}>12月</Menu.ItemOption>

							</Menu.OptionGroup>
						</Menu>

					</HStack>


					<HStack>
						<Button p={2} onPress={() => {
							navigation.goBack()
						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"search"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>

						{/*<Button p={2} onPress={() => {*/}
						{/*	navigation.goBack()*/}
						{/*}}*/}
						{/*        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>*/}
						{/*	<Feather name={"arrange"} size={24} color={"#606060"}/>*/}
						{/*</Button>*/}

						<Button p={2} onPress={() => {

						}}
						        _pressed={{backgroundColor: "transparent"}} bg={"transparent"}>
							<Feather name={"calendar"} size={24} color={useColorModeValue("#606060", "#eee")}/>
						</Button>
					</HStack>

				</HStack>

				{displayList.length === 0 ?

					<HStack mt={12} borderColor={useColorModeValue("light.primary", "dark.white")} justifyContent={"center"} alignItems={"center"} w={WIDTH * .8} h={24} borderRadius={20} borderWidth={1}>
						<Text fontSize={14} letterSpacing={2} color={useColorModeValue("light.primary", "dark.white")}>這段時間沒有日記哦！</Text>
					</HStack>
					:
					<FlatList

						h={"100%"}
						mt={4}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{}}
						data={displayList}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>
				}


			</Box>

		</SafeAreaView>
	)
}

export default DiaryOverview
