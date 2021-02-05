import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import utils from "../../utilities";

import DocumentPicker from 'react-native-document-picker';


class CreateSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,
			post_text: '',
			image_upload: '',
			video_upload: '',
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

					<View style={{
						display: 'flex',
						flexDirection: 'row',
					}}>

						<Button 
							title={'Select Post Image'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									let res = await DocumentPicker.pick({
										type: [
											DocumentPicker.types.images,
										],
									});
									console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// setState method with response as argument
									this.setState(prev => ({...prev, image_upload: res}))

								} catch (err) {
									if (DocumentPicker.isCancel(err)) {
										// User cancelled the picker, exit any dialogs or menus and move on
									} else {
										console.log(err)
										// throw err;
									}
								}
							}}
						/>
						<Button 
							title={'Select Post Video'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									let res = await DocumentPicker.pick({
										type: [
											'video/3gpp',
											'video/mpeg',
											'video/x-msvideo', // go to for all mimetypes https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
										],
									});
									console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// setState method with response as argument
									this.setState(prev => ({...prev, video_upload: res}))

								} catch (err) {
									if (DocumentPicker.isCancel(err)) {
										// User cancelled the picker, exit any dialogs or menus and move on
									} else {
										console.log(err)
										// throw err;
									}
								}
							}}
						/>

				  	</View>


					<View style={{
						display: 'flex',
						flexDirection: 'row',
					}}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your post_text"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, post_text: value})) }
						/>
				  	</View>


					<TouchableOpacity
						activeOpacity={0.2}
						style={styles.bottomButton}
						onPress={ () => {

							let setResponseInCurrentSocialPost = (arg) => this.props.set_current_socialpost(arg)
							let redirectToNewSocialPost = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							const formData = new FormData()

							formData.append('post_text', this.state.post_text)
							formData.append('image_upload', this.state.image_upload, this.state.image_upload.name)
							formData.append('video_upload', {uri: this.state.video_upload.uri, type: this.state.video_upload.type, name: this.state.video_upload.name})

							axios.post(utils.baseUrl + '/socialposts/create-socialpost-with-user', formData)
							.then(function (response) {
								console.log(response.data) // current socialpost screen data
								
								// set to current parent object
								setResponseInCurrentSocialPost(response.data)

								// change route to current_socialpost
								redirectToNewSocialPost()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>
						<Text style={styles.buttonText}>
							Press To Create SocialPost
						</Text>
					</TouchableOpacity>
				</View>
			);
		}			
	}
}
	
CreateSocialPost.defaultProps = {

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
});

export default CreateSocialPost