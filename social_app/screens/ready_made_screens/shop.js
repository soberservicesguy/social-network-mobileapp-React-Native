import React, {Component} from 'react';
// IMPORT classes to use
import { 
	ImageBackground,
	View, 
	FlatList,
	// Button,
	// Text,
	// TouchableOpacity,
	// TouchableHighlight,
} from "react-native";
// IMPORT components without store / redux
import {
	ImageAtTopTextsAtBottom,
} from "../components/index";
// IMPORT connected components
// import {ConnectedSomeComponent} from "../redux_stuff/connected_components";


export default class ShopScreen extends Component {
	constructor(props) {
			super(props);
	}

	render() {
		DATA=[
			{
				id:'1',

				leftImageSource:require('../images/samosa.jpg'),
				
				leftCategoryName:'$399',
				
				leftDescription:'Paul Hewitt watches',

				rightImageSource:require('../images/samosa.jpg'),
				
				rightCategoryName:'$399',
				
				rightDescription:'Paul Hewitt watches',

			},
			{
				id:'2',

				leftImageSource:require('../images/samosa.jpg'),
				
				leftCategoryName:'$399',
				
				leftDescription:'Paul Hewitt watches',

				rightImageSource:require('../images/samosa.jpg'),
				
				rightCategoryName:'$399',
				
				rightDescription:'Paul Hewitt watches',

			},
			{
				id:'3',

				leftImageSource:require('../images/samosa.jpg'),
				
				leftCategoryName:'$399',
				
				leftDescription:'Paul Hewitt watches',

				rightImageSource:require('../images/samosa.jpg'),
				
				rightCategoryName:'$399',
				
				rightDescription:'Paul Hewitt watches',

			},
			{
				id:'4',

				leftImageSource:require('../images/samosa.jpg'),
				
				leftCategoryName:'$399',
				
				leftDescription:'Paul Hewitt watches',

				rightImageSource:require('../images/samosa.jpg'),
				
				rightCategoryName:'$399',
				
				rightDescription:'Paul Hewitt watches',

			},

		];

		return (
			<View>
				<FlatList
					data={DATA} // create DATA as list of objects
					renderItem={
						({ item }) => 
						<View style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between'  
						}} >
							<ImageAtTopTextsAtBottom
								imageSource={item.leftImageSource}
								headingName={item.leftCategoryName}
								description={item.leftDescription}
								headingFontSize={15}
								headingFontWeight={'bold'}
								textFlexGrow={4}
								endGapWidth={10}
							/>
							<ImageAtTopTextsAtBottom
								imageSource={item.rightImageSource}
								headingName={item.rightCategoryName}
								description={item.rightDescription}
								headingFontSize={15}
								headingFontWeight={'bold'}
								textFlexGrow={4}
								endGapWidth={10}
							/>

						</View>
					}
					keyExtractor={item => item.id}
				/>        
			</View>
		);
	}
}