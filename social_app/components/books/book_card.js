import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
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
	ShowLikesOfBook,
} from "../likes/";

import utils from "../../utilities";


class BookCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			likes: [],
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

		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
			  		<ComponentForShowingBook/>
		  		</View>

				<View style={styles.socialButtonsAndStatsContainer}>
					{/* 2nd show individual summary of childs */}
					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_book()
						}}
					>						
						<ConnectedSummarizeLikesOfBook
							showOnlyQuantity = { this.props.show_book_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>

					<ConnectedCreateLikeForBook
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
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

});

export default BookCard