
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

const styles = theme => ({
	outerContainer: {
	},
});

class ComponentForShowingAdvertisement extends Component {
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

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist

		return (
			<div style={styles.outerContainer}>
				<p>
					{ data.ad_name }
				</p>
				<p>
					{ data.ad_image }
				</p>
				<p>
					{ data.ad_description }
				</p>
				<p>
					{ data.endpoint }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingAdvertisement.defaultProps = {

};

// export default ComponentForShowingAdvertisement;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingAdvertisement))
