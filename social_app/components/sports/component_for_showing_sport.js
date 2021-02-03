import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingSport extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist

		return (
			<View style={styles.outerContainer}>
				<Text>
					{ data.sport_name }
				</Text>
				<Text>
					{ data.sport_image }
				</Text>
				<Text>
					{ data.sport_description }
				</Text>
				<Text>
					{ data.endpoint }
				</Text>
			</View>
		);
	}
}
	
ComponentForShowingSport.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default ComponentForShowingSport