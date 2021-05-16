import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
	Button,
	ImageBackground,
	SafeAreaView,
	ScrollView,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/socialposts/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedSocialPostCard,
	ConnectedCreateSocialPost,
} from '../redux_stuff/connected_components';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';


class SocialPostScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			showOwnWallInstead:true,
			showFriendsWallInstead:false,
			showNonFriendsWallInstead:false,
			showFriendsSocialposts:false,


			backend_requests_made:1,
			user_cover_image:'',
			user_avatar_image:'',
			user_name_in_profile:'',

			total_friends:0,

		}	
	}

	getOwnSocialposts(){

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));}

		console.log('MAKING AXIOUS REQUEST')
		axios.get(utils.baseUrl + '/socialposts/get-socialposts-of-someone',
		{
		    params: {
				request_number: backend_requests_made,
		    }
		})
		.then((response) => {

			console.log('response.data')
			console.log(response.data.length)

			if(response.data.length === 0){

				console.log('no more posts to show')
				append_socialposts_callback({data: [{message:'no more posts to show'}]})

			} else {

				console.log('posts recieved')
				console.log(response.data.length)
				append_socialposts_callback(response)
				set_state_for_requests_made()

			}
			
		})
		.catch((error) => {
			console.log(error);
		})

	}

	getFriendsSocialposts(){

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {
			this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));
		}

		axios.get(utils.baseUrl + '/socialposts/get-socialposts-from-friends',
		{
		    params: {
				request_number: backend_requests_made,
		    }
		})
		.then((response) => {

			if(response.data.length === 0){

				console.log('no more posts to show')
				append_socialposts_callback({data: [{message:'no more posts to show'}]})

			} else {

				console.log('posts recieved')
				console.log(response.data)
				append_socialposts_callback(response)
				set_state_for_requests_made()

			}
			
		})
		.catch((error) => {
			console.log(error);
		})


	}

	getSocialpostsOfSomeone(){

		let { id } = this.props.navigation

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {
			this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));
		}

		axios.get(utils.baseUrl + '/socialposts/get-socialposts-of-someone',
		{
		    params: {
				request_number: backend_requests_made,
				user_id: id,
		    }
		})
		.then((response) => {

			if(response.data.length === 0){

				console.log('no more posts to show')
				append_socialposts_callback({data: [{message:'no more posts to show'}]})

			} else {

				console.log('posts recieved')
				console.log(response.data)
				append_socialposts_callback(response)
				set_state_for_requests_made()

			}
			
		})
		.catch((error) => {
			console.log(error);
		})

	}


	getUserDetails(id){
	
		// let { id } = this.props.navigation
		let set_state_callback = (response) => {
			this.setState(prev => ({...prev, 
				user_cover_image: response.data.user_cover_image,
				user_avatar_image: response.data.user_avatar_image,
				user_name_in_profile: response.data.user_name_in_profile,
				total_friends: response.data.total_friends,
			}));
		}

		axios.get(utils.baseUrl + '/users/user-details',
		{
		    params: {
				user_id: id,
		    }
		})
		.then((response) => {

			set_state_callback(response)

		})
		.catch((error) => {
			console.log(error);
		})
	}

// COMPONENT DID MOUNT
	componentDidMount() {

		const payload_from_previous_screen = this.props.navigation
		let { id } = payload_from_previous_screen

		if (payload_from_previous_screen.showOwnWallInstead){
			console.log('TRIGGERED1')
			console.log('this.props.user_name_in_profile')
			console.log(this.props.user_name_in_profile)
			this.props.set_fetched_socialposts([])
			this.setState(prev => ({...prev, showOwnWallInstead: true }) )
			this.props.navigation.setOptions({title: this.props.user_name_in_profile,})
			this.getOwnSocialposts()
			// dummy objects as fetched socialposts
				// this.props.set_fetched_socialposts([
				// 	{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
				// 	{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
				// 	{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
				// 	{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
				// 	{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
				// 	{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
				// 	{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
				// 	{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
				// 	{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
				// 	{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
				// ]) // loading with empty since it was storing all objects reaching to 200


		} else if (payload_from_previous_screen.showFriendsWallInstead){
			console.log('TRIGGERED2')
			this.props.set_fetched_socialposts([])
			this.setState(prev => ({...prev, showFriendsWallInstead: true }) )
			this.props.navigation.setOptions({title: `Friends Wall`,})
			this.getUserDetails(id)
			this.getSocialpostsOfSomeone()
			// dummy objects as fetched socialposts
				// this.props.set_fetched_socialposts([
				// 	{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
				// 	{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
				// 	{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
				// 	{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
				// 	{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
				// 	{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
				// 	{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
				// 	{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
				// 	{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
				// 	{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
				// ]) // loading with empty since it was storing all objects reaching to 200

		} else if (payload_from_previous_screen.showNonFriendsWallInstead){ 
			console.log('TRIGGERED3')
			this.props.set_fetched_socialposts([])
			this.setState(prev => ({...prev, showNonFriendsWallInstead: true }) )
			this.props.navigation.setOptions({title: `Not A Friends Wall`,})
			this.getUserDetails(id)
			// dummy objects as fetched socialposts
				// this.props.set_fetched_socialposts([
				// 	{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
				// 	{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
				// 	{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
				// 	{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
				// 	{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
				// 	{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
				// 	{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
				// 	{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
				// 	{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
				// 	{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
				// ]) // loading with empty since it was storing all objects reaching to 200

		} else {
			console.log('TRIGGERED4')
			this.props.set_fetched_socialposts([])
			console.log('this.props.user_name_in_profile')
			console.log(this.props.user_name_in_profile)
			this.setState(prev => ({...prev, showFriendsSocialposts: true }) )
			this.props.navigation.setOptions({title: this.props.user_name_in_profile,})
			this.getFriendsSocialposts()			
		}

	}

// detecting whether entire screen is scrolled
	isScrollingCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
		const paddingToBottom = 100;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};


// RENDER METHOD
	render() {
			
		const total_socialposts = this.props.total_socialposts

		const payload_from_previous_screen = this.props.navigation		
		// console.log(payload_from_previous_screen)

		var base64Image
		
		if (this.state.showOwnWallInstead){

			base64Image = "data:image/jpeg;base64," + this.props.user_cover_image

		} else if (this.state.showFriendsWallInstead || this.state.showNonFriendsWallInstead){

			base64Image = "data:image/jpeg;base64," + this.state.user_cover_image

		} else {

			base64Image = "data:image/jpeg;base64," + this.props.user_cover_image

		}


		console.log('total_socialposts.length')
		console.log(total_socialposts.length)

		return (

			<SafeAreaView>
				<ScrollView contentContainerStyle={styles.screenContainer} onScroll={({nativeEvent}) => {

					if ( this.isScrollingCloseToBottom(nativeEvent) ){
						
						console.log('end reached')
						
						if (this.state.showOwnWallInstead){
							console.log('getting more posts')
							this.getOwnSocialposts()
							// this.getOwnSocialposts()
						// dummy
							// this.props.async_append_fetched_socialposts([
							// 	{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
							// 	{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
							// 	{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
							// 	{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
							// 	{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
							// 	{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
							// 	{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
							// 	{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
							// 	{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
							// 	{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
							// ]) // loading with empty since it was storing all objects reaching to 200

						} else if (this.state.showFriendsWallInstead){
							console.log('getting more posts')
							this.getSocialpostsOfSomeone()
							// this.getSocialpostsOfSomeone()
						// dummy
							// this.props.async_append_fetched_socialposts([
							// 	{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
							// 	{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
							// 	{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
							// 	{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
							// 	{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
							// 	{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
							// 	{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
							// 	{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
							// 	{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
							// 	{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
							// ]) // loading with empty since it was storing all objects reaching to 200
						} else if (this.state.showFriendsSocialposts){
							console.log('getting more posts')
							this.getFriendsSocialposts()
							// this.getSocialpostsOfSomeone()
						// dummy
							this.props.async_append_fetched_socialposts([
								{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
								{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
								{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
								{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
								{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
								{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
								{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
								{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
								{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
								{  type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
							]) // loading with empty since it was storing all objects reaching to 200

						}
					}
				}}>

					<View style={{
						backgroundColor: '#eee'
					}} >

		{/* -------------------- profile header starts here ------------------------ */}
						<View style={styles.headerContainer}>
							<ImageBackground 
								source={{uri: base64Image}} 
								// source={utils.image}

								style={styles.bgImage}
							>
								<Text style={styles.headerText}>
									{payload_from_previous_screen.user_name_in_profile}
								</Text>						
							</ImageBackground>

						{/*social stats*/}
							<View style={styles.socialStatsContainer}>
								<View style={styles.friendsContainer}>
									<Text style={styles.statsCountText}>
										{(this.props.total_friends === 0) ? this.state.total_friends : this.props.total_friends}
									</Text>
									<Text style={styles.statsNameText}>
										friends
									</Text>
								</View>

								<View style={styles.followersContainer}>
									<Text style={styles.statsCountText}>
										{this.props.total_friends}
									</Text>
									<Text style={styles.statsNameText}>
										followers
									</Text>
								</View>


								{(() => {
									if (this.state.showNonFriendsWallInstead){

										return (<View style={styles.sendFriendRequestContainer}>
											
											<Icon
												// raised
												name={utils.becameFriendsIcon}
												type='font-awesome'
												color='#f50'
												size={20}
												// onPress={() => console.log('hello')} 
												// reverse={true}
											/>
											
											<View style={{width:windowWidth*0.2}}>
												<Text style={styles.sendRequestText}>
													Send Friend Request
												</Text>
											</View>
										</View>)

									} else if (this.state.showFriendsWallInstead){

										return (<View style={styles.unFriendRequestContainer}>
											<Icon
												// raised
												name={utils.unfriendIcon}
												type='font-awesome'
												color='#f50'
												size={20}
												// onPress={() => console.log('hello')} 
												// reverse={true}
											/>
											<View style={{width:windowWidth*0.2}}>
												<Text style={styles.unFriendText}>
													Un-friend
												</Text>
											</View>
										</View>)

									} else if (this.state.showOwnWallInstead){
										null
									}
							
								})()}

							</View>
						</View>

		{/* -------------------- profile header ends here ------------------------ */}



						{(this.state.showOwnWallInstead) ? (

							<View>
					  			<ConnectedCreateSocialPost/>
					  		</View>

							) : (

								null

							)

						}



						{(this.state.showNonFriendsWallInstead) ? (

							null

							) : (

					  	  		<FlatList
					  				style={{flexDirection: 'column', flexWrap : "wrap", }}
					  				numColumns={1}
					  	  			data={total_socialposts}
					  				renderItem={
					  					({ item }) => (
											<ConnectedSocialPostCard
												dataPayloadFromParent = { item }

												comments_quantity = { item.total_comments }
												comments = { item.comments || [] }

												likes_quantity = { item.total_likes }
												likes = { item.likes || [] }

												shares_quantity = { item.total_shares }
												shares = { item.shares || [] }

											 // not needed
												// showOwnWallInstead = {this.state.showOwnWallInstead}
												// showFriendsWallInstead = {this.state.showFriendsWallInstead}
												// showNonFriendsWallInstead = {this.state.showNonFriendsWallInstead}
											
											/>
					  					)}
					  				keyExtractor={(item, index) => String(index)}
					  			/>
							)

						}		  		

					</View>


				</ScrollView>
			</SafeAreaView>


		);
	}
}

SocialPostScreen.defaultProps = {
	// : ,
};

const styles = StyleSheet.create({
	// screenContainer:{
	// 	// flex:1,
	// 	// display:'flex',
	// 	alignItems: 'center', // horizontally centered
	// 	justifyContent: 'space-between', 
	// },
	// somethingContainer:{
	// 	marginTop: windowHeight * 0.05, // or 30  gap
	// 	height: windowHeight * 0.1, // or 100
	// 	width: '80%',
	// 	justifyContent: 'center', // vertically centered
	// 	alignSelf: 'center', // horizontally centered
	// 	// backgroundColor: utils.lightGreen,
	// },


	headerContainer:{
		alignItems: 'center',
		height: windowHeight * 0.5,
		width: windowWidth,
		marginTop:20,
		// backgroundColor: 'green'

	},
	headerText:{
		fontWeight:'bold',
		fontSize:20,
		position:'absolute',
		top:windowHeight * 0.24,
		left:windowWidth * 0.05,
	},
	bgImage:{
		resizeMode: "stretch",
		height: windowHeight * 0.3,
		width: windowWidth * 0.9,
	},	


	socialStatsContainer:{
		flexDirection:'row',
		justifyContent: 'center',
		alignItems:'center',
		height:windowHeight * 0.15,
		marginTop: windowHeight * 0.05/2,
		// backgroundColor: '#000000',
		width:'95%',
		alignSelf:'center',
	},
	friendsContainer:{
		flex:1,
	},
	followersContainer:{
		flex:1,
	},
	sendFriendRequestContainer:{
		flex:1,
		flexDirection: 'row',
		backgroundColor: utils.darkGreen,
		height:windowHeight * 0.07,
		borderRadius:10,
		justifyContent: 'center',
		alignItems:'center',

	},
	unFriendRequestContainer:{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		height:windowHeight * 0.07,
		borderRadius:10,
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: 'black',
	},

	sendRequestText:{
		color:'white',
		fontWeight:'bold',
		textAlign:'center',
	},
	unFriendText:{
		color:'red',
		fontWeight:'bold',
		textAlign:'center',
	},

// text
	statsCountText:{
		textAlign:'center',
		fontSize:20,
		fontWeight:'bold',
	},
	statsNameText:{
		textAlign:'center',
		color:utils.darkBlue,
		fontSize:17,
	},
});

export default SocialPostScreen