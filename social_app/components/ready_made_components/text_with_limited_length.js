import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import utils from "../utilities";

export default class LimitedText extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			container:{
				width:this.props.contentWidth,
				height: this.props.height,
				alignItems: this.props.horizontalAlign,
				justifyContent: this.props.verticalAlign  
			},

			text:{
				fontWeight: this.props.fontWeight,
				fontSize: this.props.fontSize,
				color: this.props.color,
				textAlign: this.props.textAlign, 
				fontStyle: this.props.fontStyle,
				letterSpacing: this.props.letterSpacing,
				lineHeight: this.props.lineHeight,
			}

		};
	
		return (
			<View style={componentStyle.container}>
				<Text style={componentStyle.text}>
					<Text  
						numberOfLines={this.props.textNumberOfLines}>
						{this.props.textContent.length < this.props.maxLetters
						? `${this.props.textContent}`
						: `${this.props.textContent.substring(0, this.props.maxLetters)}` }
					</Text>
					<Text style={{color:this.props.textEnderColor}}>
						{this.props.textEnder}
					</Text>
				</Text>
			</View>
		);
	}
}

LimitedText.defaultProps = {
	textContent: 'this is du this is du this is du this is du this is du this is du this is du this is du ',
  maxLetters:70,
  contentWidth: '90%',
  textEnder:'...more',
  textEnderColor: 'blue',
  height: 100,
  horizontalAlign:'center',
	verticalAlign:'center',
	fontWeight:'normal',
	fontSize:15,
	color:'black',
	textAlign:'center',
	fontStyle:'normal',
	letterSpacing:.5,
	textNumberOfLines: 2,
};