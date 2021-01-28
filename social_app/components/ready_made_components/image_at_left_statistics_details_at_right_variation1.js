import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import { ProgressBar } from '@react-native-community/progress-bar-android';

import utils from "../utilities";

export default class ImageAtLeftAndDetailedStatisticsAtRight extends Component {
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
				// backgroundColor: this.props.backgroundColor
			},
			imageContainer:{
				flex:3,
				paddingLeft:30,
				// display: this.props.showImage,
				// flexGrow: this.props.imageFlexGrow,
			},
			image:{
				resizeMode: "contain",
			  height: '100%',
			  width: '100%',
			},
			textContainer:{
				flex:8,
				display: this.props.showText,
				// flexGrow: this.props.textFlexGrow,
				paddingLeft:20,
				paddingRight: 10
			},
			heading:{
			  color: this.props.headingTextColor,
			  fontSize: this.props.headingFontSize,
			  fontStyle: this.props.headingFontStyle,
			  textAlign: 'left',
			  fontWeight: this.props.headingFontWeight 
			},
			description:{
			  color: this.props.descriptionTextColor,
			  fontSize: this.props.descriptionFontSize,
			  fontStyle: this.props.descriptionFontStyle,
			  textAlign: 'left',
			  fontWeight: this.props.descriptionFontWeight 
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
			    <View style={{
			    	display:'flex',
			    	flexDirection: 'row'
			    }} >
				    <ProgressBar
	            styleAttr="Horizontal" // 'Horizontal / Normal (default) / Small / Large / Inverse / SmallInverse / LargeInverse'
	            indeterminate={false}
	            progress={1}

	            // animating={true}
	            color={'black'}
	            style={{
	            	flex:9
	            }}
	          />
	          <View style={{
	          	flex:3,
	          	paddingLeft:10
	          }} >
	          	<Text>56%</Text>
	          </View>
	        </View>

	        <View style={{
	        	display: 'flex',
	        	flexDirection:'row'
	        }} >
	        	<View style={{
	        		flex:1
	        	}} >
	        		<Text style={componentStyle.description}>
			        	<Text >
			        		{this.props.statsVariable1}
			          </Text>
			        	<Text style={{color:this.props.statsValuesColor, fontWeight: 'bold' }} >
			        		{this.props.valueForVariable1}
			          </Text>
			        </Text>
		        </View>

		        <View style={{
	        		flex:1
	        	}}>
	        		<Text style={componentStyle.description}>
			        	<Text>
										{this.props.statsVariable2}
			          </Text>
			        	<Text style={{color:this.props.statsValuesColor, fontWeight: 'bold' }} >
			        		{this.props.valueForVariable2}
			          </Text>
			        </Text>
		      	</View>    
	        </View>

	  </View>

			</View>
		);
	}
}

ImageAtLeftAndDetailedStatisticsAtRight.defaultProps = {
  // imageSource:
  headingName:'Default Category',
  description:'default lorem ipsum',
  containerWidth: '100%' ,
  containerHeight: 70,
  backgroundColor: 'white',
  showImage: 'flex' ,
  imageFlexGrow: 1,
  imageHeight: 50,
  imageWidth: 50,
  showText: 'flex',
  textFlexGrow: 1,
  headingTextColor: '#000000',
  headingFontSize: 15,
  headingFontStyle: 'normal',
  headingFontWeight: 'bold',
  endGapWidth:10,
  descriptionTextColor:'#000000' ,
  descriptionFontSize: 13,
  descriptionFontStyle: 'normal',
  descriptionFontWeight: 'normal',
  statsVariable1:'Weight:',
  valueForVariable1:'100kg',
  statsVariable2:'Height:',
  valueForVariable2:"6'3'",
  statsValuesColor:'white'
};