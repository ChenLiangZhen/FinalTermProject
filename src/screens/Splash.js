import {useEffect, useRef} from "react";
import {Button, View} from "native-base";
import LottieView from "lottie-react-native"
import {StyleSheet} from "react-native";
import {useState} from "react";
import {config, useSpring, animated} from "@react-spring/native";

export default function Splash({navigation}) {

	const animation = useRef(null);

	const [present, setPresent] = useState(false)

	const splash = useSpring({

		justifyContent: "center",
		alignItems: "center",
		left: present? -8 : 56,
		config: config.wobbly,

		delay: 1350
	})

	useEffect(() => {

		setPresent(true)

	}, []);

	return (
		<View style={styles.animationContainer}>

			<animated.View style={splash}>

				<LottieView

					loop={false}
					autoPlay
					ref={animation}
					speed={1}
					style={{
						width: 50,
						height: 50,
						backgroundColor: 'transparent',
					}}
					// Find more Lottie files at https://lottiefiles.com/featured
					source={require('../animation_l43afc6r.json')}
					onAnimationFinish={async()=> {
						await new Promise(resolve => setTimeout(resolve, 100));
						navigation.navigate("Welcome")
					}}
				/>

			</animated.View>

		</View>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: '#ffae35',
		paddingBottom: 64,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
