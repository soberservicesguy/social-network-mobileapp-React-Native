import React, { Component } from 'react';
import { 
  TextInput,
  View,
} from "react-native";
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import {Picker} from '@react-native-community/picker';

import utils from "../utilities";

export default class TextInputFields extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  language: 'java',
		};
	}
	render() {
		const componentStyle = {
			container:{
				alignSelf:'center',
				paddingLeft: this.props.paddingLeft,
				width: this.props.width,
				borderBottomWidth: this.props.borderWidth,
				backgroundColor: this.props.backgroundColor,
				borderColor: this.props.borderColor,
			},
			textInput:{
				color: this.props.filledTextColor,
				fontSize: this.props.fontSize,
			},
		};

		return (
			<View style={componentStyle.container} >
				<TextInput
					placeholder="Type your password"
					placeholderTextColor = "#e2e4e8"
					// maxLength=10
					// caretHidden=true
					// multiline=true
					// numberOfLines=3
					// onChangeText={ () => null }
					// value='dummy'
					// autoFocus=true
					style={componentStyle.textInput}
				/>
				<View style={{
			  	position:'absolute',
					top:14,
					left:30,
					opacity:(this.props.showIcon===true) ? 1 : 0 ,
					// display:'inline'  	
			  	}}
		  	>				
					<Icon
					  // raised
					  name='user'
					  type='font-awesome'
					  iconStyle='Outlined'
					  color='#e2e4e8'
					  size={22}
					  // onPress={() => console.log('hello')} 
					  // reverse={true}
					/>
				</View>
			</View>
							
		);
	}
}

TextInputFields.defaultProps = {
  width: '100%',
  fontSize: 20,
  paddingLeft: 20,
  borderWidth: 1,
  borderColor: '#e2e4e8',
  backgroundColor: '#ffffff',
  filledTextColor: '#e2e4e8',
  showIcon:true
};