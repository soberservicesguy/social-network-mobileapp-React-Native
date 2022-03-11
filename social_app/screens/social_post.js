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
			showOwnWallInstead:false,
			showFriendsWallInstead:false,
			showNonFriendsWallInstead:false,
			showFriendsSocialposts:false,


			backend_requests_made:1,
			user_cover_image:'',
			user_avatar_image:'',
			user_name_in_profile:'',

			total_friends:0,


			screen_payload:this.props.route.params,

			get_individual_image:false,

			no_more_posts: 0,
			make_requests: true,

		}	
	}

	componentDidMount() {
		this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
			this.setUpScreen()
		});

		this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
			this.setState({
				no_more_posts: 0,
				make_requests: true,
			})
		});

	}

	componentWillUnmount() {
		this._unsubscribeFocus();
		this._unsubscribeBlur();
	}


	getOwnSocialposts(){

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));}

		if (this.state.make_requests){
			axios.get(utils.baseUrl + '/socialposts/get-socialposts-of-someone',
			{
			    params: {
					request_number: backend_requests_made,
			    }
			})
			.then((response) => {

				if(response.data.length === 0){

					this.setState(prev => {
						return ({...prev, no_more_posts: prev.no_more_posts + 1})
					},
						() => {
							if (this.state.no_more_posts > 1){
								this.setState({make_requests: false})
							} else {
								append_socialposts_callback({data: [{message:'no more posts to show'}]})
							}
						}
					)

				} else {

					append_socialposts_callback(response)
					set_state_for_requests_made()
			    	this.setState({ get_individual_image: true })

				}
				
			})
			.catch((error) => {
				console.log(error);
			})			
		}

	}

	getFriendsSocialposts(){

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {
			this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));
		}

		if (this.state.make_requests){
			axios.get(utils.baseUrl + '/socialposts/get-socialposts-from-friends',
			{
			    params: {
					request_number: backend_requests_made,
			    }
			})
			.then((response) => {

				if(response.data.length === 0){

					this.setState(prev => {
						return ({...prev, no_more_posts: prev.no_more_posts + 1})
					},
						() => {
							if (this.state.no_more_posts > 1){
								this.setState({make_requests: false})
							} else {
								append_socialposts_callback({data: [{message:'no more posts to show'}]})
							}
						}
					)


				} else {

					append_socialposts_callback(response)
					set_state_for_requests_made()
			    	this.setState({ get_individual_image: true })

				}
				
			})
			.catch((error) => {
				console.log(error);
			})			
		}


	}

	getSocialpostsOfSomeone(){

		let id = this.props.route.params.friends_endpoint

		let backend_requests_made = this.state.backend_requests_made
		let append_socialposts_callback = (response) => this.props.async_append_fetched_socialposts(response.data)
		let set_state_for_requests_made = () => {
			this.setState(prev => ({...prev, backend_requests_made: prev.backend_requests_made + 1,}));
		}

		if (this.state.make_requests){
			axios.get(utils.baseUrl + '/socialposts/get-socialposts-of-someone',
			{
			    params: {
					request_number: backend_requests_made,
					user_id: id,
			    }
			})
			.then((response) => {

				if(response.data.length === 0){
					this.setState(prev => {
						return ({...prev, no_more_posts: prev.no_more_posts + 1})
					},
						() => {
							if (this.state.no_more_posts > 1){
								this.setState({make_requests: false})
							} else {
								append_socialposts_callback({data: [{message:'no more posts to show'}]})
							}
						}
					)

				} else {

					append_socialposts_callback(response)
					set_state_for_requests_made()
			    	this.setState({ get_individual_image: true })

				}
				
			})
			.catch((error) => {
				console.log(error);
			})			
		}

	}


	getUserDetails(id){
	
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


	setUpScreen(){

		let payload_from_previous_screen = this.props.route.params

		if (typeof payload_from_previous_screen !== 'undefined'){

			let id = payload_from_previous_screen.friends_endpoint


			if (payload_from_previous_screen.showOwnWallInstead){
				this.props.set_fetched_socialposts([])
				this.setState(prev => ({...prev, showOwnWallInstead: true }) )
				this.props.navigation.setOptions({title: this.props.user_name_in_profile,})
				this.getOwnSocialposts()
				this.setState(prev => ({
					...prev, 
					total_friends: this.props.user_total_friends,
					user_cover_image: this.props.user_cover_image,
					user_name_in_profile: this.props.user_name_in_profile,
				}))

			} else if (payload_from_previous_screen.showFriendsWallInstead){

				this.props.set_fetched_socialposts([])
				this.setState(prev => ({...prev, showFriendsWallInstead: true }) )
				this.props.navigation.setOptions({title: `Friends Wall`,})
				this.getUserDetails(id)
				this.getSocialpostsOfSomeone()

			} else if (payload_from_previous_screen.showNonFriendsWallInstead){ 
				this.props.set_fetched_socialposts([])
				this.setState(prev => ({...prev, showNonFriendsWallInstead: true }) )
				this.props.navigation.setOptions({title: `Not A Friends Wall`,})
				this.getUserDetails(id)
			} else {
				this.props.set_fetched_socialposts([])
				this.setState(prev => ({...prev, showFriendsSocialposts: true }) )
				this.props.navigation.setOptions({title: this.props.user_name_in_profile,})
				this.getFriendsSocialposts()			
				this.setState(prev => ({
					...prev, 
					total_friends: this.props.user_total_friends,
					user_cover_image: this.props.user_cover_image,
					user_name_in_profile: this.props.user_name_in_profile,
				}))
			}

		} else {

			this.props.set_fetched_socialposts([])
			this.setState(prev => ({...prev, showFriendsSocialposts: true }) )
			this.props.navigation.setOptions({title: this.props.user_name_in_profile,})				
			this.getFriendsSocialposts()
			this.setState(prev => ({
				...prev, 
				total_friends: this.props.user_total_friends,
				user_cover_image: this.props.user_cover_image,
				user_name_in_profile: this.props.user_name_in_profile,
			}))

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

		var base64Image
		base64Image = "data:image/jpeg;base64," + this.state.user_cover_image

		return (

			<SafeAreaView>
				<ScrollView contentContainerStyle={styles.screenContainer} onScroll={({nativeEvent}) => {

					if ( this.isScrollingCloseToBottom(nativeEvent) ){
						
						if (this.state.showOwnWallInstead){
							this.getOwnSocialposts()

						} else if (this.state.showFriendsWallInstead){

							this.getSocialpostsOfSomeone()

						} else if (this.state.showFriendsSocialposts){

							this.getFriendsSocialposts()
							this.props.async_append_fetched_socialposts([])

						} else {
							this.getFriendsSocialposts()			
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
								style={styles.bgImage}
							>
								<Text style={styles.headerText}>
									{this.state.user_name_in_profile}
								</Text>						
							</ImageBackground>

						{/*social stats*/}
							<View style={styles.socialStatsContainer}>
								<View style={styles.friendsContainer}>
									<Text style={styles.statsCountText}>
										{this.state.total_friends}
									</Text>
									<Text style={styles.statsNameText}>
										friends
									</Text>
								</View>

								<View style={styles.followersContainer}>
									<Text style={styles.statsCountText}>
										{this.state.total_friends}
									</Text>
									<Text style={styles.statsNameText}>
										followers
									</Text>
								</View>


								{(() => {
									if (this.state.showNonFriendsWallInstead){

										return (<View style={styles.sendFriendRequestContainer}>
											
											<Icon
												name={utils.becameFriendsIcon}
												type='font-awesome'
												color='#f50'
												size={20}
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
												name={utils.unfriendIcon}
												type='font-awesome'
												color='#f50'
												size={20}
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
					  			<ConnectedCreateSocialPost
					  				navigation={this.props.navigation}
					  			/>
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
					  					({ item }) => {
					  						return(
												<ConnectedSocialPostCard
													useAvatarDirect = {true}
													getIndividualImage = {this.state.get_individual_image}

													navigation={this.props.navigation}
													dataPayloadFromParent = { item }

													comments_quantity = { item.total_comments }
													comments = { item.comments || [] }

													likes_quantity = { item.total_likes }
													likes = { item.likes || [] }

													shares_quantity = { item.total_shares }
													shares = { item.shares || [] }
												
												/>
											)
					  					}} 

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
	headerContainer:{
		alignItems: 'center',
		height: windowHeight * 0.5,
		width: windowWidth,
		marginTop:20,
		// backgroundColor: 'green'

	},
	headerText:{
		color: utils.maroonColor,
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