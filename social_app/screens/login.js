
import React, {Component} from 'react';
// IMPORT classes to use
import { 
	PermissionsAndroid,
	ImageBackground,
	View,
	StyleSheet, 
	// Button,
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


class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

			phone_number: '',
			password:'',

		}
	}

	componentDidMount(){

	}

	make_request_to_protected_route(){

		axios.get(utils.baseUrl + '/users/protected')
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data)

			} else {
				console.log(response.data)
				console.log('not authorized')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	login_and_get_jwt_token_and_privileges(){

		axios.post(utils.baseUrl + '/users/login', 
			{
				phone_number:this.state.phone_number, 
				password:this.state.password
			}
		)
		.then(function (response) {
			if (response.data.success === true){

				// console.log(response.data)
				axios.defaults.headers.common['Authorization'] = response.data.token				
				this.props.set_is_signed_in( true )
				this.props.set_phone_number( this.state.phone_number )

				verify_privilege(this, response.data.privileges)

			} else {
				console.log('couldnt login')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	render() {
		return(
			<View style={styles.screenContainer}>
				
				<View style={styles.buttonContainer}>
					<Button 
						title={'LOGIN WITH FACEBOOK'}
						style={styles.roundButton} 
						onPress={() => null} activeOpacity={0.2}
					/>
				</View>

			
				<View style={styles.orContainer}>
					<View style={styles.leftBar}>
					</View>

					<View style={styles.orTextChild}>
						<Text style={styles.orText}>
							OR
						</Text>
					</View>

					<View style={styles.rightBar}>
					</View>
				</View>

				<View style={styles.textinputContainer}>
					<Text style={styles.headingOverInput}>
						PHONE_NUMBER
					</Text>
					<TextInput
						style={styles.textinput}
						placeholder="Type your phone number"
						placeholderTextColor = {utils.lightGrey}
						// maxLength=10
						// caretHidden=true
						// multiline=true
						// numberOfLines=3
						// onChangeText={ () => null }
						// value='dummy'
						// autoFocus=true
						onChangeText={ (value) =>  this.setState(prev => ({...prev, phone_number: value})) }
					/>
				</View>

				<View style={styles.textinputContainer}>
					<Text style={styles.headingOverInput}>
						PASSWORD
					</Text>
					<TextInput
						style={styles.textinput}
						placeholder="Type your password"
						placeholderTextColor = {utils.lightGrey}
						// maxLength=10
						// caretHidden=true
						// multiline=true
						// numberOfLines=3
						// onChangeText={ () => null }
						// value='dummy'
						// autoFocus=true
						onChangeText={ (value) =>  this.setState(prev => ({...prev, password: value})) }
					/>
				</View>
					
				<Button
					title={'Sign In'}
					style={styles.lowerButton} activeOpacity={0.2}
					onPress={ () => this.login_and_get_jwt_token_and_privileges() }
				/>

				<Button
					title={'MAKE REQUEST AT PROTECTED ROUTE'} 
					style={styles.lowerButton} activeOpacity={0.2}
					onPress={ () => this.make_request_to_protected_route() }
				/>

				<Button
					title={'LOGOUT'} 
					style={styles.lowerButton} activeOpacity={0.2}
					onPress={ () => this.logout_and_remove_jwt_token() }
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	iconStyle:{
		alignSelf:'center',
	},
	screenContainer:{
		alignItems:'center',
		flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-between', 
	},

	lowerButton:{
		alignItems: 'center',
		width:'100%',
		paddingTop:15,
		paddingBottom:15,
		marginBottom:0,
		backgroundColor: 'grey',
	},

	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,

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
	orText:{
		color:utils.lightGrey,
		fontSize:20,
		textAlign:'center',
	},
	orTextChild:{
		flex:1,
	},
	rightBar:{
		flex:3,
		borderBottomWidth:1,
		borderColor:utils.lightGrey,
		width:'100%',
	},
	leftBar:{
		flex:3,
		borderBottomWidth:1,
		borderColor:utils.lightGrey,
	},
	orContainer:{
		marginTop:20,
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent: 'center',
		width:'80%',
	},
	buttonContainer:{
		marginTop:30,
		justifyContent: 'center',
		alignSelf:'center',
		height:100,
		width:'80%',
	},
	roundButton:{
		borderRadius:50,
		borderColor:'green',
		borderWidth:2,
		backgroundColor: 'green',
		borderStyle:'solid',
		width:'100%',
		paddingTop:15,
		paddingBottom:15,
	},
	text:{
		fontSize:20,
		color:'white',
		textAlign:'center',
	},
	headingOverInput:{
		width:'100%',
		marginTop:20,
		fontSize:18,
		fontWeight:'bold',
		textAlign:'left',
	},
	textinputContainer:{
		width:'80%',
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
})


export default LoginScreen