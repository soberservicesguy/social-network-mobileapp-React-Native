import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { Consumer } from "../../screens/social_post"

import {
	ComponentForShowingShare
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SummarizeSharesOfSocialPost extends Component {
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

		return (

			<View style={styles.outerContainer}>

				{( this.props.showOnlyQuantity ) ? (

					<View>
						<Text>
							{this.props.child_quantity} share
						</Text>
					</View>

				) : (

		  	  		<FlatList
		  				style={{flexDirection: 'column', flexWrap : "wrap"}}
		  				numColumns={1}
		  	  			data={this.props.dataPayloadFromParent}
		  				renderItem={
		  					({ item }) => (
								<ComponentForShowingShare
									componentData = { item }
								/>
		  					)}
		  				keyExtractor={(item, index) => String(index)}
		  			/>

				)}
			</View>
		);
	}
}
	
SummarizeSharesOfSocialPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default SummarizeSharesOfSocialPost