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

import axios from 'axios';

import utils from "../utilities"


import {
	ComponentForShowingComment,
} from "../components/comments/"


import {
	ConnectedCreateCommentForSocialpost,
	ConnectedComponentForShowingSocialPost,
} from "../redux_stuff/connected_components"


import {
	ComponentForShowingLike,
} from "../components/likes/"

import {
	ConnectedCreateLikeForSocialpost,
} from "../redux_stuff/connected_components"


import {
	ShowSharesOfSocialPost,
} from "../components/shares/"

import {
	ConnectedCreateShareForSocialpost,
} from "../redux_stuff/connected_components"

import { Icon } from 'react-native-elements';


import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class IndividualSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			get_individual_image: true,
		}
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {
		let data = this.props.current_socialpost
		// console.log({data})
	  	return (
	  		<View>
				<ConnectedComponentForShowingSocialPost
		  			getIndividualImage = {this.props.getIndividualImage}
					navigation={this.props.navigation}
					dataPayloadFromParent = {data}
					useOwnAvatar={true}
				/>

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
								{this.state.current_likes_quantity}0 likes 
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
  								{this.state.current_comments_quantity}0 comments
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
  								{this.state.current_shares_quantity}0 shares
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
	
IndividualSocialPost.defaultProps = {
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

export default IndividualSocialPost