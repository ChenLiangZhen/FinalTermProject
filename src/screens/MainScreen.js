import {Box, Button, HStack, StatusBar, useColorMode, useColorModeValue} from "native-base";
import {Calendar, LocaleConfig} from "react-native-calendars/src/index";
import {useEffect, useState} from "react";
import {WIDTH} from "../util";
import {Feather} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {selectAccount} from "../globalstate/accountSlice";

// style={{
// 	// borderWidth: 1,
// 	// borderColor: '#FFAE35',
// 	borderRadius: 24,
// 		width: WIDTH * 0.87,
// 		height: 390,
// 		padding: 12,
// }}
// // Specify theme properties to override specific styles for calendar parts. Default = {}
// theme={{
//
// 	'stylesheet.calendar.header': {
// 		monthText: {
// 			color: "#FFAE35",
// 				fontSize: 18,
// 				fontWeight: "bold"
// 		}
// 	},
//
// 	'stylesheet.calendar.basic': {
// 		todayText: {
// 			fontWeight: "bold"
// 		}
// 	},
//
// 	backgroundColor: useColorModeValue("light.primary", "dark.primary"),
// 		calendarBackground: "#fdf8ef",
// 		textSectionTitleColor: '#606060',
// 		textSectionTitleDisabledColor: '#d9e1e8',
// 		selectedDayBackgroundColor: '#606060',
// 		selectedDayTextColor: '#ffffff',
// 		todayTextColor: '#FFAE35',
// 		dayTextColor: '#606060',
// 		textDisabledColor: '#FFAE35',
// 		dotColor: '#00adf5',
// 		selectedDotColor: '#ffffff',
// 		arrowColor: '#606060',
// 		disabledArrowColor: '#d9e1e8',
// 		indicatorColor: 'red',
// 		textDayFontWeight: '300',
// 		textMonthFontWeight: 'bold',
// 		textDayHeaderFontWeight: '300',
// 		textDayFontSize: 14,
// 		textMonthFontSize: 14,
// 		textDayHeaderFontSize: 14
// }}


const MainScreen = ({navigation}) => {

	const [calendar, setCalendar] = useState("2021-10-05")

	const account = useSelector(selectAccount)

	const [markedDays, setMarkedDays] = useState({

		'2022-06-05': {selected: true, marked: true, selectedColor: '#FFAE35'},
		'2022-06-17': {marked: true, dotColor: '#FFAE35'},
		'2022-06-18': {marked: true, dotColor: '#FFAE35'},
	})

	const [dateString, setDateString] = useState("")

	useEffect(() => {

		let y, m, d
		d = new Date().getDate() + ""
		m = new Date().getMonth() + 1 + ""
		y = new Date().getFullYear() + ""
		if (m < 10) m = "0" + m
		if (d < 10) d = "0" + d

		console.log(y + "-" + m + "-" + d)
		setDateString(y + "-" + m + "-" + d)
	}, [])

	const {
		toggleColorMode
	} = useColorMode();

	LocaleConfig.locales['tw'] = {
		monthNames: [
			'一月',
			'二月',
			'三月',
			'四月',
			'五月',
			'六月',
			'七月',
			'八月',
			'九月',
			'十月',
			'十一月',
			'十二月'
		],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNames: ['日', '一', '二', '三', '四', '五', '六'],
		dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		today: "今天"
	};

	LocaleConfig.defaultLocale = 'tw';

	return (

		<SafeAreaView edges={["top"]}>

			<Box justifyContent={"center"} alignItems={"center"} height={"100%"}>


				<HStack w={WIDTH} h={20} px={WIDTH * .08} justifyContent={"space-between"}>

					<Box>
						<Button key={"msb1"} _pressed={{bg: "#fff"}} zIndex={100}
						        bg={useColorModeValue("light.flat_bg", "dark.flat_bg")} w={12} h={12} borderRadius={100} borderWidth={1}
						        borderColor={useColorModeValue("light.primary", "dark.primary")}>
							<Feather name={"calendar"} size={20} color={"#FFAE35"}/>
						</Button>
						<Box key={"SHADE"} position={"absolute"} bg={useColorModeValue("light.secondary", "dark.primary")}
						     top={0} w={12} h={14} borderRadius={100} borderWidth={1}
						     borderColor={useColorModeValue("light.primary", "dark.primary")}/>
					</Box>


					<Box>
						<Button
							onPress={() => {
								navigation.navigate("DiaryOverview")
							}}
							key={"msb2"} _pressed={{bg: "#fff"}} zIndex={100}
						        bg={useColorModeValue("light.flat_bg", "dark.flat_bg")} w={12} h={12} borderRadius={100} borderWidth={1}
						        borderColor={useColorModeValue("light.primary", "dark.primary")}>
							<Feather name={"book-open"} size={20} color={"#FFAE35"}/>
						</Button>
						<Box key={"SHADE2"} position={"absolute"} bg={useColorModeValue("light.secondary", "dark.primary")}
						     top={0} w={12} h={14} borderRadius={100} borderWidth={1}
						     borderColor={useColorModeValue("light.primary", "dark.primary")}/>
					</Box>


				</HStack>


				<Calendar
					// current={calendar}
					markedDates={account.data.markedNotes}

					onDayPress={(date) => {

						console.log(date)

						if(account.data.notes.find(item => item.dateString === date.dateString)) {
							navigation.navigate("DiaryView", { date })
						} else {
							navigation.navigate("DiaryWrite", { date })
						}
					}}

					monthFormat={'yyyy ' + "年  " + "M" + " 月"}
					style={{
						// borderWidth: 1,
						// borderColor: '#FFAE35',
						borderRadius: 24,
						width: WIDTH * 0.87,
						height: 400,
						padding: 12,
					}}
					// Specify theme properties to override specific styles for calendar parts. Default = {}
					theme={{
						'stylesheet.calendar.header': {
							monthText: {
								color: "#FFAE35",
								fontSize: 18,
								fontWeight: "bold"
							}
						},

						'stylesheet.calendar.basic': {
							todayText: {
								fontWeight: "bold"
							}
						},

						backgroundColor: useColorModeValue("light.primary", "dark.primary"),
						calendarBackground: account.misc.darkTheme? "#222" :"#fdf8ef", //
						textSectionTitleColor: '#606060',
						textSectionTitleDisabledColor: '#d9e1e8',
						selectedDayBackgroundColor: '#606060',
						selectedDayTextColor: '#ffffff',
						todayTextColor: account.misc.darkTheme? '#222' : "#fdf8ef", //
						dayTextColor: account.misc.darkTheme? '#eee' : "#606060", //
						textDisabledColor: '#FFAE35',
						dotColor: '#00adf5',
						selectedDotColor: '#ffffff',
						arrowColor: '#606060',
						disabledArrowColor: '#d9e1e8',
						indicatorColor: 'red',
						textDayFontWeight: '300',
						textMonthFontWeight: 'bold',
						textDayHeaderFontWeight: '300',
						textDayFontSize: 14,
						textMonthFontSize: 14,
						textDayHeaderFontSize: 14
					}}
				/>

				<HStack w={WIDTH} h={24} justifyContent={"flex-end"} px={WIDTH * .08} alignItems={"flex-end"}>

					<Box>
						<Button onPress={() => {
							navigation.navigate("DiaryView", {date : {
								dateString: dateString,
									day: new Date().getDate(),
									month: new Date().getMonth() + 1,
									year: new Date().getFullYear()

								}})
						}}
						        key={"msb3"} _pressed={{bg: "transparent"}}
						        zIndex={100} bg={"transparent"} w={18} h={18} borderRadius={100} borderWidth={1}
						        borderColor={useColorModeValue("light.darkgray", "#fff")}>
							<Feather name={"feather"} size={32} color={"#fff"}/>
						</Button>
						<Box key={"SHADE3"} position={"absolute"} bg={useColorModeValue("light.primary", "dark.primary")}
						     top={2} left={2} w={18} h={18} borderRadius={100} borderWidth={1}
						     borderColor={useColorModeValue("light.primary", "dark.primary")}/>
					</Box>

				</HStack>

			</Box>
		</SafeAreaView>

	)
}

export default MainScreen
