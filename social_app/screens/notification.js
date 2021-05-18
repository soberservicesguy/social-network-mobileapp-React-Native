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

	getNotifications(){

		let backend_requests_made = this.state.backend_requests_made
		let setNoMoreNotificationsCallback = () => this.setState(prev => ({...prev, no_more_notifications_from_backend: true }))
		let set_fetched_notifications_callback = (response) => this.props.set_fetched_notifications(response.data)
		let set_state_for_requests_made = () => {
			this.setState(prev => ({...prev, 
				backend_requests_made: prev.backend_requests_made + 1,
			}));
		}


		axios.get(utils.baseUrl + '/socialposts/get-notifications-from-friends',
		{
		    params: {
				request_number: backend_requests_made,
		    }
		})
		.then((response) => {
			if(response.data.length === 0){

				// console.log('no more notifications to show')
				set_fetched_notifications_callback([])
				set_fetched_notifications_callback({data:[{message:'no more notifications'}]})
				setNoMoreNotificationsCallback()

			} else {

				// console.log('Notifications recieved')
				// console.log(response.data.length)
				set_fetched_notifications_callback(response)
				// append_fetched_notifications_callback(response)
				set_state_for_requests_made()

			}

		})
		.catch((error) => {
			console.log(error);
		})

	}

	componentDidMount() {
		this.getNotifications()
	}

// RENDER METHOD
	render() {
			
		const total_notifications = this.props.notifications_list

		return (

			<View style={{backgroundColor: '#eee'}} >
				
	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			data={total_notifications}
	  	  			// data={[1,2,3,4,5,6,7,8,9,10]}
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