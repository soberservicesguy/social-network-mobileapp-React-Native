import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import utils from "../utilities";

export default class ImageAtTopTextsAtBottom extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			container:{
				width: this.props.containerWidth,
				// height: this.props.containerHeight,
				marginVertical: 4,
				alignSelf: 'flex-start', 
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: this.props.backgroundColor
			},
			imageContainer:{
				flex:1,
				display: this.props.showImage,
				flexGrow: this.props.imageFlexGrow,
			},
			image:{
				resizeMode: "stretch",
			  height: this.props.imageHeight,
			  width: this.props.imageWidth,
			},
			textContainer:{
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
				height:this.props.endGapHeight,

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
			  <View style={componentStyle.gap} >
			  </View>

			  <View style={componentStyle.textContainer} >
			  	<Text style={componentStyle.description} >
			  		{this.props.description}
			    </Text>
			  	<Text style={componentStyle.heading} >
			  		{this.props.headingName}
			    </Text>
			  </View>

			  <View style={componentStyle.gap} >
			  </View>

			</View>			
		);
	}
}

ImageAtTopTextsAtBottom.defaultProps = {
  headingName:'Default Category',
  description:'default lorem ipsum',
  containerWidth: '49%' ,
  // containerHeight:'99%',
  // containerHeight: 70,
  backgroundColor: 'white',
  showImage: 'flex' ,
  imageFlexGrow: 1,
  imageHeight: 150,
  imageWidth: 178,
  showText: 'flex',
  textFlexGrow: 1,
  headingTextColor: '#000000',
  headingFontSize: 15,
  headingFontStyle: 'normal',
  headingFontWeight: 'bold',
  endGapHeight:10
};