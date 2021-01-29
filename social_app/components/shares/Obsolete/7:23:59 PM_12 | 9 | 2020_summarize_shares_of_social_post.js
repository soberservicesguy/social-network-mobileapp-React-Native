
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import {
	ComponentForShowingShare
} from "."

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import {
	Grid, 
	// Modal, 
	// TextField,
	// Button 
} from "@material-ui/core";

const styles = theme => ({
	outerContainer: {
	},
});

class SummarizeSharesOfSocialPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (

			<div style={styles.outerContainer}>

				{( this.props.showOnlyQuantity ) ? (

					<div>
						<p>
							{this.props.child_quantity} share
						</p>
					</div>

				) : (

					<Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}}>

						{ this.props.dataPayloadFromParent.map((item, index) => (

							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<ComponentForShowingShare
									componentData = { item }
								/>
							</Grid>
						))}

					</Grid>
				)}
			</div>
		);
	}
}
	
SummarizeSharesOfSocialPost.defaultProps = {

};

// export default SummarizeSharesOfSocialPost; // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(SummarizeSharesOfSocialPost))
