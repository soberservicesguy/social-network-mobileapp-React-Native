import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingComment extends Component {
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

		const data = this.props.componentData // data being plugged from parent flatlist

		var base64Image = "data:image/jpeg;base64," + data.user_avatar_image
		
		return (
		
			<View style={{width: windowWidth}}>
				<View style={styles.outerContainer}>

					<View style={styles.imageContainer}>
						<Image 
							source={{uri: base64Image}} 
							style={{
								width:100, 
								height:100, 
								resizeMode: "cover",
								borderRadius: 50,
							}}
						/>
					</View>
				
			
				
					<View style={styles.commentContainer}>
						<Text style={styles.usernameText}>
							{data.user_name}
						</Text>					

						<Text style={styles.commentText}>
							{data.comment_text}
						</Text>
					</View>
			
				</View>
			</View>
		);
	}
}
	
ComponentForShowingComment.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer:{
		alignSelf: 'center', 
		width:windowWidth * 0.8,

		justifyContent: 'center',
		height:100,
		// margin:'auto',
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor: '#eee',
		borderBottomWidth:1,
		borderBottomColor:'black',
		borderStyle:'solid',
		paddingBottom:20,
		marginBottom:20,
	},

	usernameText:{
		fontSize:20,
		fontWeight:'bold',
	},
	commentText:{
		fontSize:20,
		color:'grey'
	},

	imageContainer:{
		flex:1
	},
	commentContainer:{
		flex:2,
		marginLeft:20
	},
});

export default ComponentForShowingComment