import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/books/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedComponentForShowingNotification,
} from '../redux_stuff/connected_components';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class NotificationsScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/notifications/get-notifications',)
		.then((response) => {
			this.props.set_fetched_notifications(response.data)
		})
		.catch((error) => {
			console.log(error);
		})

	}

// RENDER METHOD
	render() {
			
		const total_notifications = this.props.total_notifications

		return (

			<View style={{backgroundColor: '#eee'}} >
				
	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			// data={total_notifications}
	  	  			data={[1,2,3,4,5,6,7,8,9,10]}
	  				renderItem={
	  					({ item }) => (
							<ConnectedComponentForShowingNotification
								dataPayloadFromParent = { item }
								navigation = {this.props.navigation} // for passing navigation controls
							/>
	  					)}
	  				keyExtractor={(item, index) => String(index)}
	  			/>

			</View>

		);
	}
}

NotificationsScreen.defaultProps = {
	// : ,
};


const styles = StyleSheet.create({
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},
	textinputContainer:{
		marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
	outerContainer: {
	},
	bigBlue: {
	},
});

export default NotificationsScreen