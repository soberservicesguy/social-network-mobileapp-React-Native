import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	Button,
	TouchableHighlight,
	FlatList,
	TextInput,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/pages/';

import DocumentPicker from 'react-native-document-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class AboutMe extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			cover_image: null,
			avatar_image: null,
			user_name_in_profile: null,
			user_brief_intro: null,
			user_about_me: null,
			user_working_zone: null,
			user_education: null,
			user_contact_details: null,
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// 		axios.get(utils.baseUrl + '/pages/pages-list-with-children',)
// 		.then((response) => {
// 			this.props.set_fetched_pages(response.data)
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		})


	}


// RENDER METHOD
	render() {
			

		return (
			<KeyboardAwareScrollView>
				<View style={styles.outerContainer}>

					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						marginBottom: 30,
						marginTop:30,
					}}>

						<Button 
							title={'Upload Cover Image'}
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
									this.setState(prev => ({...prev, cover_image: res}))

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
							title={'Upload Avatar Image'}
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
									this.setState(prev => ({...prev, avatar_image: res}))

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
							placeholder="Type your user_name_in_profile"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_name_in_profile: value})) }
						/>
				  	</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user_brief_intro"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_brief_intro: value})) }
						/>
				  	</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user_about_me"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_about_me: value})) }
						/>
				  	</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user_working_zone"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_working_zone: value})) }
						/>
				  	</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user_education"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_education: value})) }
						/>
				  	</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user_contact_details"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, user_contact_details: value})) }
						/>
				  	</View>

					<TouchableOpacity
						activeOpacity={0.2}
						style={styles.createPostButton}
						onPress={ () => {

							let setUserDetails = (response) => {
								this.props.set_user_name_in_profile(response.data.user_details.user_name_in_profile)
								this.props.set_user_avatar_image(response.data.user_details.user_avatar_image)
								this.props.set_user_cover_image(response.data.user_details.user_cover_image)
								this.props.set_user_name_in_profile(response.data.user_details.user_name_in_profile)
								this.props.set_user_brief_intro(response.data.user_details.user_brief_intro)
								this.props.set_user_about_me(response.data.user_details.user_about_me)
								this.props.set_user_working_zone(response.data.user_details.user_working_zone)
								this.props.set_user_education(response.data.user_details.user_education)
								this.props.set_user_contact_details(response.data.user_details.user_contact_details)
							}
							
							let redirectToWall = () => this.props.navigation.navigate('SocialPost', {itemId: 86, otherParam: 'anything you want here',})

							let formData = new FormData()


							if (this.state.user_name_in_profile !== ''){
								formData.append('user_name_in_profile', this.state.user_name_in_profile)
							}
							if (this.state.user_brief_intro !== ''){
								formData.append('user_brief_intro', this.state.user_brief_intro)
							}
							if (this.state.user_about_me !== ''){
								formData.append('user_about_me', this.state.user_about_me)
							}
							if (this.state.user_working_zone !== ''){
								formData.append('user_working_zone', this.state.user_working_zone)
							}
							if (this.state.user_education !== ''){
								formData.append('user_education', this.state.user_education)
							}
							if (this.state.user_contact_details !== ''){
								formData.append('user_contact_details', this.state.user_contact_details)
							}

							if (this.state.image_upload !== null){
								formData.append('avatar_image', {uri: this.state.avatar_image.uri, name: this.state.avatar_image.name, type: this.state.avatar_image.type})
							}
							if (this.state.video_upload !== null){
								formData.append('cover_image', {uri: this.state.cover_image.uri, name: this.state.cover_image.name, type: this.state.cover_image.type})
							}

							if (this.state.cover_image !== null && this.state.avatar_image !== null){

								axios.post(utils.baseUrl + '/users/update-settings', formData)
								.then(function (response) {
									if (response.data.success){

										// console.log(response.data) // current socialpost screen data
										
										// set to current parent object
										setUserDetails(response)

										// change route to current_socialpost
										redirectToWall()

									}

								})
								.catch(function (error) {
									console.log(error)
								});						

							}

						}}
					>
						<Text style={styles.innerText}>
							Update About Me
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

AboutMe.defaultProps = {
	// : ,
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
		color:'black',
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
		// position:'absolute',
		// top:windowHeight * 0.073,
		// right: windowWidth * 0.06,
		marginTop:50,
		alignSelf: 'center',
		justifyContent: 'center',
		width: windowWidth * 0.5,
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

export default AboutMe
