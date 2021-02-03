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

import { Consumer } from "../../screens/social_post"

import {
	ComponentForShowingComment
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ShowCommentsOfSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			show_comment_modal: false,
		}

	}

	toggle_comment_modal(){
		this.setState(
			prev => (
				{
					...prev,
					show_comment_modal: (prev.show_comment_modal === false) ? true : false 
				}
			)
		)
	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (
		// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
			<View style={styles.outerContainer}>


	{/* showing Comment as expanded list is below */}
				<View style={{backgroundColor: '#eee'}}>
		  	  		<FlatList
		  				style={{flexDirection: 'column', flexWrap : "wrap"}}
		  				numColumns={1}
		  	  			data={this.props.dataPayloadFromParent}
		  				renderItem={
		  					({ item }) => (
								<ComponentForShowingComment
									componentData = { item }
								/>
		  					)}
		  				keyExtractor={(item, index) => String(index)}
		  			/>
				</View>

{/* showing Comment as modal is below */}
				
				<Modal				  	
					open={this.state.show_comment_modal} // link some variable to it so that it could be turned off
					aria-labelledby="server-modal-title"
					aria-describedby="server-modal-description"
					className={styles.modal}
					// onClose={() => {Alert.alert("Modal has been closed.");}}
				>
					<View style={{
						// height:windowHeight, 
					}}>
		
						<Button 
							title={'Hide Modal'}
							onPress={() => this.toggle_comment_modal()} 
							style={{
								// height:windowHeight * 0.1
							}}
						/>
						
			  	  		<FlatList
			  				style={{flexDirection: 'column', flexWrap : "wrap"}}
			  				numColumns={1}
			  	  			data={this.props.dataPayloadFromParent}
			  				renderItem={
			  					({ item }) => (
									<ComponentForShowingComment
										componentData = { item }
									/>
			  					)}
			  				keyExtractor={(item, index) => String(index)}
			  			/>	
		
						<Button 
							title={'Hide Modal'}
							onPress={() => this.toggle_comment_modal()} 
							style={{
								// height:windowHeight * 0.1
							}}
						/>
					</View>
				</Modal>
			</View>
		);
	}
}
	
ShowCommentsOfSocialPost.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default ShowCommentsOfSocialPost