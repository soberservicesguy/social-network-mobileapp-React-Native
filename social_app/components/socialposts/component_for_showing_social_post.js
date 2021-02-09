import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Video from 'react-native-video'
import { Icon } from 'react-native-elements';

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

	playVideo(){

	}

	render() {

		// const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		const data = {type_of_post:'text_with_video_post'}
		// var base64Image = "data:image/jpeg;base64," + data.image_for_post

		return (
			<View style={styles.outerContainer}>

			{(() => {

				if (data.type_of_post === 'text_post'){

					return (
						<View style={styles.innerContainer}>
							
							<View style={styles.imageContainer}>
								<Image 
									source={utils.image}
									// source={{uri: base64Image}} 
									style={styles.imageStyle}
								/>
							</View>
							
							<View style={styles.textContainer}>
								<Text style={styles.nameText}>
									hoi
								</Text>

								<Text style={styles.postText}>
									{ data.post_text } This is gonna be the greatest attempt in my life
								</Text>
							</View>
						</View>
					)

				} else if (data.type_of_post === 'image_post'){

					return (
						<View>
							<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
								
								<View style={styles.imageContainer}>
									<Image 
										source={utils.image}
										// source={{uri: base64Image}} 
										style={styles.imageStyle}
									/>
								</View>
								
								<View style={styles.textContainer}>
									<Text style={styles.nameText}>
										hoi ss
	 								</Text>

								</View>

							</View>

							<View>							
								<Image 
									source={utils.image}
									// source={{uri: base64Image}} 
									style={styles.imagePostStyle}
								/>
							</View>
							
						</View>
					)

				} else if (data.type_of_post === 'video_post'){

					return (
						<View>
							<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
								
								<View style={styles.imageContainer}>
									<Image 
										source={utils.image}
										// source={{uri: base64Image}} 
										style={styles.imageStyle}
									/>
								</View>
								
								<View style={styles.textContainer}>
									<Text style={styles.nameText}>
										hoi sss
	 								</Text>

								</View>

							</View>

							<View>							

								<Video 
									source={{uri: `${utils.baseUrl}video-stream/video?endpoint=${data.video_for_post}`}} 
									// onBuffer={this.onBuffer}
									// onError={this.videoError}
									style={styles.backgroundVideo}
									// ref={(ref) => {this.player = ref}} 
								/>

								<View style={{position:'absolute',top:windowHeight * 0.15 - 25/2, left:windowWidth * 0.5 - 25}}>
									<Icon
										name={utils.playIcon}
										type='font-awesome'
										color='#f50'
										size={50}
										onPress={() => this.playVideo()} 
										// reverse={true}
									/>
								</View>
								
							</View>
							
						</View>
					)

				} else if (data.type_of_post === 'text_with_image_post'){

					return (
						<View>
							<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
								
								<View style={styles.imageContainer}>
									<Image 
										source={utils.image}
										// source={{uri: base64Image}} 
										style={styles.imageStyle}
									/>
								</View>
								
								<View style={styles.textContainer}>
									<Text style={styles.nameText}>
										hoi ss
	 								</Text>

								</View>

							</View>

							<View>							
								<Image 
									source={utils.image}
									// source={{uri: base64Image}} 
									style={{...styles.imagePostStyle, marginBottom:10,}}
								/>
							</View>

							<Text style={{...styles.postText, width:'90%', alignSelf:'center'}}>
								{ data.post_text } This is gonna be the greatest attempt in my life This is gonna be the greatest attempt in my lifeThis is gonna be the greatest attempt in my life
							</Text>
							
						</View>
					)

				} else if (data.type_of_post === 'text_with_video_post'){

					return (
						<View>
							<View style={{...styles.innerContainer, alignItems:'flex-end'}}>
								
								<View style={styles.imageContainer}>
									<Image 
										source={utils.image}
										// source={{uri: base64Image}} 
										style={styles.imageStyle}
									/>
								</View>
								
								<View style={styles.textContainer}>
									<Text style={styles.nameText}>
										hoi ss
	 								</Text>

								</View>

							</View>

							<View>							

								<Video 
									source={{uri: `${utils.baseUrl}video-stream/video?endpoint=${data.video_for_post}`}} 
									// onBuffer={this.onBuffer}
									// onError={this.videoError}
									style={styles.backgroundVideo}
									// ref={(ref) => {this.player = ref}} 
								/>

								<View style={{position:'absolute',top:windowHeight * 0.15 - 25/2, left:windowWidth * 0.5 - 25}}>
									<Icon
										name={utils.playIcon}
										type='font-awesome'
										color='#f50'
										size={50}
										onPress={() => this.playVideo()} 
										// reverse={true}
									/>
								</View>
								
							</View>

							<Text style={{...styles.postText, width:'90%', alignSelf:'center'}}>
								{ data.post_text } This is gonna be the greatest attempt in my life This is gonna be the greatest attempt in my lifeThis is gonna be the greatest attempt in my life
							</Text>
							
						</View>
					)

				} else {
					return (
						null
					)
				}

			})()}
{/*				
				<Text>
					{ data.video_thumbnail_image }
				</Text>
				<Text>
					{ data.total_likes }
				</Text>
				<Text>
					{ data.total_shares }
				</Text>
				<Text>
					{ data.endpoint }
				</Text>
				<Text>
					{ data.date_of_publishing }
				</Text>*/}
			</View>
		);
	}
}
	
ComponentForShowingSocialPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		// backgroundColor: '#000000'
		marginBottom:10,
	},

	innerContainer:{
		flexDirection: 'row',
		alignItems:'flex-start',
		justifyContent:'center',
		width:'90%',
		alignSelf:'center',
		// backgroundColor: '#000000'
	},


// AVATAR
	imageStyle:{
		resizeMode: "stretch",
		height: '100%',
		width: '100%',
		borderRadius: windowWidth * 1/2,
	},
	imagePostStyle:{
		marginTop:10,
		width:'100%',
		height:windowHeight * 0.3
	},
	
	imageContainer:{
		flex:1,
		height: windowHeight * 0.1, // or 100
		// width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'flex-start', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},

	textContainer:{
		marginLeft:10,
		flex:4,
		// backgroundColor: '#000000'
	},
	postText:{
		fontSize:18,
		color:utils.mediumGrey
	},
	nameText:{
		fontSize:20,
		color:utils.darkBlue		
	},

	backgroundVideo:{
		marginTop:10,
		width:'100%',
		height:windowHeight * 0.3,
		backgroundColor: 'green'
	}

});

export default ComponentForShowingSocialPost