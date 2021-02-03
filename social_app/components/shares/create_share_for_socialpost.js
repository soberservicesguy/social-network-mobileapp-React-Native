import React, { Component } from 'react';
import { 
	TouchableOpacity,
	TextInput,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class CreateShareForSocialpost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			switchScreen: false,
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Individual-Socialpost', {
				itemId: 86,
				otherParam: 'anything you want here',
			})

		} else {

		return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object

				<View style={styles.outerContainer}>

					<Button 
						title={'Press To Create Share'}
						style={styles.buttonWithoutBG}
						onPress={ () => {
							let setResponseInCurrentSocialpost = (arg) => this.props.set_current_socialpost(arg)
							let redirectToNewSocialpost = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							axios.post(utils.baseUrl + '/socialposts/create-share-for-socialpost', 
								{
									sport_endpoint: this.props.parentDetailsPayload.endpoint,
								})
							.then(function (response) {
								console.log(response.data) // current socialpost screen data
								
								// set to current parent object
								setResponseInCurrentSocialpost(response.data)

								// change route to current_socialpost	
								redirectToNewSocialpost()							

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					/>
				</View>
			);
		}
	}
}
	
CreateShareForSocialpost.defaultProps = {

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

export default CreateShareForSocialpost