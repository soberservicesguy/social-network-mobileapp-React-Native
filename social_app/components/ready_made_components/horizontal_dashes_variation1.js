import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import utils from "../utilities";

export default class HorizontalDashes extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const componentStyle = {
			container:{
				display: 'flex',
				flexDirection: 'row', 
				alignSelf:'center',
			},
			dash:{
				width:this.props.width,
				height:this.props.height,
				paddingVertical: 0,
				paddingHorizontal: 0,
				marginVertical:this.props.marginVertical,
				marginRight:this.props.gap,
				backgroundColor: this.props.dashesColor,
			}
		};
	
		return (
			<View style={componentStyle.container} >
				{this.props.dashesList.map(
					(item) => (
						<View 
							key={item.id}
							style={componentStyle.dash}>
						</View>		
					)
				)}
			</View>
		);
	}
}

HorizontalDashes.defaultProps = {
  width:20,
  height:5,
  marginVertical:20,
  gap:5,
  dashesColor:'white',
  dashesList:[
  	{id:'1'},
  	{id:'2'},
  	{id:'3'},
	]
};