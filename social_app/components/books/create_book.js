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

class CreateBook extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			book_name: '',
			book_image: '',
			book_description: '',
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {
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
							this.setState(prev => ({...prev, book_image: res}))

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
							placeholder="Type your book_name"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							value={this.state.book_name}
							onChangeText={ (value) => this.setState( prev => ({...prev, book_name: value})) }
						/>
				  	</View>



				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your book_description"
							placeholderTextColor = {utils.mediumGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							value={this.state.book_description}
							onChangeText={ (value) => this.setState( prev => ({...prev, book_description: value})) }
						/>
				  	</View>
			  	</View>


				<TouchableOpacity
					activeOpacity={0.2}
					style={styles.createBookButton}
					onPress={ () => {
						let setResponseInCurrentBook = (arg) => this.props.set_current_book(arg)
						let redirectToNewBook = () => this.props.navigation.navigate('Individual_Book')
						let clearInput = () => this.setState({book_name: '',book_description: '', book_image: ''})

						const formData = new FormData()
						if (this.state.book_name !== ''){
							formData.append('book_name', this.state.book_name)
						}
						if (this.state.book_description){
							formData.append('book_description', this.state.book_description)
						}
						if (this.state.book_image){
							formData.append('book_image', {uri: this.state.book_image.uri, type: this.state.book_image.type, name: this.state.book_image.name})
						}

						axios.post(utils.baseUrl + '/books/create-book-with-user', formData)
						.then(function (response) {
							clearInput()
							// set to current parent object
							setResponseInCurrentBook(response.data.new_book)

							// change route to current_book
							redirectToNewBook()

						})
						.catch(function (error) {
							console.log(error)
						});						

					}}
				>
					<Text style={styles.innerText}>
						Create Book
					</Text>
				</TouchableOpacity>
			</View>
		);			
	}
}
	
CreateBook.defaultProps = {

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



	createBookButton:{	
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
		backgroundColor: utils.maroonColor,
		// borderRadius: windowWidth * 1/2
	},
	innerText:{
		textAlign:'center',
		color:'white',
		fontSize:20,
		// fontWeight:'bold'
	},
});

export default CreateBook