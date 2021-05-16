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


class ComponentForShowingFriend extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	sendFriendRequest(endpoint){

		axios.post(utils.baseUrl + '/books/books-list-with-children', {endpoint: endpoint})
		.then((response) => {
			this.props.set_fetched_books(response.data)
		})
		.catch((error) => {
			console.log(error);
		})

	}

	render() {

		let data = this.props.dataPayloadFromParent
		let base64Image = "data:image/jpeg;base64," + data.user_avatar_image
		
		return (

			<View>
		
				{(() => {

					if (this.props.showFriendsSuggestionsInstead === true){
					
						return (

							<TouchableOpacity 
						  		activeOpacity={0.2}
						  		style={styles.outerContainer} 
						  		onPress={ () => this.sendFriendRequest(data.endpoint) } 
					  		>
								<View style={styles.innerContainer}>
									<View style={styles.imageContainer}>
										<Image 
											// source={utils.image}
											source={{uri: base64Image}} 
											style={styles.imageStyle}
										/>
									</View>

									<View style={styles.textContainer}>
										<Text style={{...styles.nameText, color:'black'}}>
											{data.user_name_in_profile}
										</Text>
									</View>

									<View style={{...styles.iconContainer, flex:3, height: '50%', backgroundColor: utils.darkBlue}}>
										<View style={{flex:1}}>
											<Icon
												// raised
												name={utils.sendFriendRequestIcon}
												type='font-awesome'
												color={utils.lightBlue}
												size={25}
												// onPress={() => console.log('hello')} 
												// reverse={true}
											/>
										</View>
										<View style={{flex:3}}>
											<Text style={{...styles.followingText, textAlign:'center'}}>
												Send Friend Request
											</Text>
										</View>
									</View>
								</View>

						  	</TouchableOpacity>
						) 
					
					} else if (this.props.showFriendsRequestInstead === true) {

						return (

							<TouchableOpacity 
						  		activeOpacity={0.2}
						  		style={styles.outerContainer} 
						  		onPress={ () => this.props.navigation.navigate('SocialPost', {endpoint: data.endpoint}) } 
					  		>
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
											{data.user_name_in_profile}
										</Text>
									</View>

									<View style={styles.iconContainer}>
										<Icon
											// raised
											name={utils.sendFriendRequestIcon}
											type='font-awesome'
											color={utils.lightBlue}
											size={25}
											// onPress={() => console.log('hello')} 
											// reverse={true}
										/>
										
										<Text style={styles.followingText}>
											Accept
										</Text>
									</View>
								</View>

						  	</TouchableOpacity>
						)
					} else if (this.props.showFriends === true){

							<TouchableOpacity 
						  		activeOpacity={0.2}
						  		style={styles.outerContainer} 
						  		onPress={ () => this.props.navigation.navigate('SocialPost', {endpoint: data.endpoint}) } 
					  		>
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
											{data.user_name_in_profile}
										</Text>
									</View>

									<View style={styles.iconContainer}>
										<Icon
											// raised
											name={utils.followingIcon}
											type='font-awesome'
											color={utils.lightBlue}
											size={25}
											// onPress={() => console.log('hello')} 
											// reverse={true}
										/>
										
										<Text style={styles.followingText}>
											Following
										</Text>
									</View>
								</View>

						  	</TouchableOpacity>
					}

				})()}

			</View>


		);
	}
}

ComponentForShowingFriend.defaultProps = {
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
		// marginTop:windowHeight * 0.01,
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
		borderRadius: 500,
	},

// friend name
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
		color:utils.darkBlue,
	},

// icon
	iconContainer:{
		flex:2,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: utils.darkGreen,
		borderRadius: 10,
		height: '40%',
	},
	followingText:{
		fontSize:15,
		color:utils.dimWhite,
		fontWeight:'bold',
	},

});

export default ComponentForShowingFriend