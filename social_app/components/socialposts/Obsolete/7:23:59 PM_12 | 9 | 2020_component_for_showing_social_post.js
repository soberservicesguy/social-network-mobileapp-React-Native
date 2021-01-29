
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

class ComponentForShowingSocialPost extends Component {
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
					{ data.type_of_post }
				</p>
				<p>
					{ data.post_text }
				</p>
				<p>
					{ data.image_for_post }
				</p>
				<p>
					{ data.video_for_post }
				</p>
				<p>
					{ data.video_thumbnail_image }
				</p>
				<p>
					{ data.total_likes }
				</p>
				<p>
					{ data.total_shares }
				</p>
				<p>
					{ data.endpoint }
				</p>
				<p>
					{ data.date_of_publishing }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingSocialPost.defaultProps = {

};

// export default ComponentForShowingSocialPost;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingSocialPost))
