import {Dimensions} from "react-native";

export const WIDTH = Dimensions.get("window").width
export const HEIGHT = Dimensions.get("window").height

export const face = {
	outlined : {
		smile : require("./res/outlined/emoji_smile.png"),
		neutral : require("./res/outlined/emoji_neutral.png"),
		sad : require("./res/outlined/emoji_sad.png"),
		angry : require("./res/outlined/emoji_angry.png")
	},

	filled : {
		smile : require("./res/filled/emoji_smile.png"),
		neutral: require("./res/filled/emoji_neutral.png"),
		sad :require("./res/filled/emoji_sad.png"),
		angry : require("./res/filled/emoji_angry.png"),
	}
}

export const tongo = require("./res/tongo.png")
