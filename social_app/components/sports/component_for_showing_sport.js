import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingSport extends Component {
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
		var base64Image = "data:image/jpeg;base64," + data.sport_image


		return (
			<View style={styles.outerContainer}>
				<View style={styles.sportNameContainer}>
					<Text style={styles.sportNameText}>
						Sport name { data.sport_name }
					</Text>
				</View>

				<View style={styles.imageContainer}>
					<Image 
						source={utils.image}
						// source={{uri: base64Image}} 
						style={styles.imageStyle}
					/>
				</View>

				<View style={styles.sportDescriptionContainer}>
					<Text style={styles.sportDescriptionText}>
						Sport description { data.sport_description }
					</Text>
				</View>
			</View>
		);
	}
}
	
ComponentForShowingSport.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		alignItems:'center',
		justifyContent: 'center',
	},


	imageStyle:{
		alignSelf:'center',
		resizeMode: "stretch",
		height: windowHeight * 0.25,
		width: windowWidth * 0.5,
		borderRadius: windowWidth * 0.5
		// border
	},

	imageContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.3, // or 100
		width: windowWidth,
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	sportNameContainer:{
		height:windowHeight * 0.05,
		marginTop:10,
	},
	sportNameText:{
		textAlign:'center',
		fontSize:20,
		fontWeight: 'bold',
		color:utils.mediumGrey
	},
	sportDescriptionContainer:{
		marginTop:10,
		height:windowHeight * 0.15,
		width: windowWidth,
	},
	sportDescriptionText:{
		fontSize:15,
		textAlign:'left'
	},
});

export default ComponentForShowingSport