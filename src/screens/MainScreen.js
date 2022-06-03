import {Box, Button, Input, TextArea, TextField} from "native-base";
import {TextInput} from "react-native-web";

const MainScreen = () => {
	return(
		<Box safeArea alignItems="center" w="100%">
			<Input h={10} fontSize={14} my={2} placeholder="Input" w="75%" maxWidth="300px" />
			<Input h={10} fontSize={14} my={2} placeholder="Input" w="75%" maxWidth="300px" />
			<Button onPress={() => console.log("hello world")}>Click Me</Button>
		</Box>
	)
}

export default MainScreen
