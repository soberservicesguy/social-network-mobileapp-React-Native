import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
	Image,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Icon } from 'react-native-elements';

import utils from "../utilities";


class ComponentForShowingFriend extends Component {
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

		let data = this.props.dataPayloadFromParent
		let base64Image = "data:image/jpeg;base64," + data.user_avatar_image

		return (

		  	<TouchableOpacity 
		  		activeOpacity={0.2}
		  		style={styles.outerContainer} 
		  		onPress={ () => this.props.navigation.navigate('SocialPost', {endpoint: data.endpoint}) } 
	  		>

				<View style={styles.imageContainer}>
					<Image 
						source={utils.image}
						// source={{uri: base64Image}} 
						style={styles.imageStyle}
					/>
				</View>

		  	</TouchableOpacity>

		);
	}
}

ComponentForShowingFriend.defaultProps = {
};

const styles = StyleSheet.create({
// button
	outerContainer:{
		// flexDirection:'row',
		justifyContent: 'center',
		alignItems:'center',
		height: windowHeight * 0.14,
		width: windowWidth,
		// backgroundColor: '#000000',
		marginTop:windowHeight * 0.01,
		marginBottom:windowHeight * 0.01,
		borderBottomWidth: 1,
		borderBottomColor: utils.dimWhite,

	},

	innerContainer:{
		width: windowWidth * 0.9,
		alignSelf:'center',
		flexDirection: 'row',
		// backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems:'center', 
	},


// image
	imageContainer:{
		height: '100%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
		flex:1,
	},
	imageStyle:{
		resizeMode: "stretch",
		height: windowHeight * 0.1,
		width: windowWidth * 0.2,
		borderRadius: windowWidth * 1/2,
	},

// text
	textContainer:{
		flex:3,
		marginLeft:windowWidth * 0.1,
		alignSelf:'center',
		alignItems:'flex-start',
		justifyContent: 'center', 
		// backgroundColor: '#000000',

	},
	nameText:{
		fontSize:20,
		fontWeight:'bold',
	},
	activityText:{
		fontSize:15,
		fontStyle: 'italic', 
		color:utils.darkBlue
	},
	newFriendsName:{
		fontSize:20,
		fontStyle: 'italic', 
		color:utils.orange
	},
// icon
	iconContainer:{
		flex:1,
		// backgroundColor: '#000000'
	}

});

export default ComponentForShowingFriend