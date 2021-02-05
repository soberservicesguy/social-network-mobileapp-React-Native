import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import utils from "../../utilities";

import {
	ComponentForShowingSocialPost,
	ComponentForShowingSocialPostCategory,
} from "."

import {
	ShowCommentsOfSocialPost,
} from "../comments/"

import {
	ConnectedCreateCommentForSocialpost,
	ConnectedSummarizeCommentsOfSocialPost,
	ConnectedSummarizeLikesOfSocialPost,
	ConnectedSummarizeSharesOfSocialPost,
} from "../../redux_stuff/connected_components"


import {
	ShowLikesOfSocialPost,
} from "../likes/"

import {
	ConnectedCreateLikeForSocialpost,
} from "../../redux_stuff/connected_components"


import {
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
					<ComponentForShowingSocialPost/>
		  		</View>

				<View style={styles.socialButtonsAndStatsContainer}>
					{/* 2nd show individual summary of childs */}
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {
							this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_comments_for_socialpost()
						}}
					>
						<ConnectedSummarizeCommentsOfSocialPost
							showOnlyQuantity = { this.props.show_socialpost_comments }
							child_quantity = { this.props.comments_quantity }
							dataPayloadFromParent = { this.props.comments }
						/>
					</TouchableOpacity>


					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_socialpost()
						}}
					>						
						<ConnectedSummarizeLikesOfSocialPost
							showOnlyQuantity = { this.props.show_socialpost_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllShare( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_shares_for_socialpost()
						}}
					>						
						<ConnectedSummarizeSharesOfSocialPost
							showOnlyQuantity = { this.props.show_socialpost_shares }
							child_quantity = { this.props.shares_quantity }
							dataPayloadFromParent = { this.props.shares }
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.createCommentAndLikeContainer}>
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
	outerContainer:{
	},

// comments and likes counts
	socialButtonsAndStatsContainer:{
		flexDirection:'row', 
		// justifyContent:'space-between',
		justifyContent:'flex-start',
	},
	socialButtonAndStats:{
		height:windowHeight * 0.05
	},

// create comment and like
	createCommentAndLikeContainer:{
		marginTop: windowHeight * 0.001,
	},
});

export default SocialPostCard