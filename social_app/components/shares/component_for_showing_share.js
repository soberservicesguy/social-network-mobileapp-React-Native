import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingShare extends Component {
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
								resizeMode: "stretch",
								borderRadius: 1000,
							}}
						/>
					</View>
				
				
					<View style={styles.usernameContainer}>
						<Text style={styles.usernameText}>
							{data.user_name}
						</Text>					
					</View>
				
				</View>
			</View>
		);
	}
}
	
ComponentForShowingShare.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		alignSelf: 'center', 
		width:windowWidth * 0.8,
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		// backgroundColor: '#eee',
		borderBottomWidth:1,
		borderBottomColor:'black',
		borderStyle:'solid',
		paddingBottom:20,
		marginBottom:20,
		justifyContent: 'center',
		height:100
	},

	usernameText:{
		fontSize:20,
		fontWeight:'bold',
		color:'black',
		marginLeft:30
	},

	imageContainer:{
		flex:1,
		borderRadius: 1000,

	},
	usernameContainer:{
		flex:3,
	},
});

export default ComponentForShowingShare