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

class IndividualBook extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			bookLiked:false,
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {

		const data = this.props.current_book

	  	return (
	  		<View style={{backgroundColor: '#eee'}}>
	  			{/* -------------------- profile header starts here ------------------------ */}
				<View style={styles.headerContainer}>
					<ImageBackground 
						// source={{uri: base64Image}} 
						source={{uri: "data:image/jpeg;base64," + data.book_image}}

						style={styles.bgImage}
					>
						<Text style={styles.headerText}>
							{data.book_name}
						</Text>
						<Text style={styles.headerText}>
							{data.book_description}
						</Text>						
					</ImageBackground>

				{/*social stats*/}
					<View style={styles.socialStatsContainer}>
						<View style={styles.followersContainer}>
							<Text style={styles.statsCountText}>
								0
							</Text>
							<Text style={styles.statsNameText}>
								followers
							</Text>
						</View>


						{(() => {
							if (!this.state.bookLiked){

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
											Like Book
										</Text>
									</View>
								</View>)

							} else if (this.state.bookLiked){

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
	
IndividualBook.defaultProps = {
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
		top:windowHeight * 0.64,
		left:windowWidth * 0.05,
		color: utils.maroonColor
	},
	bgImage:{
		resizeMode: "stretch",
		height: windowHeight * 0.7,
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
		backgroundColor: utils.maroonColor,
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

export default IndividualBook