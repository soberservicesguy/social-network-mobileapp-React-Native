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

class ComponentForShowingSocialPost extends Component {
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
					{ data.type_of_post }
				</Text>
				<Text>
					{ data.post_text }
				</Text>
				<Text>
					{ data.image_for_post }
				</Text>
				<Text>
					{ data.video_for_post }
				</Text>
				<Text>
					{ data.video_thumbnail_image }
				</Text>
				<Text>
					{ data.total_likes }
				</Text>
				<Text>
					{ data.total_shares }
				</Text>
				<Text>
					{ data.endpoint }
				</Text>
				<Text>
					{ data.date_of_publishing }
				</Text>
			</View>
		);
	}
}
	
ComponentForShowingSocialPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default ComponentForShowingSocialPost