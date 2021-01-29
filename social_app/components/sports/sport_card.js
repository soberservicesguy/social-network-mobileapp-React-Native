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
import firebase from 'firebase';

import { Consumer } from "../../screens/sport"

import utils from "../../utilities";

import {
	ComponentForShowingSport
} from "."

import {
	SummarizeLikesOfSport,
	ShowLikesOfSport,
} from "../likes/"

import {
	ConnectedCreateLikeForSport,
} from "../../redux_stuff/connected_components"

class SportCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			likes:[],
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {

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

	render() {

		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
			  		<ComponentForShowingSport
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View>
					{/* 2nd show individual summary of childs */}
					<SummarizeLikesOfSport
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
					
					<ShowLikesOfSport
						dataPayloadFromParent = { this.state.likes }
					/>
				</View>

				<View>
					{/* 4th create individual child options like comment / like */}
					<ConnectedCreateLikeForSport
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
	}
}
	
SportCard.defaultProps = {

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

export default SportCard