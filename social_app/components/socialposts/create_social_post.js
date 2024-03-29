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
			post_text: '',
			image_upload: '',
			video_upload: '',
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

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
										'video/mpeg-4',
										'video/mp4',
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
						value={this.state.post_text}
						// autoFocus=true
						onChangeText={ (value) => this.setState( prev => ({...prev, post_text: value})) }
					/>
			  	</View>


				<TouchableOpacity
					activeOpacity={0.2}
					style={styles.createPostButton}
					onPress={ () => {

						let setResponseInCurrentSocialPost = (arg) => this.props.set_current_socialpost(arg)
						let redirectToNewSocialPost = () => this.props.navigation.navigate('Individual_SocialPost'/*, {itemId: 86, otherParam: 'anything you want here',}*/)
						let clearInput = () => this.setState( prev => ({...prev, post_text: '', image_upload: '', video_upload: ''}))
						let user_name_in_profile = this.props.user_name_in_profile
						let formData = new FormData()

						// let currentSocialPost = this.props.current_socialpost
						if (this.state.post_text !== ''){
							formData.append('post_text', this.state.post_text)
						}
						if (this.state.image_upload !== ''){
							formData.append('social_post_image', this.state.image_upload, this.state.image_upload.name)
						}
						if (this.state.video_upload !== ''){
							formData.append('social_post_video', {uri: this.state.video_upload.uri, type: this.state.video_upload.type, name: this.state.video_upload.name})
						}

						axios.post(utils.baseUrl + '/socialposts/create-socialpost-with-user', formData)
						.then(function (response) {
							clearInput()
							
							// set to current parent object
							setResponseInCurrentSocialPost({...response.data.new_socialpost, friends_user_name: user_name_in_profile, notification_type: 'created_post'})
							// setResponseInCurrentSocialPost(response.data.new_socialpost)
							// console.log({current_socialpost})
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
		// width: '90%',
		// backgroundColor: '#000000',
		// marginTop:10,
		textAlign:'left',
		borderWidth:1,
		borderStyle:'solid',
		// paddingTop:17,
		// paddingBottom:17,
		fontSize:18,
		borderRadius:50,
		borderColor:utils.maroonColor,
		// backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.1,
		paddingRight:windowWidth * 0.25,
		fontWeight: 'bold',
		opacity: 0.5,
	},

	createPostButton:{
		// flex:1,
		position:'absolute',
		top:windowHeight * 0.064,
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
		textAlign:'center',
		color:'white',
		// fontWeight:'bold'
	},
});

export default CreateSocialPost