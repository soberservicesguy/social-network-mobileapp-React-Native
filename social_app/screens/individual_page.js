import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
	ImageBackground,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/books/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedComponentForShowingBook,
	ConnectedCreateBook,
} from '../redux_stuff/connected_components';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';


class IndividualPage extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			pageLiked:false
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {

		const payload_from_previous_screen = this.props.navigation
		console.log(payload_from_previous_screen)
		
		var base64Image = "data:image/jpeg;base64," + payload_from_previous_screen.user_cover_image

	  	return (
	  		<View style={{backgroundColor: '#eee'}}>
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
							if (!this.state.pageLiked){

								return (<View style={styles.likeContainer}>
									
									<Icon
										// raised
										name={utils.likeIcon}
										type='font-awesome'
										color='#f50'
										size={20}
										// onPress={() => console.log('hello')} 
										// reverse={true}
									/>
									
									<View style={{width:windowWidth*0.2}}>
										<Text style={styles.sendRequestText}>
											Like Page
										</Text>
									</View>
								</View>)

							} else if (this.state.pageLiked){

								return (<View style={styles.unLikeContainer}>
									<Icon
										// raised
										name={utils.unLikeIcon}
										type='font-awesome'
										color='#f50'
										size={20}
										// onPress={() => console.log('hello')} 
										// reverse={true}
									/>
									<View style={{width:windowWidth*0.2}}>
										<Text style={styles.unLikeText}>
											Un-like
										</Text>
									</View>
								</View>)

							} else{
								null
							}
					
						})()}

					</View>
				</View>

	  			{/* -------------------- profile header ends here ------------------------ */}


	  		</View>
		);
	}
}
	
IndividualPage.defaultProps = {
	//:,
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
		fontWeight:'bold',
		fontSize:20,
		position:'absolute',
		top:windowHeight * 0.44,
		left:windowWidth * 0.05,
	},
	bgImage:{
		resizeMode: "stretch",
		height: windowHeight * 0.5,
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
	likeContainer:{
		flex:1,
		flexDirection: 'row',
		backgroundColor: utils.darkGreen,
		height:windowHeight * 0.07,
		borderRadius:10,
		justifyContent: 'center',
		alignItems:'center',

	},
	unLikeContainer:{
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
	unLikeText:{
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

export default IndividualPage