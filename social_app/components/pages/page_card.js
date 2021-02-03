import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import {
	ComponentForShowingPage
} from "."

import {
	SummarizeLikesOfPage,
	ShowLikesOfPage,
} from "../likes"

import {
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
			  		<ComponentForShowingPage
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View>
					{/* 2nd show individual summary of childs */}
					<SummarizeLikesOfPage
						showOnlyQuantity= { false }
						child_quantity = { this.props.likes_quantity }
						dataPayloadFromParent = { this.props.likes }
					/>
				</View>

				<View>
					{/* 3rd show individual button for showing childs */}
					<Button
						title={'Show All Like'} 
						style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowLikesOfPage
						dataPayloadFromParent = { this.state.likes }
					/>
				</View>

				<View>
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

};

const styles = StyleSheet.create({
	container: {
	},
	bigBlue: {
	},					
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},

});

export default PageCard