import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import utils from "../utilities";

export default class ImageAtLeftTextsAtRight extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const componentStyle = {
			container:{
				width: this.props.containerWidth,
				height: this.props.containerHeight,
				alignSelf: 'center', 
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'row',
				backgroundColor: this.props.backgroundColor
			},
			imageContainer:{
				flex:1,
				display: this.props.showImage,
				flexGrow: this.props.imageFlexGrow,
			},
			image:{
				resizeMode: this.props.imageResizeMode,
			  height: this.props.imageHeight,
			  width: this.props.imageWidth,
			},
			textContainer:{
				left:this.props.centralGap,
				flex:1,
				display: this.props.showText,
				flexGrow: this.props.textFlexGrow,
			},
			heading:{
			  color: this.props.headingTextColor,
			  fontSize: this.props.headingFontSize,
			  fontStyle: this.props.headingFontStyle,
			  textAlign: 'left',
			  fontWeight: this.props.headingFontWeight 
			},
			gap:{
				width:this.props.endGapWidth
			},
			description:{
				color: this.props.descriptionTextColor,
			}
		};
		return (
			<View style={componentStyle.container} >
			  <View style={componentStyle.imageContainer} >
	    	  	<Image
	  	  	  	source={this.props.imageSource}
	  	  	  	style={componentStyle.image}
	    	  	/>
			  </View>

			  <View style={componentStyle.textContainer} >
			  	<Text style={componentStyle.heading} >
			  		{this.props.headingName}
			    </Text>
			  	<Text style={componentStyle.description} >
			  		{this.props.description}
			    </Text>
			  </View>

			  <View style={componentStyle.gap} >

			  </View>
			</View>
		);
	}
}

ImageAtLeftTextsAtRight.defaultProps = {
  // imageSource:
  centralGap:0,
  imageResizeMode:'center',
  headingName:'Default Category',
  description:'default lorem ipsum',
  containerWidth: '90%' ,
  containerHeight: 70,
  backgroundColor: 'white',
  showImage: 'flex' ,
  imageFlexGrow: 1,
  imageHeight: 50,
  imageWidth: 50,
  showText: 'flex',
  textFlexGrow: 1,
  headingTextColor: '#000000',
  descriptionTextColor:'#000000',
  headingFontSize: 15,
  headingFontStyle: 'normal',
  headingFontWeight: 'bold',
  endGapWidth:10
};