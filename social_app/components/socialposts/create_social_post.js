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
						justifyContent: 'space-around',
					}}>

						<Button 
							title={'Upload Image'}
							style={styles.buttonWithoutBG}
							color={utils.mediumGrey}
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
							title={'Upload Video'}
							style={styles.buttonWithoutBG}
							color={utils.mediumGrey}
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


					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your post_text"
							placeholderTextColor = {utils.mediumGrey}
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
						style={styles.createPostButton}
						onPress={ () => {

							let setResponseInCurrentSocialPost = (arg) => this.props.set_current_socialpost(arg)
							let redirectToNewSocialPost = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							let formData = new FormData()


							if (this.state.post_text !== ''){
								formData.append('post_text', this.state.post_text)
							}
							if (this.state.image_upload !== ''){
								formData.append('image_upload', this.state.image_upload, this.state.image_upload.name)
							}
							if (this.state.video_upload !== ''){
								formData.append('video_upload', {uri: this.state.video_upload.uri, type: this.state.video_upload.type, name: this.state.video_upload.name})
							}

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
						<Text style={styles.innerText}>
							Create SocialPost
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
	textinputContainer:{
		paddingTop:0,
		marginTop:10,	
		// backgroundColor: '#000000',
		width: '90%',
		alignSelf:'center',
		// flex:1,
		height: windowHeight * 0.07
		// marginBottom: windowHeight * 0.005,
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
		borderColor:utils.mediumGrey,
		// backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.5,
	},

	createPostButton:{
		// flex:1,
		position:'absolute',
		top:windowHeight * 0.073,
		right: windowWidth * 0.06,
		width: windowWidth * 0.21,
		height: windowHeight * 0.055,
		// alignItems: 'center',
		// justifyContent: 'center',
		// alignSelf:'center',
		backgroundColor: 'black',
		borderRadius: windowWidth * 1/2
	},
	innerText:{
		textAlign:'center',
		color:'white',
		// fontWeight:'bold'
	},
});

export default CreateSocialPost