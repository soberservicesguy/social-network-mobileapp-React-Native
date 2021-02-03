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

import utils from "../../utilities";

import { Consumer } from "../../screens/social_post"

import {
	ComponentForShowingLike
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SummarizeLikesOfSport extends Component {
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
							{this.props.child_quantity} like
						</Text>
					</View>

				) : (

		  	  		<FlatList
		  				style={{flexDirection: 'column', flexWrap : "wrap"}}
		  				numColumns={1}
		  	  			data={this.props.dataPayloadFromParent}
		  				renderItem={
		  					({ item }) => (
								<ComponentForShowingLike
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
	
SummarizeLikesOfSport.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default SummarizeLikesOfSport