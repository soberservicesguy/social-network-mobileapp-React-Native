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
			// comments: [],
			// likes: [],
			// shares: [],
			users: [],
		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/socialposts/get-all-comments-of-socialpost', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			// this.setState( prev => ({...prev, comments: ( prev.comments.length === 0 ) ? response.data : [] }) )
			// console.log('response.data comments')
			// console.log(response.data)
			this.props.set_total_comments(response.data)
			this.props.toggle_show_comments_for_socialpost()
		})
		.catch((error) => {
			console.log(error);
		})
		
	}


	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/socialposts/get-all-likes-of-socialpost', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.props.set_total_likes(response.data)
			// this.setState( prev => ({...prev, likes: ( prev.likes.length === 0 ) ? response.data : [] }) )
			this.props.toggle_show_likes_for_socialpost()
		})
		.catch((error) => {
			console.log(error);
		})

		this.setState( prev => ({...prev, show_like_modal: true}) )		
	}


	fetchAllShare(endpoint) {

		axios.get(utils.baseUrl + '/socialposts/get-all-shares-of-socialpost', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			// this.setState( prev => ({...prev, shares: ( prev.shares.length === 0 ) ? response.data : [] }) )
			this.props.set_total_shares(response.data)
			this.props.toggle_show_shares_for_socialpost()

		})
		.catch((error) => {
			console.log(error);
		})
		
	}



// COMPONENT DID MOUNT
	componentDidMount() {
		this.props.hide_comments_for_socialpost()
		this.props.hide_likes_for_socialpost()
	}

	componentWillUnmount(){
		this.props.hide_comments_for_socialpost()
		this.props.hide_likes_for_socialpost()		
	}

	render() {

		return (
		  	<View style={styles.outerContainer}>

		  		<View>
					{/* first the parent / card component */}
					<ComponentForShowingSocialPost
						navigation={this.props.navigation}
						dataPayloadFromParent = {this.props.dataPayloadFromParent}
					/>
		  		</View>

				<View style={styles.socialButtonsAndStatsContainer}>
					{/* 2nd show individual summary of childs */}

					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
						}}
					>						
						<ConnectedSummarizeLikesOfSocialPost
							likes={this.state.likes}
							navigation={this.props.navigation}
							showOnlyQuantity = { this.props.show_socialpost_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>


					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {
							this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
						}}
					>
						<ConnectedSummarizeCommentsOfSocialPost
							navigation={this.props.navigation}
							showOnlyQuantity = { this.props.show_socialpost_comments }
							child_quantity = { this.props.comments_quantity }
							dataPayloadFromParent = { this.props.comments }
						/>
					</TouchableOpacity>


					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllShare( this.props.dataPayloadFromParent.endpoint ) 
						}}
					>						
						<ConnectedSummarizeSharesOfSocialPost
							navigation={this.props.navigation}
							showOnlyQuantity = { this.props.show_socialpost_shares }
							child_quantity = { this.props.shares_quantity }
							dataPayloadFromParent = { this.props.shares }
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.createLikeAndShareContainer}>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateLikeForSocialpost
						navigation={this.props.navigation}
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateShareForSocialpost
						navigation={this.props.navigation}
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

				<ConnectedCreateCommentForSocialpost
					navigation={this.props.navigation}
					parentDetailsPayload = { this.props.dataPayloadFromParent }
				/>					

		  	</View>
		);
	}
}
	
SocialPostCard.defaultProps = {
};

const styles = StyleSheet.create({
	outerContainer:{
		// backgroundColor: '#000000',
		width:windowWidth,
		marginTop: 30,
	},

// comments and likes counts
	socialButtonsAndStatsContainer:{
		flexDirection:'row', 
		justifyContent:'space-between',
		// justifyContent:'flex-start',
		borderBottomColor: utils.dimWhite,
		borderBottomWidth: 1,
		width:'90%',
		alignSelf:'center',
		marginBottom:10,
		paddingBottom:10,

	},
	socialButtonAndStats:{
		height:windowHeight * 0.05
	},

// create comment and like
	createLikeAndShareContainer:{
		marginTop: windowHeight * 0.001,
		flexDirection:'row',
		justifyContent:'space-between',
		width:'90%',
		alignSelf:'center',
		// marginBottom:10,
		// paddingBottom:10,

	},
});

export default SocialPostCard