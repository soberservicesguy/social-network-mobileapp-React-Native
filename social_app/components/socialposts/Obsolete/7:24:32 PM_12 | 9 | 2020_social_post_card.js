
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	withRouter,
	Link,
} from "react-router-dom";

import axios from 'axios';
import firebase from 'firebase';

import {
	ComponentForShowingSocialPost
} from "."

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import {
	SummarizeCommentsOfSocialPost,
	ShowCommentsOfSocialPost,
} from "../comments/"

import {
	ConnectedCreateComment,
} from "../../redux_stuff/connected_components"


import {
	SummarizeLikesOfSocialPost,
	ShowLikesOfSocialPost,
} from "../likes/"

import {
	ConnectedCreateLike,
} from "../../redux_stuff/connected_components"


import {
	SummarizeSharesOfSocialPost,
	ShowSharesOfSocialPost,
} from "../shares/"

import {
	ConnectedCreateShare,
} from "../../redux_stuff/connected_components"



const styles = theme => ({
	root: {
		maxWidth: 380,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

});

class SocialPostCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			comments: [],
			likes: [],
			shares: [],
			users: [],
		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-comments-of-sport', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, comments: ( prev.comments.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
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


	fetchAllShare(endpoint) {

		axios.get(utils.baseUrl + '/sports/get-all-shares-of-sport', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, shares: ( prev.shares.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}



// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (
		  	<div>

		  		<div>
					{/* first the parent / card component */}
			  		<ComponentForShowingSocialPost
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</div>

				<div>
					{/* 2nd show individual summary of childs */}
					<SummarizeCommentsOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.comments_quantity }
						dataPayloadFromParent = { this.props.comments }
					/>
					<SummarizeLikesOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.likes_quantity }
						dataPayloadFromParent = { this.props.likes }
					/>
					<SummarizeSharesOfSocialPost
						showOnlyQuantity= { false }
						child_quantity = { this.props.shares_quantity }
						dataPayloadFromParent = { this.props.shares }
					/>
				</div>

				<div>
					{/* 3rd show individual button for showing childs */}

					<button style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) }
					>
						<p>
							Show All Comment
						</p>
					</button>
					
					<ShowCommentsOfSocialPost
						dataPayloadFromParent = { this.state.comments }
					/>

					<button style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
					>
						<p>
							Show All Like
						</p>
					</button>
					
					<ShowLikesOfSocialPost
						dataPayloadFromParent = { this.state.likes }
					/>

					<button style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllShare( this.props.dataPayloadFromParent.endpoint ) }
					>
						<p>
							Show All Share
						</p>
					</button>
					
					<ShowSharesOfSocialPost
						dataPayloadFromParent = { this.state.shares }
					/>
				</div>

				<div>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateComment
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateLike
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateShare
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</div>

		  	</div>
		);
	}
}
	
SocialPostCard.defaultProps = {

};

// export default SocialPostCard; // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(SocialPostCard));
