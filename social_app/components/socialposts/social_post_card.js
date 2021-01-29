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
import firebase from 'firebase';

import { Consumer } from "../../screens/social_post"

import utils from "../../utilities";

// CHECK THIS OUT
import { 
	withRouter,
	Link,
} from "react-router-dom";

import {
	ComponentForShowingSocialPost
} from "."

import {
	SummarizeCommentsOfSocialPost,
	ShowCommentsOfSocialPost,
} from "../comments/"

import {
	ConnectedCreateCommentForSocialpost,
} from "../../redux_stuff/connected_components"


import {
	SummarizeLikesOfSocialPost,
	ShowLikesOfSocialPost,
} from "../likes/"

import {
	ConnectedCreateLikeForSocialpost,
} from "../../redux_stuff/connected_components"


import {
	SummarizeSharesOfSocialPost,
	ShowSharesOfSocialPost,
} from "../shares/"

import {
	ConnectedCreateShareForSocialpost,
} from "../../redux_stuff/connected_components"


class SocialPostCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			comments: [],
			likes: [],
			shares: [],
			users: [],
		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-comments-of-sport', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, comments: ( prev.comments.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}


	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-likes-of-sport', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, likes: ( prev.likes.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}


	fetchAllShare(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-shares-of-sport', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, shares: ( prev.shares.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}



// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
			  		<ComponentForShowingSocialPost
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View>
					{/* 2nd show individual summary of childs */}
					<SummarizeCommentsOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.comments_quantity }
						dataPayloadFromParent = { this.props.comments }
					/>
					<SummarizeLikesOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.likes_quantity }
						dataPayloadFromParent = { this.props.likes }
					/>
					<SummarizeSharesOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.shares_quantity }
						dataPayloadFromParent = { this.props.shares }
					/>
				</View>

				<View>
					{/* 3rd show individual button for showing childs */}

					<Button 
						title={'Show All Comment'}
						style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowCommentsOfSocialPost
						dataPayloadFromParent = { this.state.comments }
					/>

					<Button
						title={'Show All Like'}
						style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowLikesOfSocialPost
						dataPayloadFromParent = { this.state.likes }
					/>

					<Button 
						title={'Show All Share'}
						style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllShare( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowSharesOfSocialPost
						dataPayloadFromParent = { this.state.shares }
					/>
				</View>

				<View>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateCommentForSocialpost
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateLikeForSocialpost
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateShareForSocialpost
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
	}
}
	
SocialPostCard.defaultProps = {

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

export default SocialPostCard