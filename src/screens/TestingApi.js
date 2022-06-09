import {Box, Button, HStack, Input, ScrollView, Spinner, Text} from "native-base";
import {signApi} from "../apis/api";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAccount, setAccountInfo} from "../globalstate/accountSlice";
import {getToken, saveToken} from "../apis/credentialManager";
import {apiRequest} from "../apis/apiManager";

const TestingApi = () => {

	const [statusCode, setStatusCode] = useState("")

	const [inputEmail, setInputEmail] = useState('')
	const [inputNickname, setInputNickname] = useState('')
	const [inputPassword, setInputPassword] = useState('')

	const [userData, setUserData] = useState("")

	const dispatch = useDispatch()
	const account = useSelector(selectAccount)

	const [userInfo, setUserInfo] = useState(account.info)
	const [token, setToken] = useState(getToken())

	useEffect(() => {
		setUserInfo(account.info)
	}, [account])

	return (

		<Box safeArea w="100%">
			<ScrollView w={"100%"} _contentContainerStyle={{
				alignItems: "center"
			}}>
				<Input h={8} fontSize={14} my={1} placeholder="Input" w="75%" maxWidth="300px"
				       autoCapitalize={"none"}
				       value={inputNickname}
				       onChangeText={(nickname) => {
					       setInputNickname(nickname)
				       }}/>

				<Input h={8} fontSize={14} my={1} placeholder="Input" w="75%" maxWidth="300px"
				       autoCapitalize={"none"}
				       value={inputEmail}
				       onChangeText={(email) => {
					       setInputEmail(email)
				       }}/>

				<Input h={8} fontSize={14} my={1} placeholder="Input" w="75%" maxWidth="300px"
				       autoCapitalize={"none"}
				       value={inputPassword}
				       onChangeText={(password) => {
					       setInputPassword(password)
				       }}/>

				<HStack 	mb={6}
				>
					<Button
						onPress={() => {
							signApi.post("/api/signup", {
								"nickname": inputNickname,
								"email": inputEmail,
								"password": inputPassword
							})
								.then(res => {
									console.log(res)
								}, rej => {
									console.log(rej)
								})
						}}>SignUp</Button>
				</HStack>


				<Input h={8} fontSize={14} my={1} placeholder="Input" w="75%" maxWidth="300px" autoCapitalize={"none"}
				       autoCapitalize={"none"}
				       value={inputEmail}
				       onChangeText={(email) => {
					       setInputEmail(email)
				       }}/>

				<Input h={8} fontSize={14} my={1} placeholder="Input" w="75%" maxWidth="300px"
				       autoCapitalize={"none"}
				       value={inputPassword}
				       onChangeText={(password) => {
					       setInputPassword(password)
				       }}/>

				<Button
					mb={8}
					onPress={() => {
						signApi.post("/api/signin", {
							"email": inputEmail,
							"password": inputPassword
						})
							.then(res => {
								saveToken(res.data.token)
									.then(res => {
										console.log("Token successfully saved to SecureStore.")
									}, rej => {
										console.log("Token save failed.")
									})
								dispatch(setAccountInfo({...userInfo, userLink: res.data.userData.userLink}))
							}, rej => {
								// console.log(rej)
							})
					}}>SignIn</Button>

				<Text>{userInfo.userLink}</Text>


				<Input h={8} fontSize={14} my={2} placeholder="Input" w="75%" maxWidth="300px"
				       autoCapitalize={"none"}
				       value={inputPassword}
				       onChangeText={(password) => {
					       setInputPassword(password)
				       }}/>

				<Button onPress={() => {

					apiRequest("get", "/api/get-data", {
						params: {
							id : "629a23975f2c9bdc4ff87a67"
						}
					}).then(res=> {
						console.log(res)
					})

				}}>SendData</Button>

				<Button onPress={() => {

					apiRequest("put", "/api/update-data", {

						userLink: account.info.userLink,
						data: {
							meeting: "afternoon"
						}
					}).then(res=> {
						console.log(res)
					})


				}}>SendData</Button>
			</ScrollView>
		</Box>
	)
}

export default TestingApi
