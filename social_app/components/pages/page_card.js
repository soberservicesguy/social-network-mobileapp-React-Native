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
	ComponentForShowingPage,
	ComponentForShowingPageCategory,
} from "."

import {
	ShowLikesOfPage,
} from "../likes"

import {
	ConnectedSummarizeLikesOfPage,
	ConnectedCreateLikeForPage
} from "../../redux_stuff/connected_components"

import utils from "../../utilities";


class PageCard extends Component {
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
		this.props.hide_likes_for_page()
	}

	componentWillUnmount(){
		this.props.hide_likes_for_page()
	}

	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/pages/get-all-likes-of-page', 
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
					<ComponentForShowingPage/>
		  		</View>


				<View style={styles.socialButtonsAndStatsContainer}>
					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_page()
						}}
					>						
						<ConnectedSummarizeLikesOfPage
							showOnlyQuantity = { this.props.show_page_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.createCommentAndLikeContainer}>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateLikeForPage
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
	}
}
	
PageCard.defaultProps = {
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

export default PageCard