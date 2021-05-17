import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import {
	ComponentForShowingComment
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';


class SummarizeCommentsOfSocialPost extends Component {
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

				<View style={styles.iconContainer}>
					<Icon
						// raised
						name={utils.commentIcon}
						type='font-awesome'
						color='#f50'
						size={30}
						// onPress={() => console.log('hello')} 
						// reverse={true}
					/>
					<Text style={styles.commentQuantityText}>
						Comments {this.props.child_quantity}
					</Text>
				</View>

				<Modal				  	
					animationType={"none"}
					transparent={false}
					visible={this.props.show_socialpost_comments}
					// presentationStyle={'formSheet'}
					// onRequestClose={() => {Alert.alert("Modal has been closed.");}}
				>			  	  	
					<View style={{
						height:windowHeight,
					}}>

						<Button
							color={'black'}
							title={'close comments'}
							onPress={() => {
								this.props.toggle_show_comments_for_socialpost()
							}} 
						/>
	
				  		<FlatList
							style={{flexDirection: 'column'}}
			  				numColumns={1}
			  	  			data={this.props.all_comments}
			  				renderItem={
			  					({ item }) => (
									<ComponentForShowingComment
										componentData = { item }
									/>
			  					)}
			  				keyExtractor={(item, index) => String(index)}
			  			/>	

					</View>
				</Modal>

			</View>
		);
	}
}
	
SummarizeCommentsOfSocialPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},


	iconContainer:{
		flexDirection:'row'
	},
	commentQuantityText:{
		marginLeft:10,
		fontSize:20,
	},

	// cross button
	crossButtonContainer:{
		width:100,
		height:100,
		backgroundColor: '#000000',
		position:'absolute',
		// top:,
		// left:,
	},
});

export default SummarizeCommentsOfSocialPost