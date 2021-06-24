import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingAdvertisement extends Component {
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
			console.log('getting image')
			this.getImage()

		}

	}

	getImage(){

		let image_object_id = this.props.dataPayloadFromParent.ad_image
		let host = this.props.dataPayloadFromParent.ad_image_host

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

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		// let data = {}
		var base64Image = "data:image/jpeg;base64," + data.ad_image

		return (
			<View style={styles.outerContainer}>
				<View style={styles.adTitleContainer}>
					<Text style={styles.adTitleText}>
						Ad name: { data.ad_name }
					</Text>
				</View>

				<View style={styles.imageContainer}>
					<Image 
						// source={utils.image}
						// source={{uri: base64Image}} 
						source={{uri: this.state.image_src}} 
						style={styles.imageStyle}
					/>
				</View>

				<View style={styles.adDescriptionContainer}>
					<Text style={styles.adDescriptionText}>
						Ad description: { data.ad_description }
					</Text>
				</View>
			</View>
		);
	}
}
	
ComponentForShowingAdvertisement.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		alignItems:'center',
		justifyContent: 'center',
	},


	imageStyle:{
		resizeMode: "stretch",
		height: '100%',
		width: '100%',
	},

	imageContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.3, // or 100
		width: windowWidth,
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	adTitleContainer:{
		height:windowHeight * 0.05,
		marginTop:10,
	},
	adTitleText:{
		textAlign:'center',
		fontSize:20,
		fontWeight: 'bold',
		color:utils.mediumGrey
	},
	adDescriptionContainer:{
		marginTop:10,
		height:windowHeight * 0.15,
		width: windowWidth
	},
	adDescriptionText:{
		fontSize:15,
		textAlign:'left'
	},
});

export default ComponentForShowingAdvertisement