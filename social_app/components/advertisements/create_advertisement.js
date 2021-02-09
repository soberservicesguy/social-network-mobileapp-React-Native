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

class CreateAdvertisement extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,

			ad_name: '',
			ad_image: '',
			ad_description: '',
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
			this.props.navigation.navigate('Individual-Advertisement', {
				itemId: 86,
				otherParam: 'anything you want here',
			})

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<View style={styles.outerContainer}>

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
								this.setState(prev => ({...prev, ad_image: res}))

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

					<View style={{
						display: 'flex',
						// flexDirection: 'row',
					}}>

					  	<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder="Type your ad_name"
								placeholderTextColor = {utils.mediumGrey}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) => this.setState( prev => ({...prev, ad_name: value})) }
							/>
					  	</View>


					  	<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder="Type your ad_description"
								placeholderTextColor = {utils.mediumGrey}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) => this.setState( prev => ({...prev, ad_description: value})) }
							/>
					  	</View>
				  	</View>


					<TouchableOpacity
						activeOpacity={0.2}
						style={styles.createAdButton}
						onPress={ () => {

							let setResponseInCurrentAdvertisement = (arg) => this.props.set_current_advertisement(arg)
							let redirectToNewAdvertisement = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							const formData = new FormData()

							if (this.state.ad_description !== ''){
								formData.append('ad_description', this.state.ad_description)
							}
							if (this.state.ad_name !== ''){
								formData.append('ad_name', this.state.ad_name)
							}
							if (this.state.ad_image !== ''){
								formData.append('ad_image', {uri: this.state.ad_image.uri, name: this.state.ad_image.name, type: this.state.ad_image.type})
							}

							axios.post(utils.baseUrl + '/advertisements/create-ad-with-user', formData)
							.then(function (response) {
								console.log(response.data) // current advertisement screen data
								
								// set to current parent object
								setResponseInCurrentAdvertisement(response.data)

								// change route to current_advertisement
								redirectToNewAdvertisement()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>
						<Text style={styles.innerText}>
							Create Ad
						</Text>
					</TouchableOpacity>
				</View>
			);
		}			
	}
}
	
CreateAdvertisement.defaultProps = {

};


const styles = StyleSheet.create({
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
		borderColor:utils.lightGrey,
		// backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.5,
	},


	createAdButton:{
		// flex:1,
		// position:'absolute',
		// top:windowHeight * 0.073,
		// right: windowWidth * 0.06,
		marginTop:10,
		width: windowWidth,
		height: windowHeight * 0.08,
		alignItems: 'center',
		justifyContent: 'center',
		// alignSelf:'center',
		backgroundColor: 'black',
		// borderRadius: windowWidth * 1/2
	},
	innerText:{
		textAlign:'center',
		color:'white',
		fontSize:20,
		// fontWeight:'bold'
	},
});

export default CreateAdvertisement