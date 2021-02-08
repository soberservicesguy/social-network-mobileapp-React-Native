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

import utils from "../../utilities";

import {
	ComponentForShowingSport,
} from "."

import {
	ShowLikesOfSport,
} from "../likes/"

import {
	ConnectedCreateLikeForSport,
	ConnectedSummarizeLikesOfSport,
} from "../../redux_stuff/connected_components"

class SportCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			likes:[],
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {
		this.props.hide_likes_for_sport()
	}

	componentWillUnmount(){
		this.props.hide_likes_for_sport()
	}

	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-likes-of-sport', 
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
					<ComponentForShowingSport/>
		  		</View>

				<View style={styles.socialButtonsAndStatsContainer}>
					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_sport()
						}}
					>						
						<ConnectedSummarizeLikesOfSport
							showOnlyQuantity = { this.props.show_sport_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.createCommentAndLikeContainer}>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateLikeForSport
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
	}
}
	
SportCard.defaultProps = {
	isCategoryInstead:true,
};

const styles = StyleSheet.create({
	outerContainer:{
	},

// comments and likes counts
	socialButtonsAndStatsContainer:{
		flexDirection:'row', 
		// justifyContent:'space-between',
		justifyContent:'flex-start',
	},
	socialButtonAndStats:{
		height:windowHeight * 0.05
	},

// create comment and like
	createCommentAndLikeContainer:{
		marginTop: windowHeight * 0.001,
	},
});

export default SportCard