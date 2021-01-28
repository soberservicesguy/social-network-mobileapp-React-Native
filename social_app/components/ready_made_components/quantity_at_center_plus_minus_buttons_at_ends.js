import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';

import utils from "../utilities";

export default class QuantityAtCenterPlusMinusButtonsAtEnds extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			backgroundRoundBox:{
				alignSelf:'center',
				borderColor:this.props.roundBoxColor,
				backgroundColor: this.props.roundBoxColor,
				borderRadius:this.props.roundedNess,
				width:this.props.containerWidth,
				height:40,
				alignItems: 'center',
				justifyContent: 'center',
				display:'flex',
				flexDirection:'row',
			},
			textContainer:{
				flex:1,
			},
			Icon:{
				flex:1,
				alignSelf:'center'

			}
		};
	
		return (
			<View style={{
				width: this.props.outerRectangleWidth,
				alignSelf:'center',
				backgroundColor: this.props.outerRectangleColor,
			}} >

				<View style={componentStyle.backgroundRoundBox} >
					
					<View style={componentStyle.leftIcon} >
						
						<Icon
						  raised
						  name={this.props.rightIconName}
						  type={this.props.rightIconType}
						  iconStyle='Outlined'
						  color={this.props.rightIconColor}
						  size={this.props.iconSize}
						  // onPress={() => console.log('hello')} 
						  // reverse={true}
						/>
						
					</View>

					<View style={componentStyle.textContainer} >
						<Text style={{
							fontSize:this.props.textFont,
							color:this.props.textColor,
							fontWeight: this.props.fontWeight,
							textAlign: 'center',
						}} >
							{this.props.quantity}
						</Text>
					</View>

					<View style={componentStyle.leftIcon} >
						<Icon
						  raised
						  name={this.props.rightIconName}
						  type={this.props.rightIconType}
						  iconStyle='Outlined'
						  color={this.props.rightIconColor}
						  size={this.props.iconSize}
						  // onPress={() => console.log('hello')} 
						  // reverse={true}
						/>
					</View>


				</View>
			</View>	
		);
	}
}

QuantityAtCenterPlusMinusButtonsAtEnds.defaultProps = {
  // : ,
  outerRectangleWidth:'100%',
  outerRectangleColor:null, // this removes the roundedbox effect of borders

  containerWidth:'70%',
  roundBoxColor:'blue',
  roundedNess:20,
  quantity:17,
  textFont:15,
  textColor:'white',
  fontWeight:'normal',
  iconSize:12,

  leftIconColor:'#f50',
  rightIconColor:'#f50',
  leftIconName:'heartbeat',
	leftIconType:'font-awesome',
  rightIconName:'heartbeat',
	rightIconType:'font-awesome',

};