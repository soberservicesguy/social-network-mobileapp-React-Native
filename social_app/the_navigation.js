
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
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import {
	ConnectedLoginScreen,
	ConnectedSignUpScreen,
	ConnectedSocialPostScreen,
	ConnectedIndividualSocialPost,
	ConnectedAdvertisementScreen,
	ConnectedIndividualAdvertisement,
	ConnectedPageScreen,
	ConnectedIndividualPage,
	ConnectedBookScreen,
	ConnectedIndividualBook,
	ConnectedSportScreen,
	ConnectedIndividualSport,
	ConnectedFriendsScreen,
	ConnectedNotificationsScreen,
	ConnectedAboutMe,
	ConnectedInnerDrawerComponent,
} from "./redux_stuff/connected_components";


import utils from "./utilities"


const FriendTabs = createBottomTabNavigator();

function FriendTabsComponent({navigation}) {
	return (
		<FriendTabs.Navigator
			options={{ title: 'My home' }}
			// initialRouteName= 'FriendScreen'
			tabBar={() => 
				<View style={{
					display:'flex',
					flexDirection: 'row',
					alignItems:'center',
					justifyContent: 'center',
					height:50,
					backgroundColor: utils.maroonColor

				}}>
					{[
						{option_name:'Friends', screen_payload:"showFriends"}, 
						{option_name:'Suggestions',  screen_payload:"showFriendsSuggestionsInstead"}, 
						{option_name:'Requests',  screen_payload:"showFriendsRequestInstead"}, 
					].map((item, index) => {

						return (
							<TouchableOpacity activeOpacity={0.2} style={{flex:1, alignItems:'center', alignSelf: 'center', justifyContent:'center',height:50, borderRightWidth:(index !== 2) ? 1 : 0, borderRightColor:'white', paddingHorizontal: 10}} onPress={ () => {
								navigation.navigate('Friendsection', {screen: 'FriendsScreen', params:{payload: item.screen_payload}} )
								console.log(item.screen_payload)
							}}>
								<Text style={{color:'white', fontWeight:'bold', fontSize:18, textAlign:'center'}}>
									{item.option_name}
								</Text>
							</TouchableOpacity>
						)
					})}
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
			//   FriendTabstyle: // style object
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


		{/*one screen behaves differently by providing different props to navigation*/}
		{/* this acts like a wall, for personal, for friend, for not a friend everyone */}
			<FriendTabs.Screen name="FriendsScreen" component={ ConnectedFriendsScreen }
				options={{ 
					headerShown:true,
					title: 'Friends na',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

		</FriendTabs.Navigator>
	)
} 





const ContentTabs = createBottomTabNavigator();

function ContentTabsComponent({navigation}) {
	return (
		<ContentTabs.Navigator
			tabBar={() => 
				<View style={{
					display:'flex',
					flexDirection: 'row',
					alignItems:'center',
					justifyContent: 'center',
					height:50,
					backgroundColor: utils.maroonColor,

				}}>
					{['SocialPost', 'Pages', 'Sports', 'Books',
					// 'Video'
					].map((option, index) => {

						let screen_name = option
						option = option.toLowerCase()
						option = option.charAt(0).toUpperCase() + option.slice(1);

						return (
							<TouchableOpacity activeOpacity={0.2} style={{flex:1, alignItems:'center', alignSelf: 'center', justifyContent:'center',height:50, borderRightWidth:(index !== 3) ? 1 : 0, borderRightColor:'white', paddingHorizontal: 10}}
								onPress={ () => {
									if (index == 0){
										navigation.navigate(option, {screen: option, showOwnWallInstead:true})
									} else {
										navigation.navigate(option) 
									}
								}}>
								<Text style={{color:'white', fontWeight:'bold', fontSize:15}}>
									{screen_name}
								</Text>
							</TouchableOpacity>
						)
					})}
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
			//   ContenttabStyle: // style object
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



{/*SocialPosts*/}
	{/* own wall */}
	{/* some users wall | non-friendly users own wall */}
	{/* photo posts from user on his wall */}
	{/* video posts from user on his wall */} 

		{/* this acts like a wall, for personal, for friend, for not a friend everyone */}
			<ContentTabs.Screen name="Socialpost" component={ ConnectedSocialPostScreen }
				options={{ 
					headerShown:true,
					title: 'SocialPost',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>


			<ContentTabs.Screen name="Pages" component={ ConnectedPageScreen }
				options={{ 
					headerShown:true,
					title: 'Pages',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<ContentTabs.Screen name="Sports" component={ ConnectedSportScreen }
				options={{ 
					headerShown:true,
					title: 'Sports',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<ContentTabs.Screen name="Books" component={ ConnectedBookScreen }
				options={{ 
					headerShown:true,
					title: 'Books',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			{/*<ContentTabs.Screen name="Ad" component={ ConnectedAdvertisementScreen }
				options={{ 
					headerShown:true,
					title: 'Ad',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>*/}



		</ContentTabs.Navigator>
	)
} 




const Stack = createStackNavigator();

function SignInStackComponent({navigation}) {
	return (
		<Stack.Navigator
			headerMode='none'
		>
			<Stack.Screen name="Login" component={ ConnectedLoginScreen }
				options={{ 
					headerShown:true,
					title: 'Login',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
				}}
			/>

			<Stack.Screen name="SignUp" component={ ConnectedSignUpScreen }
				options={{ 
					headerShown:true,
					title: 'Login',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
				}}
			/>

		</Stack.Navigator>
	);
}


const InnerDrawer = createDrawerNavigator();

export function InnerDrawerComponent({ navigation, set_is_signed_in }) {
	return (
		<InnerDrawer.Navigator
			headerMode='none'
			// initialRouteName= ''
			// backBehavior= 'initialRoute / order / history / none'
			// drawerPosition= 'left / right'
			// drawerType='front / back / slide / permanent'
			hideStatusBar={false}
			drawerStyle={{ // style object for drawer
				// backgroundColor: '#eee',
				backgroundColor: utils.maroonColor,
				width: 150
			}}

			drawerContent={() => {
				return(
					<ScrollView contentContainerStyle={{
						flex:1,
						alignItems:'center',
						justifyContent: 'space-between', 
					}}>
						{['SocialPost', 'Friendsection', 'Notifications', 'About_Me', 'Logout'
						// 'Video'
						].map((option) => {

							let screen_name = option
							if (screen_name === 'Friendsection'){
								option = 'Friends'
							} else if (screen_name === 'SocialPost'){
								option = 'Wall'
							} else if (screen_name === 'About_Me'){
								option = 'About Me'
							}
							option = option.toLowerCase()
							option = option.charAt(0).toUpperCase() + option.slice(1);

							if (option == 'Logout'){
								return (
									<TouchableOpacity activeOpacity={0.2} onPress={ () => set_is_signed_in(false) } style={{marginTop:50, marginBottom:50,}}>
										<Text style={{color:'black', fontWeight:'bold', fontSize:20}}>
											Logout
										</Text>
									</TouchableOpacity>
								)
							} else {

								return (
									<TouchableOpacity activeOpacity={0.2}
										style={{marginTop:50, marginBottom:50,}}
										onPress={() => {
											if (option == 'Wall'){
												navigation.navigate(screen_name, {screen: screen_name, showOwnWallInstead:true})
												console.log('SENT')
											} else {
												navigation.navigate(screen_name)
											}
										}} 
									>
										<Text style={{color:'white', fontWeight:'bold', fontSize:20}}>
											{option}
										</Text>
									</TouchableOpacity>
								)
							}
						})}
					</ScrollView>
				)
			}}
		>

			<InnerDrawer.Screen name="Friendsection" component={ FriendTabsComponent }
				options={{ 
					headerShown:true,
					title: 'Friends naaaa',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="SocialPost" component={ ContentTabsComponent }
				options={{ 
					headerShown:true,
					title: 'Wall',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>


			<InnerDrawer.Screen name="Notifications" component={ ConnectedNotificationsScreen }
				options={{ 
					headerShown:true,
					title: 'Notifications',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="About_Me" component={ ConnectedAboutMe }
				options={{ 
					headerShown:true,
					title: 'About Me',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="Individual_SocialPost" component={ ConnectedIndividualSocialPost }
				options={{ 
					headerShown:true,
					title: 'Post',
					headerTitleAlign: 'center',
					headerBackTitleVisible: true,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="Individual_Page" component={ConnectedIndividualPage}
				options={{ 
					headerShown:true,
					title: 'Individual Page',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="Individual_Sport" component={ConnectedIndividualSport}
				options={{ 
					headerShown:true,
					title: 'Individual Sport',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<InnerDrawer.Screen name="Individual_Book" component={ConnectedIndividualBook}
				options={{ 
					headerShown:true,
					title: 'Individual Book',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					// headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
					// 	marginTop:50,
					// 	marginBottom:50,
					// }}>
					// 	<Text>
					// 		Go Back
					// 	</Text>
					// </TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>




{/*NOT NEEDED*/}
			{/*<InnerStack.Screen name="Individual_Ad" component={ConnectedIndividualAdvertisement}
				options={{ 
					headerShown:true,
					title: 'Individual Ad',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>*/}


		{/* added so that user could be pushed to login if token expired or unauthorized in backend*/}
			<InnerDrawer.Screen name="SignInStack" component={SignInStackComponent}
				options={{ 
					headerShown:false,
				}}
			/>

		

		</InnerDrawer.Navigator>
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
				<RootStack.Navigator headerMode='none'>

					{/*this.props.userToken === null*/}

					{this.props.isSignedIn === false || this.props.phone_number === null 
						? 
							( <RootStack.Screen name="SignInStack" component={SignInStackComponent}/> )
						: 
							( <RootStack.Screen name="InnerStack" component={ConnectedInnerDrawerComponent} /> )
					}		

				</RootStack.Navigator>
			</NavigationContainer>
		);
	}
}

export default AppNavigation;