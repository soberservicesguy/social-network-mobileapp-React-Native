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

import {
	ConnectedCreateLikeForBook,
	ConnectedSummarizeLikesOfBook,
} from "../../redux_stuff/connected_components"

import {
	ComponentForShowingBook,
} from "."

import {
	ComponentForShowingLike,
} from "../likes/";

import utils from "../../utilities";

import { Icon } from 'react-native-elements';

class BookCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			likes: [],
			current_likes_quantity: this.props.likes_quantity,
			show_all_likes: false,

		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {
		this.props.hide_likes_for_book()
	}

	componentWillUnmount(){
		this.props.hide_likes_for_book()
	}

	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/books/get-all-likes-of-book', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, likes: ( prev.likes.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}


	render() {

		if (this.state.show_all_likes){

			<View style={{
				height:windowHeight, 
			}}>
				<TouchableOpacity
					style={styles.socialButtonAndStats}
					activeOpacity={0.2} 
					onPress={ () => {

						this.setState(prev => ({...prev, 
							show_all_likes: false,
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

		} else {

			return (
			  	<View>

			  		<View>
				  		<ComponentForShowingBook
				  			useOwnData = {true}
				  			getIndividualImage = {this.props.getIndividualImage}
				  			dataPayloadFromParent = { this.props.dataPayloadFromParent }
				  		/>
			  		</View>

					<View style={styles.socialButtonsAndStatsContainer}>
						<TouchableOpacity 
							style={styles.socialButtonAndStats}
							activeOpacity={0.2} 
							onPress={ () => { 
								this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 

	  							this.setState(prev => ({...prev, 
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

						<ConnectedCreateLikeForBook
							parentDetailsPayload = { this.props.dataPayloadFromParent }
							navigation={this.props.navigation}
							add_likes_quantity = {() => this.setState(prev => ({...prev, current_likes_quantity: prev.current_likes_quantity + 1}))}
						/>
					</View>

			  	</View>
			);
		}
	}
}
	
BookCard.defaultProps = {
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
		// borderBottomColor: utils.dimWhite,
		// borderBottomWidth: 1,
		width:'90%',
		alignSelf:'center',
		marginBottom:10,
		paddingBottom:10,
		// backgroundColor: '#000000'

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

export default BookCard