import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
	Image,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Icon } from 'react-native-elements';

import utils from "../utilities";


class ComponentForShowingNotification extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	switchToProperScreen(notification_type) {

		let data = this.props.dataPayloadFromParent

		let screen_name
		let payload
		
		switch(notification_type){

			case "created_post":

				screen_name = 'Individual_SocialPost'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					type_of_post: data.type_of_post,
					total_likes: data.total_likes,
					total_shares: data.total_shares,
					total_comments: data.total_comments,
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					post_text: data.post_text,
				}

				break

			case "liked_post":

				screen_name = 'Individual_SocialPost'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					type_of_post: data.type_of_post,
					total_likes: data.total_likes,
					total_shares: data.total_shares,
					total_comments: data.total_comments,
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					post_text: data.post_text,
				}

				break

			case "shared_post":
				screen_name = 'Individual_SocialPost'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					type_of_post: data.type_of_post,
					total_likes: data.total_likes,
					total_shares: data.total_shares,
					total_comments: data.total_comments,
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					post_text: data.post_text,
				}

				break

			case "commented_on_post":

				screen_name = 'Individual_SocialPost'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					type_of_post: data.type_of_post,
					total_likes: data.total_likes,
					total_shares: data.total_shares,
					total_comments: data.total_comments,
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					post_text: data.post_text,
				}

				break

			case "accepted_friend_request":

				screen_name = 'SocialPost'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					type_of_post: data.type_of_post,
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					new_friend_endpoint: data.new_friend_endpoint, // this will be used to get his wall posts
					new_friends_user_name: data.new_friends_user_name, // this will be used to generate his wall header
					new_friends_avatar: data.new_friends_avatar, // this will be used to generate his wall header
				}

				break

			case "created_book":

				screen_name = 'Individual_Book'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					book_name: data.book_name, 
					book_description: data.book_description, 
					book_image: data.book_image, 
				}

				break

			case "got_interested_in_book":

				screen_name = 'Individual_Book'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					book_name: data.book_name, 
					book_description: data.book_description, 
					book_image: data.book_image, 
				}

			case "created_page":

				screen_name = 'Individual_Page'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					page_name: data.page_name, 
					page_description: data.page_description, 
					page_image: data.page_image, 
				}

				break

			case "got_interested_in_page":

				screen_name = 'Individual_Page'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					page_name: data.page_name, 
					page_description: data.page_description, 
					page_image: data.page_image, 
				}

				break

			case "created_sport":

				screen_name = 'Individual_Sport'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					sport_name: data.sport_name, 
					sport_description: data.sport_description, 
					sport_image: data.sport_image, 
				}

				break

			case "got_interested_in_sport":

				screen_name = 'Individual_Sport'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					interested_users: data.interested_users, 
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					sport_name: data.sport_name, 
					sport_description: data.sport_description, 
					sport_image: data.sport_image, 
				}

				break

			case "created_advertisement":

				screen_name = 'Individual_Ad'

				payload = {

				// users data
					user_name: data.user_name,
					user_avatar_image: data.user_avatar_image,

				// social stats
					endpoint: data.endpoint,
					// activity_type: activity_type,

				// content to show
					ad_name: data.ad_name, 
					ad_description: data.ad_description, 
					ad_image: data.ad_image, 
				}

				break

			default:
				// screen_name = 'Home'
				// payload = {}
		}
		
		this.props.navigation.navigate( screen_name, payload )		

	}


	render() {
		let data = this.props.dataPayloadFromParent

		let types = [
			'created_post', 'liked_post', 'shared_post', 'commented_on_post', 
			'sent_friend_request', // STOP BACKEND TO SEND THIS 
			'accepted_friend_request',
			'created_book', 'got_interested_in_book',
			'created_page', 'got_interested_in_page',
			'created_sport', 'got_interested_in_sport',
			'created_advertisement',
			 // 'got_interested_in_advertisement', STOP BACKEND TO SEND THIS
		]

		let componentToShow 

		// switch(data.activity_type){
		switch("created_post"){

			case "created_post":

				console.log('Object.keys(data)')
				console.log(Object.keys(data))

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image

				console.log(base64Image)

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								// source={utils.image}
								source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			created a post
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "liked_post":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			liked a post
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.likedPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "shared_post":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			shared a post
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.sharedPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "commented_on_post":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			commented on a post
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.commentedOnPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "accepted_friend_request":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64ImageNewFriend = "data:image/jpeg;base64," + data.new_friends_avatar

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64ImageNewFriend}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			became friends with 
			  		  		</Text>
	  		  				<Text style={styles.newFriendsName}>
				  		  		panda{data.new_friends_user_name}
	  		  		  		</Text>

						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.becameFriendsIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "created_book":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Book = "data:image/jpeg;base64," + data.book_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Book}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			created a book {data.book_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createdBookIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "got_interested_in_book":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Book = "data:image/jpeg;base64," + data.book_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Book}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			likes book {data.book_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.likesBookIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "created_page":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Page = "data:image/jpeg;base64," + data.page_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Page}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			created a page {data.page_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createdPageIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "got_interested_in_page":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Page = "data:image/jpeg;base64," + data.page_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Page}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			likes page {data.page_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.likesPageIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "created_sport":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Sport = "data:image/jpeg;base64," + data.sport_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Sport}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			created sport {data.sport_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createdSportIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "got_interested_in_sport":

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Sport = "data:image/jpeg;base64," + data.sport_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Sport}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			likes sport {data.sport_name}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.likesSportPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			case "created_advertisement":


				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
				var base64Ad = "data:image/jpeg;base64," + data.ad_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Ad}} 
								style={{...styles.imageStyle, borderRadius:0, width: windowWidth * 0.15}}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			created advertisement
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createdAdIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

				break

			default:

				var base64Image = "data:image/jpeg;base64," + data.user_avatar_image

				componentToShow = (

					<View style={styles.innerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								source={utils.image}
								// source={{uri: base64Image}} 
								style={styles.imageStyle}
							/>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								arsalan {data.user_name} 
					  		</Text>
			  				<Text style={styles.activityText}>
			  		  			{data.activity_type}
			  		  		</Text>
						</View>
					  	
					  	<View style={styles.iconContainer}>
						  	<Icon
								// raised
								name={utils.createPostIcon}
								type='font-awesome'
								iconStyle='Outlined'
								color='#f50'
								size={30}
								// onPress={() => console.log('hello')} 
								// reverse={true}
						  	/>
					  	</View>
					  	
					</View>
				)

		}

		return (

			<View style={styles.outerContainer}>
			  	<TouchableOpacity 
			  		activeOpacity={0.2} 
			  		onPress={() => this.switchToProperScreen(data.activity_type)} 
		  		>
		  			{componentToShow}
			  	</TouchableOpacity>
			</View>
			  	
		);
	}
}
	
ComponentForShowingNotification.defaultProps = {
};

const styles = StyleSheet.create({
// button
	outerContainer:{
		// flexDirection:'row',
		justifyContent: 'center',
		alignItems:'center',
		height: windowHeight * 0.14,
		width: windowWidth,
		// backgroundColor: '#000000',
		marginTop:windowHeight * 0.01,
		marginBottom:windowHeight * 0.01,
		borderBottomWidth: 1,
		borderBottomColor: utils.dimWhite,

	},

	innerContainer:{
		width: windowWidth * 0.9,
		alignSelf:'center',
		flexDirection: 'row',
		// backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems:'center', 
	},


// image
	imageContainer:{
		height: '100%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
		flex:1,
	},
	imageStyle:{
		resizeMode: "stretch",
		height: windowHeight * 0.1,
		width: windowWidth * 0.2,
		borderRadius: windowWidth * 1/2,
	},

// text
	textContainer:{
		flex:3,
		marginLeft:windowWidth * 0.1,
		alignSelf:'center',
		alignItems:'flex-start',
		justifyContent: 'center', 
		// backgroundColor: '#000000',

	},
	nameText:{
		fontSize:20,
		fontWeight:'bold',
	},
	activityText:{
		fontSize:15,
		fontStyle: 'italic', 
		color:utils.darkBlue
	},
	newFriendsName:{
		fontSize:20,
		fontStyle: 'italic', 
		color:utils.orange
	},
// icon
	iconContainer:{
		flex:1,
		// backgroundColor: '#000000'
	}

});

export default ComponentForShowingNotification