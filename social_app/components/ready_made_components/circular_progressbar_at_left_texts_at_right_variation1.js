import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import {AnimatedCircularProgress} from "react-native-circular-progress";

import utils from "../utilities";
										
export default class CircularProgressbarAtLeftTextsAtRight extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			container:{
				display:'flex',
				flexDirection:'row',
				width:this.props.containerWidth, // '80%',
				alignSelf:'center',
				alignItems:'center',
				justifyContent:'center',
				paddingVertical: this.props.containerPadding,
			},
			progressContainer:{
				flex:1
			},
			percentageCompleteText:{
				fontSize:this.props.percentageCompleteFontSize,
				fontWeight:this.props.percentageCompleteFontWeight
			},
			textContainer:{
				flex:1,
				display:'flex',
				flexDirection:'column',
				alignItems: 'flex-start',
				justifyContent:'center',
				marginLeft:this.props.centralGap,
				paddingLeft:this.props.centralLineOffset,
				borderLeftColor: this.props.centralLineColor,
				borderLeftWidth:this.props.centralLineWidth
			}
		};
	
		return (
			<View style={componentStyle.container} >
				
				<View style={componentStyle.progressContainer}>
					<AnimatedCircularProgress
						fill={this.props.percentageComplete}
						arcSweepAngle={360}
						size={130}
						width={this.props.progressBarThickness}
						tintColor={'blue'}
						backgroundColor={'white'}
						rotation={0}
						children={()=>
							<Text style={componentStyle.percentageCompleteText} >
								{this.props.percentageComplete}%
							</Text>
						}
					/>
				</View>

				<View style={componentStyle.textContainer} >
					<View>
						<Text style={{fontSize:this.props.topTextFontSize}}>Calories</Text>
					</View>
					<View>
						<Text style={{fontSize:this.props.centralTextFontSize}}>27</Text>
					</View>
					<View>
						<Text style={{fontSize:this.props.bottomTextFontSize}}>of 160</Text>
					</View>

				</View>
			</View>
		);
	}
}

CircularProgressbarAtLeftTextsAtRight.defaultProps = {
  // : ,
  percentageComplete:45,
  containerWidth:'80%',
  containerPadding:10,
	percentageCompleteFontSize: 40,
	percentageCompleteFontWeight: 'bold',
	centralGap:60,
	centralLineOffset:20,
	centralLineColor:'black',
	centralLineWidth:2,
	percentageComplete:45,
	progressBarThickness:5,
	topTextFontSize:20,
	centralTextFontSize:50,
	bottomTextFontSize:20
};