import React, { Component } from 'react';
import { 
	TouchableOpacity,
	TextInput,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';

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

				  	<TouchableOpacity 
				  		activeOpacity={0.2} 
				  		style={styles.buttonWithoutBG}
						onPress={ () => {
							let setResponseInCurrentSocialpost = (arg) => this.props.set_current_socialpost(arg)
							let redirectToNewSocialpost = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	
							let increase_share_quantity = () => this.props.add_shares_quantity()


							axios.post(utils.baseUrl + '/socialposts/create-share-for-socialpost', 
								{
									socialpost_endpoint: this.props.parentDetailsPayload.endpoint,
								})
							.then(function (response) {
								console.log(response.data) // current socialpost screen data
								
								// set to current parent object
								setResponseInCurrentSocialpost(response.data)

								increase_share_quantity()
								// change route to current_socialpost	
								// redirectToNewSocialpost()							

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>			
						<Icon
							name={utils.shareIcon}
							type='font-awesome'
							color='#f50'
							size={30}
							// reverse={true}
						/>
					</TouchableOpacity>
				</View>
			);
		}
	}
}
	
CreateShareForSocialpost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		width:windowWidth * 0.15,
		height: windowHeight * 0.05,
		// backgroundColor: 'grey',
		// position:'absolute',
		// bottom:windowHeight * 0.08,
		// left:windowWidth * 0.82,
	},
});

export default CreateShareForSocialpost