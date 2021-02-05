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
	ComponentForShowingAdvertisementCategory,
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

		let componentToUse = (this.props.isCategoryInstead) ?
			<ComponentForShowingAdvertisementCategory
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
			/> :
	  		<ComponentForShowingAdvertisement
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>

		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
					{componentToUse}
		  		</View>

		  	</View>
		);
	}
}
	
AdvertisementCard.defaultProps = {
	isCategoryInstead:true,
};


const styles = StyleSheet.create({
});


export default AdvertisementCard