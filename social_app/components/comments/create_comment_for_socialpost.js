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


class CreateCommentForSocialpost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			text: '',
			// commenting_timestamp: '',
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return(
			<View style={styles.outerContainer}>
			  	<View style={styles.textinputContainer}>
					<TextInput
						style={styles.textinput}
						placeholder="Type your comment"
						placeholderTextColor = {utils.lightGrey}
						// maxLength=10
						// caretHidden=true
						// multiline=true
						// numberOfLines=3
						// onChangeText={ () => null }
						// value='dummy'
						// autoFocus=true
						value={this.state.post_text}
						onChangeText={ (value) => this.setState( prev => ({...prev, text: value})) }
					/>
			  	</View>


			  	<TouchableOpacity 
			  		activeOpacity={0.2} 
			  		style={styles.createComment}
					onPress={ () => {
						let setResponseInCurrentSocialpost = (arg) => this.props.set_current_socialpost(arg)
						let redirectToNewSocialpost = () => this.props.navigation.navigate('Individual_SocialPost', {itemId: 86, otherParam: 'anything you want here',})
						let increase_comment_quantity = () => this.props.add_comments_quantity()
						let clearTextInput = () => this.setState( prev => ({...prev, text: null}))

						// first create child object
						axios.post(utils.baseUrl + '/socialposts/create-comment-for-socialpost', 
							{
								comment_text: this.state.text,
								socialpost_endpoint: this.props.parentDetailsPayload.endpoint,
							})
						.then(function (response) {
							
							// set to current parent object
							setResponseInCurrentSocialpost(response.data)

							increase_comment_quantity()
							clearTextInput()
							
							// change route to current_image	
							// redirectToNewSocialpost()							

						})
						.catch(function (error) {
							console.log(error)
						});						

					}}
		  		>
			  		<Text style={styles.innerText}>
						Post It
			  		</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
	
CreateCommentForSocialpost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		height: windowHeight * 0.08,
		// backgroundColor: '#000000',
		alignItems: 'center',
		// flexDirection:'row',
	},


// text inputs
	textinputContainer:{
		paddingTop:0,
		marginTop:0,	
		// backgroundColor: '#000000',
		width: '90%',
		// flex:1,
		height: windowHeight * 0.07
		// marginBottom: windowHeight * 0.005,
	},
// icon container
	iconContainer:{
		position: 'relative',
		bottom: windowHeight * 0.065,
		right: windowWidth * 0.35,
	},
	textinput:{
		// backgroundColor: '#000000',
		// marginTop:10,
		textAlign:'left',
		borderWidth:1,
		borderStyle:'solid',
		// paddingTop:17,
		// paddingBottom:17,
		fontSize:18,
		borderRadius:50,
		borderColor:utils.dimWhite,
		// backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.5,
	},

// create comment button
	createComment:{
		// flex:1,
		position:'absolute',
		top:windowHeight * 0.007,
		right: windowWidth * 0.06,
		width: windowWidth * 0.21,
		height: windowHeight * 0.055,
		// alignItems: 'center',
		// justifyContent: 'center',
		// alignSelf:'center',
		backgroundColor: utils.maroonColor,
		borderRadius: windowWidth * 1/2
	},
	innerText:{
		paddingTop: 10,
		textAlign:'center',
		color:'white',
	},
});

export default CreateCommentForSocialpost