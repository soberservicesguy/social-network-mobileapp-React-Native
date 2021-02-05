import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import {
	ComponentForShowingAdvertisement,
} from "."

import utils from "../../utilities";


class AdvertisementCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {


		return (
		  	<View>

		  		<View>
					<ComponentForShowingAdvertisement/>
		  		</View>

		  	</View>
		);
	}
}
	
AdvertisementCard.defaultProps = {
};


const styles = StyleSheet.create({
});


export default AdvertisementCard