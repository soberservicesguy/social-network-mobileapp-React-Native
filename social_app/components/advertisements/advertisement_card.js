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

import { Consumer } from "../../screens/advertisement"

import {
	ComponentForShowingAdvertisement
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
					{/* first the parent / card component */}
			  		<ComponentForShowingAdvertisement
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View>
					{/* 2nd show individual summary of childs */}
				</View>

				<View>
					{/* 3rd show individual button for showing childs */}
				</View>

				<View>
					{/* 4th create individual child options like comment / like */}
				</View>

		  	</View>
		);
	}
}
	
AdvertisementCard.defaultProps = {

};


const styles = StyleSheet.create({
  container: {
  },
  bigBlue: {
  },          
  buttonWithoutBG:{
    marginTop:50,
    marginBottom:50,
  },
  innerText:{

  },

});


export default AdvertisementCard