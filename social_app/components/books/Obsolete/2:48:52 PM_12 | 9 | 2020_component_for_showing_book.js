
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

class ComponentForShowingBook extends Component {
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
					{ data.book_name }
				</p>
				<p>
					{ data.book_image }
				</p>
				<p>
					{ data.book_description }
				</p>
				<p>
					{ data.endpoint }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingBook.defaultProps = {

};

// export default ComponentForShowingBook;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingBook))
