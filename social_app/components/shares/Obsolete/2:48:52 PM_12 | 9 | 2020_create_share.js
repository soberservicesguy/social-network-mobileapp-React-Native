
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import {
	TextField,
	Grid, 
	// Modal, 
	// Button 
} from "@material-ui/core";

import {
	withRouter,
	Redirect,
} from "react-router-dom";

const styles = theme => ({
	root: {
		height: 48,
		color: props => (props.cool) ? 'red' : 'black',
		[theme.breakpoints.up('sm')]:{
			paddingLeft:100
		},
	},
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},
	textinputContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		// height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
	outerContainer: {
	},
	bigBlue: {
	},
});

class CreateShare extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			redirectToRoute: false,
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Individual-SocialPost" }} />

		} else {

		return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object

				<div style={styles.outerContainer}>

					<button style={styles.buttonWithoutBG}
						onClick={ () => {
							let setResponseInCurrentSocialPost = (arg) => this.props.set_current_socialpost(arg)
							let redirectToNewSocialPost = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

							// first create child object
							let share_object = {
							}

							// 2nd create linked object from redux (linked_object_and_live_object_in_redux in schema)
							let user_object = {

								phone_number: this.props.phone_number,
								user_name: this.props.user_name,
								user_name_in_profile: this.props.user_name_in_profile,
								user_avatar_image: this.props.user_avatar_image,
								user_cover_image: this.props.user_cover_image,
								user_brief_intro: this.props.user_brief_intro,
								user_about_me: this.props.user_about_me,
								user_working_zone: this.props.user_working_zone,
								user_education: this.props.user_education,
								user_contact_details: this.props.user_contact_details,
							}

							// 3rd create parent object								
							let socialpost_object = this.props.parentDetailsPayload

							// 4th making post request
							axios.post(utils.baseUrl + '/socialposts/create-share-for-socialpost', 
								{
									share_object: share_object,
									socialpost_object: socialpost_object,
									user_object: user_object,
								})
							.then(function (response) {
								console.log(response.data) // current socialpost screen data
								
								// set to current parent object
								setResponseInCurrentSocialPost(response.data)

								// change route to current_socialpost	
								redirectToNewSocialPost()							

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>
						<p style={styles.innerText}>
							Press To Create Share
						</p>
					</button>
				</div>
			);
		}
	}
}
	
CreateShare.defaultProps = {

};

// export default CreateShare;  // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(withStyles(styles)(CreateShare)))
