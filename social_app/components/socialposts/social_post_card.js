import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
	FlatList,
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
	ComponentForShowingComment,
} from "../comments/"


import {
	ConnectedCreateCommentForSocialpost,
} from "../../redux_stuff/connected_components"


import {
	ComponentForShowingLike,
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

import { Icon } from 'react-native-elements';


class SocialPostCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,

			comments: [],
			likes: [],
			shares: [],

			current_likes_quantity: this.props.likes_quantity,
			current_comments_quantity: this.props.comments_quantity,
			current_shares_quantity: this.props.shares_quantity,

			show_all_likes: false,
			show_all_comments: false,
			show_all_shares: false,

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
			this.setState( prev => ({...prev, comments: ( prev.comments.length === 0 ) ? response.data : [] }) )
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
			// this.props.set_total_likes(response.data)
			this.setState( prev => ({...prev, likes: ( prev.likes.length === 0 ) ? response.data : [] }) )
		})
		.catch((error) => {
			console.log(error);
		})

		// this.setState( prev => ({...prev, show_like_modal: true}) )		
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
			this.setState( prev => ({...prev, shares: ( prev.shares.length === 0 ) ? response.data : [] }) )
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


	  	if (this.state.show_all_likes){

	  		return (
  				<View style={{
  					height:windowHeight, 
  				}}>
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {

							this.setState(prev => ({...prev, 
								show_all_likes: false,
								show_all_comments: false,
								show_all_shares: false,
							}))
							
						}}
					>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
							Close Likes
						</Text>
					</TouchableOpacity>


  			  		<FlatList
  						style={{flexDirection: 'column', flexWrap : "wrap"}}
  						numColumns={1}
  			  			data={this.state.likes}
  						renderItem={
  							({ item }) => (
  								<ComponentForShowingLike
  									componentData = { item }
  								/>
  							)}
  						keyExtractor={(item, index) => String(index)}
  					/>

  				</View>
  			)


	  	} else if (this.state.show_all_comments){

			return(
				<View style={{
					height:windowHeight, 
				}}>
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {

							this.setState(prev => ({...prev, 
								show_all_likes: false,
								show_all_comments: false,
								show_all_shares: false,
							}))
							
						}}
					>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
							Close Comments
						</Text>
					</TouchableOpacity>

			  		<FlatList
						style={{flexDirection: 'column', flexWrap : "wrap"}}
						numColumns={1}
			  			data={this.state.comments}
						renderItem={
							({ item }) => (
								<ComponentForShowingComment
									componentData = { item }
								/>
							)}
						keyExtractor={(item, index) => String(index)}
					/>

				</View>
			)

	  	} else if (this.state.show_all_shares){

			return(
				<View style={{
					height:windowHeight, 
				}}>
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {

							this.setState(prev => ({...prev, 
								show_all_likes: false,
								show_all_comments: false,
								show_all_shares: false,
							}))
							
						}}
					>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
							Close Shares
						</Text>
					</TouchableOpacity>

			  		<FlatList
						style={{flexDirection: 'column', flexWrap : "wrap"}}
						numColumns={1}
			  			data={this.state.shares}
						renderItem={
							({ item }) => (
								<ComponentForShowingShare
									componentData = { item }
								/>
							)}
						keyExtractor={(item, index) => String(index)}
					/>

				</View>
			)


	  	} else {

			return (
			  	<View style={styles.outerContainer}>

			  		<View>
						<ComponentForShowingSocialPost
							useAvatarDirect = {this.props.useAvatarDirect}
							friends_user_avatar_image = {this.props.dataPayloadFromParent.friends_user_avatar_image}
				  			getIndividualImage = {this.props.getIndividualImage}
							navigation={this.props.navigation}
							dataPayloadFromParent = {this.props.dataPayloadFromParent}
						/>
			  		</View>

					<View style={styles.socialButtonsAndStatsContainer}>

						<TouchableOpacity 
							style={styles.socialButtonAndStats}
							activeOpacity={0.2} 
							onPress={ () => { 
								this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 

	  							this.setState(prev => ({...prev, 
									show_all_shares: false,
									show_all_comments: false,
									show_all_likes: true,
	  							}))

							}}
						>
							<View style={styles.iconContainer}>
								<Icon
									// raised
									name={utils.likeIcon}
									type='font-awesome'
									iconStyle='Outlined'
									color='#f50'
									size={30}
									// onPress={() => console.log('hello')} 
									// reverse={true}
								/>
								<Text style={styles.commentQuantityText}>
									{this.state.current_likes_quantity} likes 
								</Text>
							</View>

						</TouchableOpacity>


						<TouchableOpacity
							style={styles.socialButtonAndStats}
							activeOpacity={0.2} 
							onPress={ () => {
								this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 

	  							this.setState(prev => ({...prev, 
									show_all_shares: false,
									show_all_likes: false,
									show_all_comments: true,
	  							}))

							}}
						>
	  						<View style={styles.iconContainer}>
	  							<Icon
	  								// raised
	  								name={utils.commentIcon}
	  								type='font-awesome'
	  								// iconStyle='Outlined'
	  								color='#f50'
	  								size={30}
	  								// onPress={() => console.log('hello')} 
	  								// reverse={true}
	  							/>
	  							<Text style={styles.commentQuantityText}>
	  								{this.state.current_comments_quantity} comments
	  							</Text>
	  						</View>

						</TouchableOpacity>


						<TouchableOpacity 
							style={styles.socialButtonAndStats}
							activeOpacity={0.2} 
							onPress={ () => { 
								this.fetchAllShare( this.props.dataPayloadFromParent.endpoint ) 

	  							this.setState(prev => ({...prev, 
									show_all_likes: false,
									show_all_comments: false,
									show_all_shares: true,
	  							}))

							}}
						>						
	  						<View style={styles.iconContainer}>
	  							<Icon
	  								// raised
	  								name={utils.shareIcon}
	  								type='font-awesome'
	  								// iconStyle='Outlined'
	  								color='#f50'
	  								size={30}
	  								// onPress={() => console.log('hello')} 
	  								// reverse={true}
	  							/>
	  							<Text style={styles.commentQuantityText}>
	  								{this.state.current_shares_quantity} shares
	  							</Text>
	  						</View>

						</TouchableOpacity>
					</View>

					<View style={styles.createLikeAndShareContainer}>
						<ConnectedCreateLikeForSocialpost
							navigation={this.props.navigation}
							parentDetailsPayload = { this.props.dataPayloadFromParent }
							add_likes_quantity = {() => this.setState(prev => ({...prev, current_likes_quantity: prev.current_likes_quantity + 1}))}
						/>					
						<ConnectedCreateShareForSocialpost
							navigation={this.props.navigation}
							parentDetailsPayload = { this.props.dataPayloadFromParent }
							add_shares_quantity = {() => this.setState(prev => ({...prev, current_shares_quantity: prev.current_shares_quantity + 1}))}
						/>
					</View>

					<ConnectedCreateCommentForSocialpost
						navigation={this.props.navigation}
						parentDetailsPayload = { this.props.dataPayloadFromParent }
						add_comments_quantity = {() => this.setState(prev => ({...prev, current_comments_quantity: prev.current_comments_quantity + 1}))}
					/>					

			  	</View>
			);
		}
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

	commentQuantityText:{
		marginLeft:5,
		fontSize:20,
	},

	iconContainer:{
		flexDirection: 'row',

	}

});

export default SocialPostCard