import React, {Component} from 'react';
// IMPORT classes to use
import { 
	PermissionsAndroid,
	ImageBackground,
	View,
	StyleSheet, 
	Button,
	Text,
	TouchableOpacity,
	TextInput,
	// TouchableHighlight,
} from "react-native";

// IMPORT connected components
// import {ConnectedSomeComponent} from "../redux_stuff/connected_components";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon } from 'react-native-elements';
import axios from 'axios';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import utils from "../utilities";

import { verify_privilege } from "../handy_functions/"

import { Picker } from '@react-native-picker/picker';

import DocumentPicker from 'react-native-document-picker';


class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

			user_name: '',
			phone_number: '',
			password:'',
			user_image: '',

			privileges_selected:'',

			switchScreen: false,

		}
	}

	componentDidMount(){
	}


	signup_and_get_privileges(){
		// upload file with axios request
		const formData = new FormData()
		formData.append('user_name', this.state.user_name)
		formData.append('password', this.state.password)
		formData.append('phone_number', this.state.phone_number)
		formData.append('privileges_selected', this.state.privileges_selected)
		formData.append('category', 'avatar')
		formData.append('avatar_image', {uri: this.state.user_image.uri, name: this.state.user_image.name, type: this.state.user_image.type})


		axios.post(utils.baseUrl + '/users/signup-and-get-privileges', formData, {
			onUploadProgress: progressEvent => {
				console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
			}
		})
		.then(function (response) {
			console.log(`POST rest call response is${JSON.stringify(response.data, null, 1)}`);
			if (response.data.success === true){
				// console.log('yes')
			}

			return response
		})
		.then((response) => {
			if (response.data.success === true){

			// REDIRECT TO LOGIN
				this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			} else {
				console.log('user sign up failed, try again')
			}
		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	render() {

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Login', {
				itemId: 86,
				otherParam: 'anything you want here',
			})
			// const payload_from_previous_screen = this.props.navigation.route.params 

		} else {

			return(
				<ImageBackground source={utils.secondScreenBG} style={styles.bgImage}>
					<View style={styles.screenContainer}>
						<Text style={{
							...styles.topHeading,
							marginTop: windowHeight * 0.1
						}}>
							CREATE ACCOUNT
						</Text>

						<View style={{
							...styles.textinputContainer, 
							marginTop:windowHeight * 0.1
						}}>
							<TextInput
								style={styles.textinput}
								placeholder="Username"
								placeholderTextColor ={utils.dimWhite}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) =>  this.setState(prev => ({...prev, user_name: value})) }
							/>
							<View style={styles.iconContainer}>
								<Icon
								  // raised
								  name={utils.userIcon}
								  type='font-awesome'
								  iconStyle='Outlined'
								  color={utils.mediumGrey}
								  size={30}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
							</View>
						</View>

						<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder="Phone number"
								placeholderTextColor = {utils.dimWhite}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) =>  this.setState(prev => ({...prev, phone_number: value})) }
							/>
							<View style={styles.iconContainer}>
								<Icon
								  // raised
								  name={utils.userIcon}
								  type='font-awesome'
								  iconStyle='Outlined'
								  color={utils.mediumGrey}
								  size={30}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
							</View>
						</View>

						<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder="Password"
								placeholderTextColor = {utils.dimWhite}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) =>  this.setState(prev => ({...prev, password: value})) }
							/>
							<View style={styles.iconContainer}>
								<Icon
								  // raised
								  name={utils.userIcon}
								  type='font-awesome'
								  iconStyle='Outlined'
								  color={utils.mediumGrey}
								  size={30}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
							</View>
						</View>


						<View style={{marginTop:20}}>
							<Button 
								title={'Select Avatar'}
								color={utils.lightGrey}
								onPress={async () => {
									try {
										let res = await DocumentPicker.pick({
											type: [
												DocumentPicker.types.images,
											],
										});
										console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
										// setState method with response as argument
										this.setState(prev => ({...prev, user_image: res}))

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

						<View style={{marginTop: 30,}}>
							<Text style={{fontSize:20, textAlign:'center'}}>
								Select Privileges To Use
							</Text>

							<Picker
								selectedValue={this.state.privileges_selected}
								style={{height: 50, width: windowWidth * 0.9}}
								onValueChange={(itemValue, itemIndex) => {

									// console logging selected file from menu
									console.log(itemValue) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, privileges_selected: itemValue}))

								}}
							>
								<Picker.Item label="None" value={null} />
								<Picker.Item label="Basic (surfing and ordering products)" value="Basic" />
								<Picker.Item label="Uploading Products" value="Products control" />
								<Picker.Item label="Uploading Blogposts" value="Blogposts control" />
								<Picker.Item label="All Privileges" value="Total control" />
							</Picker>
						</View>

						<View style={{
							...styles.buttonContainer,
							// marginTop:windowHeight * 0.03
						}}>
							<TouchableOpacity activeOpacity={0.2} onPress={() => {}} style={styles.roundButton}>
								<Text style={styles.innerText}>
									Continue
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.bottomButton}>
							<TouchableOpacity activeOpacity={0.2} onPress={() => {}} style={styles.buttonWithoutBG}>
								<Text style={styles.bottomButtonText}>
									Terms & Conditions
								</Text>
							</TouchableOpacity>
						</View>
					
					</View>
			</ImageBackground>
			);
		}
	}
}

const styles = StyleSheet.create({
	screenContainer:{
		alignItems:'center',
		flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-between', 
		// backgroundColor: '#ffffff',
	},
	bgImage:{
		resizeMode: "stretch",
		height: windowHeight,
		width: windowWidth,
	},


// CREATE ACCOUNT 
	topHeading:{
		fontSize: 20,
		fontWeight: 'bold',
		height: windowHeight * 0.05,
		color: 'white',
		// backgroundColor: '#000000',
		// alignSelf: 'center',
	},

// text inputs
	textinputContainer:{
		paddingTop:0,
		marginTop:0,	
		// backgroundColor: '#000000',
		width: '90%',
		height: windowHeight * 0.1,
		marginBottom: windowHeight * 0.01,
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
		paddingTop:17,
		paddingBottom:17,
		fontSize:18,
		borderRadius:50,
		borderColor:utils.darkGrey,
		backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.5,
	},

// roundbutotn
	buttonContainer:{
		justifyContent: 'center',
		alignSelf:'center',
		width:'90%',
	},
	roundButton:{
		borderStyle:'solid',
		width:'100%',
		paddingTop:15,
		borderRadius:50,
		borderColor:utils.black,
		borderWidth:2,
		paddingBottom:15,
		backgroundColor: utils.black,
	},
	innerText:{
		textAlign:'center',
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},

// bottom button
	bottomButton:{
		flex:1,
		alignSelf:'center',
		alignItems:'center',
		justifyContent: 'center',
		// backgroundColor: '#000000',
		// height: 100,
		marginBottom: windowHeight * 0.03
	},
	bottomButtonText:{
		color: utils.mediumGrey,
		// backgroundColor: 'white'
	},

})


export default SignUpScreen