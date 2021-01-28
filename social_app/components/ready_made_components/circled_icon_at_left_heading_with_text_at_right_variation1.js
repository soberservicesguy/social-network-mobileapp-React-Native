import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
					
import Svg, {
  Circle,
} from 'react-native-svg';

// IMPORTING OTHER CREATED COMPONENT
// DEPENDS ON CircledComponent !!! 
import {CircledComponent} from "."; 

import utils from "../utilities";

export default class CircledIconAtLeftAndHeadingWithTextAtRight extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
		};
		
		const onLayout = function(event){
		  console.log(event.nativeEvent.layout)
		};

		return (
			<View 
				style={{
					display:'flex',
					flexDirection:'row',
					alignSelf:'center',
					alignItems: 'center',
					justifyContent: 'center'
				}} 
			>
				<View 
					style={{
						flex:1,
					}} 
				>
					<CircledComponent
						circleDia={50}
						circleFillColor={null}
						childWidthOrHeight={this.props.iconSize}
					>
						<Icon
						  // raised
						  name={this.props.iconName} //'heartbeat'
						  type={this.props.iconType} //'font-awesome'
						  iconStyle={this.props.iconStyle} //'Outlined'
						  color={this.props.iconColor} //'#f50'
						  size={this.props.iconSize} //{30}
						  // onPress={() => console.log('hello')} 
						  // reverse={true}
						/>
					</CircledComponent>


				</View>
				
				<View 
					style={{
						flex:3,
						paddingLeft:this.props.centralGap
					}} 
				>
					<Text style={{
						color:this.props.colorText1,
						fontWeight:'bold'
					}}
					>
						{this.props.text1}
					</Text>

					<Text style={{
						color:this.props.colorText2,
						fontSize:12
						// fontWeight:'bold'
					}}
					>
						{this.props.text2}
					</Text>
				</View>	
			</View>
		);
	}
}

CircledIconAtLeftAndHeadingWithTextAtRight.defaultProps = {
  // : ,
  centralGap:20,
  text1:'Running',
  colorText1:'white',
  text2:'5 Times/ Weekly',
  colorText2:'black',
  iconName:'heartbeat',
	iconType:'font-awesome',
	iconStyle:'Outlined',
	iconColor:'#f50',
	iconSize:30
};