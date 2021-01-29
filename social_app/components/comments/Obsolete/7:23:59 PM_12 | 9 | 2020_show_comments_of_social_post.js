
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import {
	Modal, 
	Grid, 
	// TextField,
	// Button 
} from "@material-ui/core";

import {
	ComponentForShowingComment
} from "."

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

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
	avatar: {
		// backgroundColor: red[500],
	},
});

class ShowCommentsOfSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			show_comment_modal: false,
		}

	}

	toggle_comment_modal(){
		this.setState(
			prev => (
				{
					...prev,
					show_comment_modal: (prev.show_comment_modal === false) ? true : false 
				}
			)
		)
	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (
		// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
			<div style={styles.outerContainer}>


	{/* showing Comment as expanded list is below */}
				<Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}}>

					{ this.props.dataPayloadFromParent.map((item, index) => (

						<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
							<ComponentForShowingComment
								componentData = { item }
							/>
						</Grid>
					))}

				</Grid>

{/* showing Comment as modal is below */}
				
				<Modal				  	
					open={this.state.show_comment_modal} // link some variable to it so that it could be turned off
					aria-labelledby="server-modal-title"
					aria-describedby="server-modal-description"
					className={styles.modal}
					// onClose={() => {Alert.alert("Modal has been closed.");}}
				>
					<div style={{
						// height:windowHeight, 
					}}>
		
						<button onClick={() => this.toggle_comment_modal()} 
							style={{
								// height:windowHeight * 0.1
							}}>
						</button>
						
						<Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}}>
	
							{ this.props.dataPayloadFromParent.map((item, index) => (

								<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
									<ComponentForShowingComment
										componentData = { item }
									/>
								</Grid>
							))}

						</Grid>
		
						<button onClick={() => this.toggle_comment_modal()} 
							style={{
								// height:windowHeight * 0.1
							}}>
						</button>
					</div>
				</Modal>


			</div>
		);
	}
}
	
ShowCommentsOfSocialPost.defaultProps = {

};


// export default ShowCommentsOfSocialPost // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ShowCommentsOfSocialPost))

