import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/advertisements/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedComponentForShowingAdvertisement,
	ConnectedCreateAdvertisement,
} from '../redux_stuff/connected_components';

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AdvertisementScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/advertisements/advertisements-list-with-children',)
			.then((response) => {
				this.props.set_fetched_advertisements(response.data)
			})
			.catch((error) => {
				console.log(error);
			})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/advertisements/advertisements-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_advertisement(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_advertisements = this.props.total_advertisements

		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

		return (

			<View style={{backgroundColor: '#eee'}} >
				
				<View>
		  			<ConnectedCreateAdvertisement/>
		  		</View>

	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			data={total_advertisements}
	  				renderItem={
	  					({ item }) => (
							<ConnectedAdvertisementCard
								dataPayloadFromParent = { item }
							
							/>
	  					)}
	  				keyExtractor={(item, index) => String(index)}
	  			/>

			</View>

		);
	}
}

AdvertisementScreen.defaultProps = {
	// : ,
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


export default AdvertisementScreen