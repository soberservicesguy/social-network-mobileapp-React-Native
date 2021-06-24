import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
	SafeAreaView,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/sports/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedSportCard,
	ConnectedCreateSport,
} from '../redux_stuff/connected_components';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SportScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/sports/sports-list-with-children',)
		.then((response) => {
			this.props.set_fetched_sports(response.data)
		})
		.catch((error) => {
			console.log(error);
		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/sports/sports-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_sport(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_sports = this.props.total_sports

		return (

			<KeyboardAwareScrollView>
				<SafeAreaView>
				
		  	  		<FlatList
		  				style={{flexDirection: 'column', flexWrap : "wrap"}}
		  				numColumns={1}
		  	  			data={total_sports}
		  				renderItem={
		  					({ item }) => (
								<ConnectedSportCard
									dataPayloadFromParent = { item }
									likes_quantity = {item.total_likes}
									likes = { item.likes || [] }						
								/>
		  					)}
		  				keyExtractor={(item, index) => String(index)}
		  			/>


					<View>
			  			<ConnectedCreateSport/>
			  		</View>

				</SafeAreaView>
			</KeyboardAwareScrollView>

		);
	}
}

SportScreen.defaultProps = {
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


export default SportScreen