import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingBook extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		let data = {}
		var base64Image = "data:image/jpeg;base64," + data.book_image

		return (
			<View style={styles.outerContainer}>
				<View style={styles.bookTitleContainer}>
					<Text style={styles.bookTitleText}>
						Book name { data.book_name }
					</Text>
				</View>

				<View style={styles.imageContainer}>
					<Image 
						source={utils.image}
						// source={{uri: base64Image}} 
						style={styles.imageStyle}
					/>
				</View>

				<View style={styles.bookDescriptionContainer}>
					<Text style={styles.bookDescriptionText}>
						Book description { data.book_description }
					</Text>
				</View>
			</View>
		);
	}
}
	
ComponentForShowingBook.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		alignItems:'center',
		justifyContent: 'center',
	},


	imageStyle:{
		alignSelf:'center',
		resizeMode: "stretch",
		height: '100%',
		width: '45%',
	},

	imageContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.3, // or 100
		width: windowWidth,
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	bookTitleContainer:{
		height:windowHeight * 0.05,
		marginTop:10,
	},
	bookTitleText:{
		textAlign:'center',
		fontSize:20,
		fontWeight: 'bold',
		color:utils.mediumGrey
	},
	bookDescriptionContainer:{
		marginTop:10,
		height:windowHeight * 0.15,
		width: windowWidth,
	},
	bookDescriptionText:{
		fontSize:15,
		textAlign:'left'
	},
});

export default ComponentForShowingBook