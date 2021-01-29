
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

class ComponentForShowingSport extends Component {
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
					{ data.sport_name }
				</p>
				<p>
					{ data.sport_image }
				</p>
				<p>
					{ data.sport_description }
				</p>
				<p>
					{ data.endpoint }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingSport.defaultProps = {

};

// export default ComponentForShowingSport;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingSport))
