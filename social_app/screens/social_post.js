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
			showFriendsWallInstead:true,
			showNonFriendsWallInstead:false,
		}	
	}

	componentWillUnmount(){
	}


// COMPONENT DID MOUNT
	componentDidMount() {

		const payload_from_previous_screen = this.props.navigation

		if (payload_from_previous_screen.showOwnWallInstead){

			this.setState(prev => ({...prev, showOwnWallInstead: true }) )

			this.props.navigation.setOptions({
				title: `Own Wall`,
			})

		// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/socialposts/socialposts-list-with-children',)
			.then((response) => {
				this.props.set_fetched_socialposts(response.data)
			})
			.catch((error) => {
				console.log(error);
			})

		} else if (payload_from_previous_screen.showFriendsWallInstead){

			this.setState(prev => ({...prev, showFriendsWallInstead: true }) )

			this.props.navigation.setOptions({
				title: `Friends Wall`,
			})

		// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/socialposts/socialposts-list-with-children',)
			.then((response) => {
				this.props.set_fetched_socialposts(response.data)
			})
			.catch((error) => {
				console.log(error);
			})

		} else if (payload_from_previous_screen.showNonFriendsWallInstead){ 

			this.setState(prev => ({...prev, showNonFriendsWallInstead: true }) )

			this.props.navigation.setOptions({
				title: `Not A Friends Wall`,
			})

		} else {
		}

	}


	get_10_more_items() {
		axios.get(utils.baseUrl + `/socialposts/socialposts-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_socialpost(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_socialposts = this.props.total_socialposts

		const payload_from_previous_screen = this.props.navigation
		console.log(payload_from_previous_screen)
		
		var base64Image = "data:image/jpeg;base64," + payload_from_previous_screen.user_cover_image


		return (

			<SafeAreaView>
				<ScrollView contentContainerStyle={styles.screenContainer}>

					<View style={{
						backgroundColor: '#eee'
					}} >

		{/* -------------------- profile header starts here ------------------------ */}
						<View style={styles.headerContainer}>
							<ImageBackground 
								// source={{uri: base64Image}} 
								source={utils.image}

								style={styles.bgImage}
							>
								<Text style={styles.headerText}>
									Arsalan{payload_from_previous_screen.user_name_in_profile}
								</Text>						
							</ImageBackground>

						{/*social stats*/}
							<View style={styles.socialStatsContainer}>
								<View style={styles.friendsContainer}>
									<Text style={styles.statsCountText}>
										232
									</Text>
									<Text style={styles.statsNameText}>
										friends
									</Text>
								</View>

								<View style={styles.followersContainer}>
									<Text style={styles.statsCountText}>
										232
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
		{/* -------------------- profile header ends here ------------------------ */}




						</View>




						{(this.state.showOwnWallInstead) ? (

							<View>
					  			<ConnectedCreateSocialPost/>
					  		</View>

							) : (

								null

							)

						}



						{(this.state.showNonFriendsWallInstead || this.state.showOwnWallInstead) ? (

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

												comments_quantity = { item.comments_quantity }
												comments = { item.comments || [] }

												likes_quantity = { item.likes_quantity }
												likes = { item.likes || [] }

												shares_quantity = { item.shares_quantity }
												shares = { item.shares || [] }

												// user_quantity = { item.user_quantity }
												// user = { item.user || [] }

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