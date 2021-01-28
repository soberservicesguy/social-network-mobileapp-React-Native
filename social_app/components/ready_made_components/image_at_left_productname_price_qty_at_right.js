import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';

import utils from "../utilities";

export default class ImageAtLeftPriceWithQtyAtRight extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const componentStyle = {
			container:{
				display: 'flex',
				flexDirection: 'row',
				height:100,
				width:'90%',
				alignSelf:'center',
				alignItems: 'center'
			},
			imageContainer:{
				flex:3
			},
			textContainer:{
				flex:8,
				marginLeft: 20
			},
			tickMarkContainer:{
				flex:1,
				marginRight:15,
				opacity:(this.props.showTickMarkContainer === true) ? 1 : 0
			},
			image:{
				width:null,
				height:null,
				flex:1,
				resizeMode: "contain",
			},
			productName:{
				fontSize:16,

			},
			productPrice:{
				fontSize:16,
				fontWeight: 'bold',
			},
			quantity:{
				width:(this.props.quantity <=9) ? 30 : 40,
				fontSize:15,
				borderWidth: 1,
				borderRadius: 10,
				paddingHorizontal: 10,
				marginVertical: 8,
				textAlign: 'center', 
			},

		};
		return (
			<View style={componentStyle.container} >
			  <View style={componentStyle.imageContainer} >
	    	  	<Image
	  	  	  	source={this.props.productImage}
	  	  	  	style={componentStyle.image}
	    	  	/>
			  </View>

			  <View style={componentStyle.textContainer} >
			  	<Text style={componentStyle.productName} >
			  		{this.props.productName}
			    </Text>
			  	<Text style={componentStyle.productPrice} >
			  		{this.props.productPrice}
			    </Text>
			  	<Text style={componentStyle.quantity} >
			  		{this.props.quantity}
			    </Text>
			  </View>

			  <View style={componentStyle.tickMarkContainer} >
			  		<Icon
			  		  raised
			  		  name={(this.props.checked) ? 'check' : 'x'}
			  		  type='feather'
			  		  // iconStyle='outline'
			  		  color='blue'
			  		  size={15}
			  		  style={{backgroundColor: 'blue'}}
			  		  // onPress={() => console.log('hello')} 
			  		  reverse={(this.props.checked) ? true : false}
			  		/>
			  </View>

			</View>
		);
	}
}

ImageAtLeftPriceWithQtyAtRight.defaultProps = {
  // productImage: ,

  // productName: ,
  // productPrice: ,
  // checked: true,
  // showTickMarkContainer:true,
};