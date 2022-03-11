import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Video from 'react-native-video'
import { Icon } from 'react-native-elements';

class ComponentForShowingSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			friends_user_avatar_image_src: null,
			image_for_post_src: null,
			book_image_src: null,
			page_image_src: null,
			sport_image_src: null,
			ad_image_src: null,
		}

	}

	componentDidMount() {
		this.getImage()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			
			let {

				friends_user_avatar_image,
				friends_user_avatar_image_host,
				image_for_post,
				image_for_post_host,
				book_image, 
				book_image_host,
				sport_image,
				sport_image_host,
				ad_image,
				ad_image_host,
				page_image,
				page_image_host,

			} = this.props.dataPayloadFromParent


			if (typeof friends_user_avatar_image !== 'undefined'  && typeof friends_user_avatar_image_host !== 'undefined'){				
				this.getImage(friends_user_avatar_image, friends_user_avatar_image_host, 'friends_user_avatar_image_src')
			}

			if (typeof image_for_post  !== 'undefined' && typeof image_for_post_host !== 'undefined'){				
				this.getImage(image_for_post, image_for_post_host, 'image_for_post_src')
			}

			if (typeof book_image  !== 'undefined' && typeof book_image_host !== 'undefined'){				
				this.getImage(book_image, book_image_host, 'book_image_src')
			}

			if (typeof sport_image  !== 'undefined' && typeof sport_image_host !== 'undefined'){				
				this.getImage(sport_image, sport_image_host, 'sport_image_src')
			}

			if (typeof ad_image  !== 'undefined' && typeof ad_image_host !== 'undefined'){				
				this.getImage(ad_image, ad_image_host, 'ad_image_src')
			}

			if (typeof page_image  !== 'undefined' && typeof page_image_host !== 'undefined'){				
				this.getImage(page_image, page_image_host, 'page_image_src')
			}


		}

	}

	getImage(image_object_id, host, state_field_to_change){

		axios.get(`${utils.baseUrl}/socialposts/get-image`, 
			{
				params: {
					image_object_id: image_object_id,
					host: host
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){

	    		let new_state = {}
	    		new_state[ state_field_to_change ] = "data:image/jpeg;base64," + response.data.image
				this.setState( prev => ({...prev, ...new_state}))

	    	}

		});

	}

	playVideo(){

	}


	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64ImageAvatar = this.state.friends_user_avatar_image_src
		var base64Image =  this.state.image_for_post_src

		let username_avatar_in_created_post_type = (
			<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
				<View style={styles.imageContainer}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={{...styles.imageStyle, width:70, height:70}}
					/>
				</View>
				
				<View style={styles.textContainer}>
					<Text style={styles.nameText}>
						{data.friends_user_name}
					</Text>
				</View>
			</View>
		)

		let username_and_avatar_in_rest = (
			<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
				<View style={styles.imageContainer}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={{...styles.imageStyle, width:70, height:70}}
					/>
				</View>
				
				<View style={styles.textContainer}>
					<Text style={styles.nameText}>
						{data.friends_user_name}
					</Text>
				</View>

			</View>
		)

		let activity_header_for_post_created = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:40, fontWeight:'normal'}}>
						{data.friends_user_name} created a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> post!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_post_liked = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} liked a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> post!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_post_shared = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} shared aa<Text style={{fontWeight:'normal', color:utils.maroonColor}}> post!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_post_commented = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} commented on a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> post!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_book_created = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} created a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> book!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_book_liked = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} liked a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> book!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_page_created = (


			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:40, fontWeight:'normal'}}>
						{data.friends_user_name} created a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> page!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_page_liked = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} liked a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> page!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_sport_created = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:40, fontWeight:'normal'}}>
						{data.friends_user_name} created a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> sport!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_sport_liked = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} liked a<Text style={{fontWeight:'normal', color:utils.maroonColor}}> sport!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_ad_created = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:40, fontWeight:'normal'}}>
						{data.friends_user_name} created an<Text style={{fontWeight:'normal', color:utils.maroonColor}}> ad!</Text>
					</Text>
				</View>
			</View>
		)

		let activity_header_for_ad_liked = (
			<View style={{...styles.avatarAndUsernameContainer, alignItems:'center', marginBottom:30, width:'40%', margin:'auto', marginLeft:windowWidth/2 - 100,}}>
				<View style={{...styles.avatarContainer}}>
					<Image 
						source={{uri: this.props.useOwnAvatar ? "data:image/jpeg;base64," + this.props.user_avatar_image : (this.props.useAvatarDirect ? "data:image/jpeg;base64," + this.props.friends_user_avatar_image : this.state.friends_user_avatar_image_src)}} 
						style={styles.imageStyle}
					/>
				</View>
				<View style={{...styles.usernameContainer, flex:10}}>
					<Text style={{...styles.usernameText, fontSize:15, marginLeft:20, fontWeight:'normal'}}>
						{data.friends_user_name} liked an<Text style={{fontWeight:'normal', color:utils.maroonColor}}> ad!</Text>
					</Text>
				</View>
			</View>
		)

		let post_text_content = (
			<View style={styles.postTextContainer}>
				<Text style={styles.postText}>
					{ data.post_text }
				</Text>
			</View>

		)

		let post_image_content = (
			<View>							
				<Image 
					source={{uri: "data:image/jpeg;base64," + data.image_for_post}} 
					style={styles.imagePostStyle}
				/>
			</View>
		)

		let post_video_content = (
			<View>
	  			<Video 
					controls={true}
					
					source={{uri: 'http://d33yizdt8hggvw.cloudfront.net/' +data.video_for_post}} 
					resizeMode="cover"
					ref={(ref) => {
						this.player = ref
					}}
					allowsExternalPlayback={true}
					// audioOnly={false}
					onBuffer={() => console.log('buffering')}
					onError={(err) => console.log(err)}
					style={{
						position: 'relative',
						top: 20,
						left: 0,
						bottom: 0,
						right: 0,
						height:400,
						marginBottom :20,
						// width:300, 
						// resizeMode:'none',
						// marginTop:100
					}}
			       />
				<View style={{position:'absolute',top:windowHeight * 0.15 - 25/2, left:windowWidth * 0.5 - 25}}>
					<Icon
						name={utils.playIcon}
						type='font-awesome'
						color='#f50'
						size={50}
						onPress={() => this.playVideo()} 
						// reverse={true}
					/>
				</View>				
			</View>

		)

		let book_content = (
			<View>
				<View style={styles.postTextContainer}>
					<Text style={{...styles.postText, fontWeight:'bold'}}>
						{ data.book_name }
					</Text>
				</View>

				<View style={{...styles.postImageContainer, width:'30%',  alignSelf:'center'}}>
					<Image 
						source={{uri: this.state.book_image_src}} 
						style={styles.postImage}
					/>
				</View>

				<View style={styles.postTextContainer}>
					<Text style={styles.postText}>
						{ data.book_description }
					</Text>
				</View>			
			</View>
		)

		let page_content = (
			<View>
				<View style={styles.postTextContainer}>
					<Text style={{...styles.postText, fontWeight:'bold'}}>
						{ data.page_name }
					</Text>
				</View>

				<View style={{...styles.postImageContainer, width:'70%',  alignSelf:'center'}}>
					<Image 
						source={{uri: this.state.page_image_src}} 
						style={styles.postImage}
					/>
				</View>

				<View style={styles.postTextContainer}>
					<Text style={styles.postText}>
						{ data.page_description }
					</Text>
				</View>
			</View>
		)

		let sport_content = (
			<View>
				<View style={styles.postTextContainer}>
					<Text style={{...styles.postText, fontWeight:'bold'}}>
						{ data.sport_name }
					</Text>
				</View>

				<View style={styles.postImageContainer}>
					<Image 
						source={{uri: this.state.sport_image_src}} 
						style={styles.postImage}
					/>
				</View>

				<View style={styles.postTextContainer}>
					<Text style={styles.postText}>
						{ data.sport_description }
					</Text>
				</View>				
			</View>
		)
		
		let ad_content = (
			<View>
				<View style={{...styles.postTextContainer}}>
					<Text style={{...styles.postText, fontWeight:'bold'}}>
						{ data.ad_name }
					</Text>
				</View>

				<View style={styles.postImageContainer}>
					<Image 
						source={{uri: this.state.ad_image_src}} 
						style={styles.postImage}
					/>
				</View>

				<View style={styles.postTextContainer}>
					<Text style={styles.postText}>
						{ data.ad_description }
					</Text>
				</View>				
			</View>
		)

		return (
			<View style={styles.outerContainer}>

			{(() => {

				if (data.message){

					return (
						<View style={{
							margin:'auto', 
							width:'30%',
							marginTop:50,
						}}>
							<Text style={{fontSize:20, fontStyle:'italic', fontWeight:'bold' }}>{data.message}</Text>
						</View>
					)

				} else if (data.notification_type === 'created_post' && data.type_of_post === 'text_post'){

					return (
						<View>
							<View>
								{activity_header_for_post_created}
							</View>
							<View>
								{username_avatar_in_created_post_type}
							</View>
							<View>
								{post_text_content}
							</View>

						</View>
					)

				} else if (data.notification_type === 'created_post' && data.type_of_post === 'image_post'){

					return (
						<View>

							{activity_header_for_post_created}
							{username_avatar_in_created_post_type}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'created_post' && data.type_of_post === 'video_post'){

					return (
						<View>

							{activity_header_for_post_created}		
							{username_avatar_in_created_post_type}
							{post_video_content}	
							
						</View>
					)

				} else if (data.notification_type === 'created_post' && data.type_of_post === 'text_with_image_post'){

					return (
						<View>

							{activity_header_for_post_created}
							{username_avatar_in_created_post_type}
							{post_text_content}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'created_post' && data.type_of_post === 'text_with_video_post'){

					return (
						<View>

							{activity_header_for_post_created}
							{username_avatar_in_created_post_type}
							{post_text_content}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'liked_post' && data.type_of_post === 'text_post'){

					return (
						<View>
							{activity_header_for_post_liked}
							{username_and_avatar_in_rest}
							{post_text_content}

						</View>
					)

				} else if (data.notification_type === 'liked_post' && data.type_of_post === 'image_post'){

					return (
						<View>
							{activity_header_for_post_liked}
							{username_and_avatar_in_rest}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'liked_post' && data.type_of_post === 'video_post'){

					return (
						<View>
							{activity_header_for_post_liked}
							{username_and_avatar_in_rest}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'liked_post' && data.type_of_post === 'text_with_image_post'){

					return (
						<View>
							{activity_header_for_post_liked}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'liked_post' && data.type_of_post === 'text_with_video_post'){

					return (
						<View>
							{activity_header_for_post_liked}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'shared_post' && data.type_of_post === 'text_post'){

					return (
						<View>
							{activity_header_for_post_shared}
							{username_and_avatar_in_rest}
							{post_text_content}

						</View>
					)

				} else if (data.notification_type === 'shared_post' && data.type_of_post === 'image_post'){

					return (
						<View>
							{activity_header_for_post_shared}
							{username_and_avatar_in_rest}
							{post_image_content}
							
						</View>
					)

				} else if (data.notification_type === 'shared_post' && data.type_of_post === 'video_post'){

					return (
						<View>
							{activity_header_for_post_shared}
							{username_and_avatar_in_rest}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'shared_post' && data.type_of_post === 'text_with_image_post'){

					return (
						<View>
							{activity_header_for_post_shared}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'shared_post' && data.type_of_post === 'text_with_video_post'){

					return (
						<View>
							{activity_header_for_post_shared}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'commented_on_post' && data.type_of_post === 'text_post'){

					return (
						<View>
							{activity_header_for_post_commented}
							{username_and_avatar_in_rest}
							{post_text_content}

						</View>
					)

				} else if (data.notification_type === 'commented_on_post' && data.type_of_post === 'image_post'){

					return (
						<View>
							{activity_header_for_post_commented}
							{username_and_avatar_in_rest}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'commented_on_post' && data.type_of_post === 'video_post'){

					return (
						<View>
							{activity_header_for_post_commented}
							{username_and_avatar_in_rest}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'commented_on_post' && data.type_of_post === 'text_with_image_post'){

					return (
						<View>
							{activity_header_for_post_commented}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_image_content}

						</View>
					)

				} else if (data.notification_type === 'commented_on_post' && data.type_of_post === 'text_with_video_post'){

					return (
						<View>
							{activity_header_for_post_commented}
							{username_and_avatar_in_rest}
							{post_text_content}
							{post_video_content}	

						</View>
					)

				} else if (data.notification_type === 'created_book'){

					return (
						<View>
							{activity_header_for_book_created}
							{username_and_avatar_in_rest}
							{book_content}
							
						</View>
					)

				} else if (data.notification_type === 'got_interested_in_book'){

					return (
						<View>
							{activity_header_for_book_liked}
							{username_and_avatar_in_rest}
							{book_content}

						</View>
					)

				} else if (data.notification_type === 'created_page'){

					return (
						<View>

							{activity_header_for_page_created}
							{username_and_avatar_in_rest}
							{page_content}

						</View>
					)

				} else if (data.notification_type === 'got_interested_in_page'){

					return (
						<View>
							{activity_header_for_page_liked}
							{username_and_avatar_in_rest}
							{page_content}

						</View>
					)

				} else if (data.notification_type === 'created_sport'){

					return (
						<View>
							{activity_header_for_sport_created}
							{username_and_avatar_in_rest}
							{sport_content}

						</View>
					)

				} else if (data.notification_type === 'got_interested_in_sport'){

					return (
						<View>
							{activity_header_for_sport_liked}
							{username_and_avatar_in_rest}
							{sport_content}

						</View>
					)

				} else if (data.notification_type === 'created_advertisement'){

					return (
						<View>
							
							{activity_header_for_ad_created}
							{username_and_avatar_in_rest}
							{ad_content}

						</View>
					)

				} else if (data.notification_type === 'got_interested_in_advertisement'){

					return (
						<View>

							{activity_header_for_ad_liked}
							{username_and_avatar_in_rest}
							{ad_content}

						</View>
					)

				} else {
					return (
						null
					)
				}

			})()}

			</View>
		);
	}
}
	
ComponentForShowingSocialPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		// backgroundColor: '#000000'
		marginBottom:10,
	},

	innerContainer:{
		flexDirection: 'row',
		alignItems:'flex-start',
		justifyContent:'center',
		width:'90%',
		alignSelf:'center',
		// backgroundColor: '#000000'
	},


// AVATAR
	imageStyle:{
		resizeMode: "cover",
		height: 40,
		width: 40,
		borderRadius: windowWidth * 1/2,
	},
	imagePostStyle:{
		marginTop:10,
		width:'100%',
		height:windowHeight * 0.3
	},
	
	imageContainer:{
		flex:1,
		height: windowHeight * 0.1, // or 100
		// width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'flex-start', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	textContainer:{
		// paddingLeft:30,
		flex:4,
		width:'80%',
		// backgroundColor: '#000000'
		marginTop:20,
	},

	postTextContainer:{
		paddingLeft:20,
		// flex:4,
		width:'95%',
		margin:'auto',
		// backgroundColor: '#000000'
	},

	postText:{
		fontSize:18,
		color:utils.mediumGrey
	},
	nameText:{
		fontSize:20,
		color:utils.darkBlue		
	},

	backgroundVideo:{
		marginTop:10,
		width:'100%',
		height:windowHeight * 0.3,
		backgroundColor: 'green'
	},



	avatarAndUsernameContainer:{
		display:'flex',
		flexDirection:'row',
		alignItems:'flex-end',
	},
	avatarContainer:{
		flex:1,
	},
	usernameContainer:{
		flex:5,
	},
	avatarImage:{
		width:80, 
		height:80, 
		resizeMode: "cover",
		borderRadius: 80/2,
		// marginLeft:20,
	},
	usernameText:{
		fontWeight:'bold',
		fontSize:18,
		paddingBottom:0,
		marginBottom: 0,
	},

// post text

// post image
	postImageContainer:{
		marginTop:20,
	},
	postImage:{
		width:'100%', 
		height:300, 
		resizeMode: "stretch"
	},
	postVideoContainer:{
		marginTop:20,
	}


});

export default ComponentForShowingSocialPost