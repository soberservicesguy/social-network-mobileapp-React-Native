import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import DocumentPicker from 'react-native-document-picker';

class BulkPageUpload extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,
			page_image: [],
			excel_sheet:'',
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
			this.props.navigation.navigate('Video', {
				itemId: 86,
				otherParam: 'anything you want here',
			})

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<View style={styles.outerContainer}>

					<View style={styles.textinputContainer}>
						<Button 
							title={'Select VIDEOS From Phone'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									const results = await DocumentPicker.pickMultiple({
										type: [
											'video/3gpp',
											'video/mpeg',
											'video/x-msvideo', // go to for all mimetypes https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
										],
									});
									// setState method with response as argument
									this.setState(prev => ({...prev, page_image: results}))
									// results.map((res) => {
										// console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// })
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
						<Button 
							title={'Select EXCEL SHEET From Phone'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									let res = await DocumentPicker.pick({
										type: [
											DocumentPicker.types.xls,
											DocumentPicker.types.xlsx,
										],
									});
									console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// setState method with response as argument
									this.setState(prev => ({...prev, excel_sheet: res}))

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


					<Button 
						title={'Press To Create Bulk Videos'}
						style={styles.buttonWithoutBG}
						onPress={ () => {

							// let setResponseInFetchedVideos = (arg) => this.props.set_fetched_videos(arg)
							let redirectToNewVideos = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							// in formData send individual variables and not a complete object
							// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
							const formData = new FormData()
							// attaching multiple files with formData

							Array.from(this.state.page_image).forEach((file) => {
								formData.append('page_image', {uri: file.uri, name: file.name, type: file.type})
							})
							formData.append('excel_sheet_for_page', {uri: this.state.excel_sheet.uri, name: this.state.excel_sheet.name, type: this.state.excel_sheet.type})

							axios.post(utils.baseUrl + '/uploads/bulk-upload-pages', formData)
							.then(function (response) {
								console.log(response.data) // current blogpost screen data
								
								// set to current parent object
								// setResponseInFetchedVideos(response.data.new_blogpost)

								// change route to current_blogpost
								redirectToNewVideos()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					/>

					<View>
						<Button 
							title={'Press To DELETE ALL VIDEOS'}
							style={styles.buttonWithoutBG}
							onPress={ () => {
								axios.get(utils.baseUrl + '/uploads/bulk-delete-pages')
								.then(function (response) {
									console.log(response.data)
								})
								.catch(function (error) {
									console.log(error)
								});
							}}
						/>
					</View>

				</View>
			);
		}			
	}
}
	
BulkPageUpload.defaultProps = {

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

export default BulkPageUpload