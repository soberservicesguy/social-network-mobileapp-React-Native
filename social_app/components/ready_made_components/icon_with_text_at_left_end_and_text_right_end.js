import React, { Component } from 'react';
import { 
  View, 
  Text,
} from "react-native";
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';

import utils from "../utilities";

export default class IconWIthTextAtLeftEndAndTextAtRightEnd extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			container:{
				width:this.props.containerWidth,
				height:this.props.containerHeight,
				display: 'flex',
				flexDirection:'row',
				alignSelf:'center',
				alignItems:'center',
				justifyContent: 'flex-start'
			},
			iconContainer:{
				flex:1
			},
			leftTextContainer:{
				flex:2,
			},
			rightTextContainer:{
				flex:5,
				// justifySelf: 'flex-end'
			},
			textAtLeft:{
				fontSize: this.props.leftTextFontSize,
				color: this.props.leftTextColor,
				fontWeight: this.props.leftTextFontWeight,
			},
			textAtRight:{
				textAlign:'right',
				marginRight:this.props.rightTextEngGap,
				fontSize: this.props.rightTextFontSize,
				color: this.props.rightTextColor,
				fontWeight: this.props.rightTextFontWeight,

			 },
		};
	
		return (
			<View style={componentStyle.container} >
				<View style={componentStyle.iconContainer} >
					<Icon
					  raised={this.props.iconFilled}
					  name={this.props.iconName} // 'heartbeat'
					  type={this.props.iconType} // 'font-awesome'
					  iconStyle='Outlined'
					  color={this.props.iconColor} // '#f50'
					  size={this.props.iconSize} // {10}
					  // onPress={() => console.log('hello')} 
					  // reverse={true}
					/>
										
				</View>

				<View style={componentStyle.leftTextContainer} >
					<Text style={componentStyle.textAtLeft}>
						Running
					</Text>
				</View>

				<View style={componentStyle.rightTextContainer} >
					<Text style={componentStyle.textAtRight}>
						3.25 km
					</Text>
				</View>

			</View>
		);
	}
}

IconWIthTextAtLeftEndAndTextAtRightEnd.defaultProps = {
  // : ,
  containerWidth:'90%',
  containerHeight:50,
  leftTextFontSize:15,
  leftTextColor:'black',
  leftTextFontWeight:'bold',
  rightTextFontSize:15,
  rightTextColor:'black',
  rightTextFontWeight:'normal',
  rightTextEngGap:10,
  iconFilled:false,
  iconName:'heartbeat',
  iconType:'font-awesome',
  iconColor:'#f50',
  iconSize:15,
};