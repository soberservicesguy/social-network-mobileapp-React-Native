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
	ConnectedComponentForShowingFriend,
} from '../redux_stuff/connected_components';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class FriendsScreen extends Component {
	constructor(props) {
		super(props);
// STATE
		this.state = {
			showFriendsSuggestionsInstead: false, 
			showFriendsRequestInstead: false,
			showFriends: false,
		}
	}


	componentDidUpdate(prevProps, prevState, snapshot) {

		if (prevProps.route.params !== this.props.route.params){
			this.setUpScreen()
		}

	}


	setUpScreen(){

		let set_friends_suggestions_callback = (response) => this.props.set_friends_suggestions(response.data.friend_suggestions)
		let set_friends_list_callback = (response) => this.props.set_friends(response.data.friends_list)
		let set_friends_requests_callback = (response) => this.props.set_friends_requests(response.data.friends_requests)


		const parentNavigator = this.props.navigation.dangerouslyGetParent();

		if (typeof this.props.route.params === 'undefined'){

			console.log('payload_from_previous_screen 0')

			this.setState(prev => ({...prev, showFriendsSuggestionsInstead: false, showFriendsRequestInstead:true, showFriends:false }) )

			if (parentNavigator) {

                parentNavigator.setOptions({
                    title: "Friend Requests"
                });

            } else {

				this.props.navigation.setOptions({
					title: `Friend Requests`,
				})

            }

			axios.get(utils.baseUrl + '/users/friend-requests',)
			.then((response) => {
				if (response.data.success){
					// console.log('GOT FRIEND REQUESTS')
					// console.log(response.data.friends_requests)
					set_friends_requests_callback(response)

					// console.log('this.props.list_of_friend_requests')
					// console.log(this.props.list_of_friend_requests)

				}
			})
			.catch((error) => {
				console.log(error);
			})


		} else {

			let payload_from_previous_screen = this.props.route.params.payload


			console.log('payload_from_previous_screen 1')
			console.log(payload_from_previous_screen)

			// const payload_from_previous_screen = this.props.navigation

			if (payload_from_previous_screen === 'showFriendsSuggestionsInstead'){

				console.log('TRIGGERED 1')
				this.setState(prev => ({...prev, showFriendsSuggestionsInstead: true, showFriendsRequestInstead:false, showFriends:false }) )

				if (parentNavigator) {

	                parentNavigator.setOptions({
	                    title: "Friend Suggestions"
	                });

	            } else {

					this.props.navigation.setOptions({
						title: `Friends Suggestions`,
					})

	            }
				

				console.log('MAKING REQUEST')
				axios.get(utils.baseUrl + '/users/friend-suggestions',)
				.then((response) => {
					if (response.data.success){
						console.log('GOT FRIEND SUGGESTIONS')
						// console.log(response.data.friend_suggestions)
						set_friends_suggestions_callback(response)

						// console.log('this.props.list_of_friend_suggestions')
						// console.log(this.props.list_of_friend_suggestions)

					}
				})
				.catch((error) => {
					console.log(error);
				})


			} else if (payload_from_previous_screen === 'showFriendsRequestInstead') {

				console.log('payload_from_previous_screen 2')


				this.setState(prev => ({...prev, showFriendsSuggestionsInstead: false, showFriendsRequestInstead:true, showFriends:false }) )

				if (parentNavigator) {

	                parentNavigator.setOptions({
	                    title: "Friend Requests"
	                });

	            } else {

					this.props.navigation.setOptions({
						title: `Friend Requests`,
					})

	            }

				axios.get(utils.baseUrl + '/users/friend-requests',)
				.then((response) => {
					if (response.data.success){
						// console.log('GOT FRIEND REQUESTS')
						// console.log(response.data.friends_requests)
						set_friends_requests_callback(response)

						// console.log('this.props.list_of_friend_requests')
						// console.log(this.props.list_of_friend_requests)

					}
				})
				.catch((error) => {
					console.log(error);
				})

			} else if (payload_from_previous_screen === 'showFriends'){

				console.log('payload_from_previous_screen 3')
				console.log(payload_from_previous_screen)


				this.setState(prev => ({...prev, showFriendsSuggestionsInstead: false, showFriendsRequestInstead: false, showFriends: true }) )

				if (parentNavigator) {

	                parentNavigator.setOptions({
	                    title: "Friends"
	                });

	            } else {

					this.props.navigation.setOptions({
						title: `Friends`,
					})

	            }

				axios.get(utils.baseUrl + '/users/friends-list',)
				.then((response) => {
					if (response.data.success){				
						// console.log('GOT FRIEND LIST')
						// console.log(response.data.friends_list)
						set_friends_list_callback(response)

						// console.log('this.props.list_of_friends')
						// console.log(this.props.list_of_friends)

					}			})
				.catch((error) => {
					console.log(error);
				})

			}

		}


	}



// COMPONENT DID MOUNT
	componentDidMount() {
		this.setUpScreen()
	}

// RENDER METHOD
	render() {

		let data_to_use = []

		if (typeof this.props.route.params === 'undefined'){

			data_to_use = this.props.list_of_friend_requests
			// console.log('data_to_use list_of_friend_requests')
			// console.log(data_to_use)


		} else if (this.props.route.params.payload === 'showFriendsSuggestionsInstead'){

			data_to_use = this.props.list_of_friend_suggestions

		} else if (this.props.route.params.payload === 'showFriendsRequestInstead'){

			data_to_use = this.props.list_of_friend_requests

		} else if (this.props.route.params.payload === 'showFriends'){

			data_to_use = this.props.list_of_friends

		} else {

		}

		return (


			<View style={{backgroundColor: '#eee'}} >
				
	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			// data={(this.state.showFriendsSuggestionsInstead) ? friend_suggestions : friends}
	  	  			data={data_to_use}
	  				renderItem={
	  					({ item }) => (
							<ConnectedComponentForShowingFriend
								dataPayloadFromParent = { item }
								navigation = {this.props.navigation}
								showFriendsSuggestionsInstead = {this.state.showFriendsSuggestionsInstead}
								showFriendsRequestInstead = {this.state.showFriendsRequestInstead}
								showFriends = {this.state.showFriends}
							/>
	  					)}
	  				keyExtractor={(item, index) => String(index)}
	  			/>

			</View>

		);
	}
}

FriendsScreen.defaultProps = {
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

export default FriendsScreen