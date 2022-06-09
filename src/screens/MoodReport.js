import {SafeAreaView} from "react-native-safe-area-context";
import {Box, HStack, Text, useColorModeValue, VStack} from "native-base";
import {face, WIDTH} from "../util";
import {useSelector} from "react-redux";
import {selectAccount} from "../globalstate/accountSlice";
import {useEffect, useState} from "react";
import {Image} from "react-native";
import {Feather} from "@expo/vector-icons";

const MoodReport = () => {

	const account = useSelector(selectAccount)

	const [smileCount, setSmileCount] = useState({})
	const [neutralCount, setNeutralCount] = useState({})
	const [sadCount, setSadCount] = useState({})
	const [angryCount, setAngryCount] = useState({})

	const [smileCountPrev, setSmileCountPrev] = useState({})
	const [neutralCountPrev, setNeutralCountPrev] = useState({})
	const [sadCountPrev, setSadCountPrev] = useState({})
	const [angryCountPrev, setAngryCountPrev] = useState({})

	const [smileCountAll, setSmileCountAll] = useState({})
	const [neutralCountAll, setNeutralCountAll] = useState({})
	const [sadCountAll, setSadCountAll] = useState({})
	const [angryCountAll, setAngryCountAll] = useState({})

	const [total, setTotal] = useState(0)
	const [totalAll, setTotalAll] = useState(0)

	useEffect(() => {

		let rawData = []
		rawData = rawData.concat(account.data.notes)

		let newData = rawData.filter(item => item.m === new Date().getMonth() + 1)
		let newDataPrev = rawData.filter(item => item.m === new Date().getMonth())

		setTotal(newData.length)

		setSmileCount({
			count: newData.filter(item => item.mood === "smile").length,
			h: 80 / newData.length * newData.filter(item => item.mood === "smile").length
		})
		setNeutralCount({
			count: newData.filter(item => item.mood === "neutral").length,
			h: 80 / newData.length * newData.filter(item => item.mood === "neutral").length
		})
		setSadCount({
			count: newData.filter(item => item.mood === "sad").length,
			h: 80 / newData.length * newData.filter(item => item.mood === "sad").length
		})
		setAngryCount({
			count: newData.filter(item => item.mood === "angry").length,
			h: 80 / newData.length * newData.filter(item => item.mood === "angry").length
		})

		setSmileCountPrev({
			count: newDataPrev.filter(item => item.mood === "smile").length,
			h: 80 / newDataPrev.length * newDataPrev.filter(item => item.mood === "smile").length
		})
		setNeutralCountPrev({
			count: newDataPrev.filter(item => item.mood === "neutral").length,
			h: 80 / newDataPrev.length * newDataPrev.filter(item => item.mood === "neutral").length
		})
		setSadCountPrev({
			count: newDataPrev.filter(item => item.mood === "sad").length,
			h: 80 / newDataPrev.length * newDataPrev.filter(item => item.mood === "sad").length
		})
		setAngryCountPrev({
			count: newDataPrev.filter(item => item.mood === "angry").length,
			h: 80 / newDataPrev.length * newDataPrev.filter(item => item.mood === "angry").length
		})

		setSmileCountAll({
			count: rawData.filter(item => item.mood === "smile").length,
			h: 80 / rawData.length * rawData.filter(item => item.mood === "smile").length
		})
		setNeutralCountAll({
			count: rawData.filter(item => item.mood === "neutral").length,
			h: 80 / rawData.length * rawData.filter(item => item.mood === "neutral").length
		})
		setSadCountAll({
			count: rawData.filter(item => item.mood === "sad").length,
			h: 80 / rawData.length * rawData.filter(item => item.mood === "sad").length
		})
		setAngryCountAll({
			count: rawData.filter(item => item.mood === "angry").length,
			h: 80 / rawData.length * rawData.filter(item => item.mood === "angry").length
		})

	}, [account])

	return (
		<SafeAreaView>

			<Box h={"100%"} w={"100%"} justifyContent={"center"} alignItems={"center"}>

				{account.data.notes.length === 0 ?

					<Text>請建立日記以產生報表</Text> :

					<>
						<HStack w={WIDTH * .8} h={12} mt={4} alignItems={"center"}>
							<Text color={useColorModeValue("light.primary", "dark.primary")} fontSize={20}
							      fontWeight={"bold"}>本月心情統計</Text>
						</HStack>

						<VStack>

							<HStack borderRadius={16} p={3} px={5} h={40} w={WIDTH * .8} borderWidth={1}
							        borderColor={useColorModeValue("light.gray", "dark.primary")} alignItems={"flex-end"}
							        justifyContent={"space-around"}>

								<VStack alignItems={"center"}>
									<Text mb={1}>{smileCount.count}</Text>
									<VStack style={{
										height: smileCount.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>
									<Image
										alt={"smile"}

										source={face.outlined.smile}
										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{neutralCount.count}</Text>
									<VStack style={{
										height: neutralCount.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>
									<Image
										alt={"neutral"}

										source={face.outlined.neutral}

										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{sadCount.count}</Text>
									<VStack style={{
										height: sadCount.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>

									<Image
										alt={"sad"}

										source={face.outlined.sad}

										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{angryCount.count}</Text>

									<VStack style={{
										height: angryCount.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>

									<Image
										alt={"angry"}

										source={face.outlined.angry}

										style={{
											width: 28,
											height: 28
										}}
									/>

								</VStack>

							</HStack>


						</VStack>


						<HStack w={WIDTH * .8} h={12} mt={4} alignItems={"center"}>
							<Text color={useColorModeValue("light.primary", "dark.primary")} fontSize={20}
							      fontWeight={"bold"}>歷史心情統計</Text>
						</HStack>

						<VStack>

							<HStack borderRadius={16} p={3} px={5} h={40} w={WIDTH * .8} borderWidth={1}
							        borderColor={useColorModeValue("light.gray", "dark.primary")} alignItems={"flex-end"}
							        justifyContent={"space-around"}>

								<VStack alignItems={"center"}>
									<Text mb={1}>{smileCountAll.count}</Text>
									<VStack style={{
										height: smileCountAll.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>
									<Image
										alt={"smile"}

										source={face.outlined.smile}
										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{neutralCountAll.count}</Text>
									<VStack style={{
										height: neutralCountAll.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>
									<Image
										alt={"neutral"}

										source={face.outlined.neutral}

										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{sadCountAll.count}</Text>
									<VStack style={{
										height: sadCountAll.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>

									<Image
										alt={"sad"}

										source={face.outlined.sad}

										style={{
											width: 28,
											height: 28
										}}
									/>
								</VStack>

								<VStack alignItems={"center"}>
									<Text mb={1}>{angryCountAll.count}</Text>

									<VStack style={{
										height: angryCountAll.h
									}} w={2} mb={2} bg={useColorModeValue("light.darkgray", "dark.primary")}/>

									<Image
										alt={"angry"}

										source={face.outlined.angry}

										style={{
											width: 28,
											height: 28
										}}
									/>

								</VStack>

							</HStack>


						</VStack>

						<HStack w={WIDTH * .8} h={6} mt={8} alignItems={"center"}>
							<Feather name={"alert-circle"} size={18} color={useColorModeValue("#ffae35", "#eee")}/>
							<Text ml={2} color={useColorModeValue("light.primary", "dark.white")} fontSize={14}
							      fontWeight={"bold"}>{smileCount.count < smileCountPrev.count ? "這個月的開心日記比上個月少了 " + (smileCountPrev.count - smileCount.count) + " 個" : "這個月的開心日記比上個月多了 " + (smileCount.count - smileCountPrev.count) + " 個"}</Text>
						</HStack>

						<HStack w={WIDTH * .8} h={6} mt={2} alignItems={"center"}>
							<Feather name={"alert-circle"} size={18} color={useColorModeValue("#ffae35", "#eee")}/>
							<Text ml={2} color={useColorModeValue("light.primary", "dark.white")} fontSize={14}
							      fontWeight={"bold"}>{sadCount.count + angryCount.count < sadCountPrev.count + angryCountPrev.count ? "這個月難過與憤怒的日記比上個月少了 " + (sadCountPrev.count + angryCountPrev.count - sadCount.count - angryCount.count) + " 個" : "這個月難過與憤怒的日記比上個月多了 " + (sadCount.count + angryCount.count - sadCountPrev.count - angryCountPrev.count) + " 個"}</Text>
						</HStack>

						<HStack w={WIDTH * .8} h={6} mt={6} alignItems={"center"} justifyContent={"flex-end"}>
							<Text ml={2} color={useColorModeValue("light.darkgray", "dark.primary")} fontSize={14}
							      fontWeight={"bold"}>{(sadCount.count + angryCount.count > sadCountPrev.count + angryCountPrev.count) || (smileCount.count < smileCountPrev.count) ? "不開心的時候，放鬆一下吧！" : "繼續保持！"}</Text>
						</HStack>


					</>

				}

			</Box>

		</SafeAreaView>
	)
}

export default MoodReport
