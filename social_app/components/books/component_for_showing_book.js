import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingBook extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}

	}

	componentDidMount() {
		this.getImage()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			this.getImage()

		}

	}

	getImage(){

		let image_object_id = this.props.dataPayloadFromParent.book_image
		let host = this.props.dataPayloadFromParent.book_image_host

		axios.get(`${utils.baseUrl}/socialposts/get-image`, 
			{
				params: {
					image_object_id: image_object_id,
					host: host
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){
		    	this.setState({ image_src: "data:image/jpeg;base64," + response.data.image})
	    	}

		});

	}


	render() {

		const data = this.props.dataPayloadFromParent
		
		var base64Image = "data:image/jpeg;base64," + data.book_image

		return (
			<View style={styles.outerContainer}>
				<View style={styles.bookTitleContainer}>
					<Text style={styles.bookTitleText}>
						Book name: { data.book_name }
					</Text>
				</View>

				<View style={styles.imageContainer}>
					<Image 
						source={{uri: this.props.useOwnData ? base64Image : this.state.image_src}} 
						style={styles.imageStyle}
					/>
				</View>

				<View style={styles.bookDescriptionContainer}>
					<Text style={styles.bookDescriptionText}>
						Book description: { data.book_description }
					</Text>
				</View>
			</View>
		);
	}
}
	
ComponentForShowingBook.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		alignItems:'center',
		justifyContent: 'center',
	},


	imageStyle:{
		alignSelf:'center',
		resizeMode: "stretch",
		height: '100%',
		width: '45%',
	},

	imageContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.3, // or 100
		width: windowWidth,
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	bookTitleContainer:{
		height:windowHeight * 0.05,
		marginTop:10,
	},
	bookTitleText:{
		textAlign:'center',
		fontSize:20,
		fontWeight: 'bold',
		color:utils.mediumGrey
	},
	bookDescriptionContainer:{
		marginTop:10,
		height:windowHeight * 0.15,
		width: windowWidth,
	},
	bookDescriptionText:{
		fontSize:15,
		textAlign:'left'
	},
});

export default ComponentForShowingBook