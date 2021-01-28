import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {
	Image,
	Text,
	View,
	ScrollView
} from 'react-native';
// IMPORT created components
import {
	ButtonTouchableHighlight,
	ImageAtLeftTextsAtRight,
	Gap
} from './components';
// IMPORT screens
import {
	CreateAccountScreen,
	LoginScreen,
	ListViewProductCategoryScreen,
	ShopScreen,
	ShopCategoryViewScreen,
	MenStylingProductsScreen,
	ProductDetailsScreen,
} from "./screens";



const Stack = createStackNavigator();

function SignInStack() {
	return (
		<Stack.Navigator
			// headerMode='none'
		>
			<Stack.Screen name="Buy Item" component={
				ProductDetailsScreen
			} 
				options={{ 
				 headerShown:true,
				 title: 'Men',
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerLeft: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>

					),
				 headerRight: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
					)
				}}
			/>




			<Stack.Screen name="Men" component={
				MenStylingProductsScreen
			} 
				options={{ 
				 headerShown:true,
				 title: 'Men',
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerLeft: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>

					),
				 headerRight: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
					)
				}}
			/>

			<Stack.Screen name="Shop Category" component={
				ShopCategoryViewScreen
			} 
				options={{ 
				 headerShown:true,
				 title: 'Shop',
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerLeft: () => (
						<Text
							style={{
								fontSize: 20,
								paddingLeft:10,
								color:'#e2e4e8'

							}} 
						>
							Category
						</Text>             
					),
				 headerRight: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
					)
				}}
			/>


			<Stack.Screen name="Shop" component={
				ShopScreen
			} 
				options={{ 
				 headerShown:true,
				 title: 'Shop',
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerLeft: () => (
						<Text
							style={{
								fontSize: 20,
								paddingLeft:10,
								color:'#e2e4e8'

							}} 
						>
							Category
						</Text>             
					),
				 headerRight: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
					)
				}}
			/>


			<Stack.Screen name="List View" component={ListViewProductCategoryScreen} 
				options={{ 
				 headerShown:true,
				 title: 'Login',
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerRight: () => (
						<Text
							style={{
								fontSize: 20,
								paddingRight:10
							}} 
						>
							Edit
						</Text>             
					),
				 headerLeft: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
					)
				}}
			/>

			<Stack.Screen name="CreateAccount" component={CreateAccountScreen} 
				options={{ 
					headerShown:false
				}}
			/>

			<Stack.Screen name="Login" component={LoginScreen} 
				options={{ 
				 headerShown:true,
				 title: 'Login',
				 headerShown: true,
				 headerTitleAlign: 'center',
				 headerBackTitleVisible: false,
				 headerLeft: () => (
					<Image
						source={require('./images/samosa.jpg')}
						style={{
							resizeMode: "center",
							height: 40,
							width: 40,
							paddingLeft: 50,
						}}
					/>
				 ) ,// function
				 // headerBackTitle: ,
				 
				 // headerStyle: ,// style object for header e.g background or color
				 // headerLeftContainerStyle: ,// style object
				 // headerRightContainerStyle: ,// style object
				 // headerTitleContainerStyle: ,// style object
				 // headerTitleStyle: ,// style object
				 // headerBackTitleStyle: ,// style object
			 
				 // header: , //function returning component to use as header
				 // headerBackground: ,// function returning element that becomes bg
				 // headerBackImage: ,// function returning component for header back image
				 // headerRight: ,// function returning headers right component
			 
				 // headerStatusBarHeight: ,
				 // headerTransparent: true / false,
				 // headerTintColor: ,
				}}
			/>
		</Stack.Navigator>
	);
}




















const Tabs = createBottomTabNavigator();

function BottomTabs() {
	return (
		<Tabs.Navigator
			tabBar={ () => 
				<View 
					style={{
						display: 'flex',
						flexDirection: 'row', 
						alignItems: 'center',
						justifyContent: 'center',
						// alignSelf: 'center',
						height:60
					}} 
				>
					<View style={{flex: 1}}>
						<ButtonTouchableHighlight
							gapFlexValue={1}
							showText={'none'}
							// showGap={'none'}
							// gapOpacity={0}
							// label={''}
							imageWidth={60}
							imageSource={require('./images/samosa.jpg')}
						/>
					</View>
						<View style={{flex: 1}}>
							<ButtonTouchableHighlight
								// label={''}
								showText={'none'}
								// showGap={'none'}
								// gapOpacity={0}
								gapFlexValue={1}
								imageWidth={60}
								imageSource={require('./images/samosa.jpg')}
							/>
						</View>
						<View style={{flex: 1}}>
							<ButtonTouchableHighlight
								// label={''}
								showText={'none'}
								// showGap={'none'}
								// gapOpacity={0}
								gapFlexValue={1}
								imageWidth={60}
								imageSource={require('./images/samosa.jpg')}
							/>
						</View>
						<View style={{flex: 1,
// BELOW right property is hack
							right:20}}>
							<ButtonTouchableHighlight
								// label={''}
								showText={'none'}
								// showGap={'none'}
								// gapOpacity={0}
								gapFlexValue={1}
								imageWidth={60}
								imageSource={require('./images/samosa.jpg')}
							/>
						</View>
				</View>
			} // tabBar closed
			// backBehavior= 'initialRoute / order / history / none'

			// tabBarOptions={{
			//   activeTintColor:'',
			//   inactiveTintColor:'',
			//   activeBackgroundColor:'',
			//   inactiveBackgroundColor:'',
				
			//   showLabel: true / false,
			//   showIcon: true / false,

			//   labelPosition: 'beside-icon / below-icon'  
			//   tabStyle: // style object
			//   labelStyle: // style object
			//   style: // style object

			// }}

			// screenOptions={{
			//     title:'',
			//     tabBarVisible: true /false,
			//     tabBarIcon: , // function returning tab bar icon
			//     tabBarLabel: , // function returning label in tab bar
			//     tabBarButton: , // function returning tabbar button
			//   }}
		>
			<Tabs.Screen 
				name="Entire Stack" 
				component={SignInStack}
				// options={{
				// 	title:'',
				// 	drawerLabel: , // function returning label
				// 	drawerIcon: ,// function returning icon
				// }} 
			/>

		</Tabs.Navigator>
	)
} 



const Drawer = createDrawerNavigator();

// component returning drawer with screens
function TheDrawer() {
	return (
		<Drawer.Navigator
			headerMode='none'
			// initialRouteName= ''
			// backBehavior= 'initialRoute / order / history / none'
			// drawerPosition= 'left / right'
			// drawerType='front / back / slide / permanent'
			hideStatusBar={false}
			drawerStyle={{ // style object
				backgroundColor: '#000000'
			}}

			drawerContent={()=>
				<ScrollView>
					<View>
						<Gap
							height={10} 
						/>
						<ImageAtLeftTextsAtRight
							imageSource={require('./images/samosa.jpg')}
							containerWidth='80%'
							imageResizeMode={'contain'}
							backgroundColor={null}
							headingTextColor={'white'}
							descriptionTextColor={'white'}
							imageFlexGrow={0}
							centralGap={80}
							headingName={'Simons Aberta'}
							headingFontSize={20}
							description={'San Francisco, CA'}
						/>
						<Gap
							height={10} 
						/>

						<View style={{
								width:'80%',
								alignSelf:'center'
							}} >
							<Text style={{
								color:'white',
								textAlign: 'left',
								marginTop:10
							}} >
								Cycling
							</Text>
							<Text style={{
								color:'white',
								textAlign: 'right'
							}} >
								59%
							</Text>

							<Text style={{
								color:'white',
								textAlign: 'left',
								marginTop:10
							}} >
								Tone Up
							</Text>
							<Text style={{
								color:'white',
								textAlign: 'right'
							}} >
								38%
							</Text>

							<Text style={{
								color:'white',
								textAlign: 'left',
								marginTop:10
							}} >
								Running
							</Text>
							<Text style={{
								color:'white',
								textAlign: 'right'
							}} >
								74%
							</Text>
						</View>

						<Gap
							height={25} 
						/>

						<View style={{borderBottomWidth:1, borderColor: 'white', width:'80%', alignSelf: 'center' }} ></View>

						<Gap
							height={25} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center',
								fontWeight:'bold'
							}}
						>
							FITNESS LEVEL
						</Text>

						<Gap
							height={15} 
						/>

						<View style={{
							display:'flex',
							flexDirection:'row'
						}} 
						>
							<View style={{flex:4}} >
								<Text style={{
									paddingLeft: 20,
									color:'white',
									textAlign: 'left',
									width:'80%',
									alignSelf:'center',
								}} >
									Beginner Level
								</Text>
							</View>
							<View style={{
								// flex:1,
								marginRight:30,
								alignSelf:'center',
								width:10,
								height:10,
								borderRadius:10/2,
								borderWidth:1,
								borderColor:'blue'
							}} 
							>
							</View>
						</View>

						<Gap
							height={20} 
						/>

						<View style={{
							display:'flex',
							flexDirection:'row'
						}} 
						>
							<View style={{flex:4}} >
								<Text style={{
									paddingLeft: 20,
									color:'white',
									textAlign: 'left',
									width:'80%',
									alignSelf:'center',
								}} >
									Moderate Level
								</Text>
							</View>
							<View style={{
								// flex:1,
								marginRight:30,
								alignSelf:'center',
								width:10,
								height:10,
								borderRadius:10/2,
								borderWidth:1,
								borderColor:'blue'
							}} 
							>
							</View>
						</View>

						<Gap
							height={20} 
						/>

						<View style={{
							display:'flex',
							flexDirection:'row'
						}} 
						>
							<View style={{flex:4}} >
								<Text style={{
									paddingLeft: 20,
									color:'white',
									textAlign: 'left',
									width:'80%',
									alignSelf:'center',
								}} >
									Advance Level
								</Text>
							</View>
							<View style={{
								// flex:1,
								marginRight:30,
								alignSelf:'center',
								width:10,
								height:10,
								borderRadius:10/2,
								borderWidth:1,
								borderColor:'blue'
							}} 
							>
							</View>
						</View>

						<Gap
							height={25} 
						/>

						<View style={{borderBottomWidth:1, borderColor: 'white', width:'80%', alignSelf: 'center' }} ></View>

						<Gap
							height={25} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center',
								fontWeight:'bold'
							}}
						>
							WORKOUT GOALS
						</Text>

						<Gap
							height={7} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center'
							}}
						>
							Lost Weight     Tone Up
						</Text>

						<Gap
							height={25} 
						/>

						<View style={{borderBottomWidth:1, borderColor: 'white', width:'80%', alignSelf: 'center' }} ></View>

						<Gap
							height={25} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center',
								fontWeight:'bold'
							}}
						>
							EQUIPMENT
						</Text>

						<Gap
							height={7} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center'
							}}
						>
							Full Gym
						</Text>

						<Gap
							height={25} 
						/>
						<View style={{borderBottomWidth:1, borderColor: 'white', width:'80%', alignSelf: 'center' }} ></View>
						<Gap
							height={25} 
						/>

						<Text style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center',
								fontWeight:'bold'
							}}
						>
							WORKOUT DETAILS
						</Text>

						<Gap
							height={7} 
						/>

						<Text 
							style={{
								color:'white',
								textAlign: 'left',
								width:'80%',
								alignSelf:'center'
							}}
						>
							2 Workouts per Week
						</Text>

						<Gap
							height={25} 
						/>


					</View>
				</ScrollView>
			} // function returning element			
		>
			<Drawer.Screen name="Feeds" component={BottomTabs} />
		</Drawer.Navigator>
	);
}




const RootStack = createStackNavigator();

class AppNavigation extends Component {
		constructor(props) {
				super(props);
		}
		render() {
			return (
				<NavigationContainer>
					<RootStack.Navigator
						headerMode='none'
					>

						{this.props.userToken !== null ? (
							<RootStack.Screen 
								name="SignIn" 
								component={BottomTabs} 
							/>

							) : (

							<RootStack.Screen 
								name="Drawer" 
								component={TheDrawer} 
							/>
						)}
							
					</RootStack.Navigator>
				</NavigationContainer>
			);
		}
}

export default AppNavigation;