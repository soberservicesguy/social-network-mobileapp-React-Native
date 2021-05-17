import React, { Component } from 'react';
import { 
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

class ComponentForShowingLike extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (prevProps.componentData !== this.props.componentData){
			
		}

	}

	render() {

		const data = this.props.componentData // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.user_avatar_image


		console.log('data')
		console.log(Object.keys(data))

		console.log('somehtin')

		// console.log('data.user_name')
		// console.log(data.user_name)


		// return (
		// 	<div style={styles.outerContainer}>
		// 		<div style={styles.imageContainer}>
		// 			<img src={base64Image} alt="" 
		// 				style={{
		// 					width:100, 
		// 					height:100, 
		// 					resizeMode: "contain",
		// 					borderRadius: 100/2,
		// 				}}
		// 			/>
		// 		</div>
			
			
		// 		<div style={styles.usernameContainer}>
		// 			<p style={styles.usernameText}>
		// 				{data.user_name}
		// 			</p>					
		// 		</div>
			
		// 	</div>

		// );

		return (
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
						ssss{data.user_name}
					</Text>					
				</View>
			
			</View>
		);
	}

}
	
ComponentForShowingLike.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer:{
		width:'80%',
		alignSelf: 'center',

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

export default ComponentForShowingLike