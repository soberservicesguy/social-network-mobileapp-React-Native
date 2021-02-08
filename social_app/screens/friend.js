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
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		const payload_from_previous_screen = this.props.navigation

		if (payload_from_previous_screen.showFriendsSuggestionsInstead){

			this.setState(prev => ({...prev, showFriendsSuggestionsInstead: true }) )
			
			this.props.navigation.setOptions({
				title: `Friends Suggestions`,
			})


			axios.get(utils.baseUrl + '/books/books-list-with-children',)
			.then((response) => {
				this.props.set_fetched_books(response.data)
			})
			.catch((error) => {
				console.log(error);
			})


		} else {

			this.setState(prev => ({...prev, showFriendsSuggestionsInstead: false }) )

			this.props.navigation.setOptions({
				title: `Friends`,
			})

			axios.get(utils.baseUrl + '/books/books-list-with-children',)
			.then((response) => {
				this.props.set_fetched_books(response.data)
			})
			.catch((error) => {
				console.log(error);
			})

		}


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/books/books-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_book(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const friends = this.props.friends
		const friend_suggestions = this.props.friend_suggestions
		const payload_from_previous_screen = this.props.navigation

		console.log(payload_from_previous_screen)

		return (


			<View style={{backgroundColor: '#eee'}} >
				
	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			// data={(this.state.showFriendsSuggestionsInstead) ? friend_suggestions : friends}
	  	  			data={[1,2,3,4,5,6,7,8,9,10]}
	  				renderItem={
	  					({ item }) => (
							<ConnectedComponentForShowingFriend
								dataPayloadFromParent = { item }
								navigation = {this.props.navigation}
								showFriendsSuggestionsInstead = {this.state.showFriendsSuggestionsInstead}
								// showFriendsSuggestionsInstead = {true}
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