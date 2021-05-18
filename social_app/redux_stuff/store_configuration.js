import AsyncStorage from '@react-native-community/async-storage';

import { persistStore, persistReducer } from 'redux-persist' 
// import storage from 'redux-persist/lib/storage'

import {createStore, applyMiddleware} from "redux";
// import createSagaMiddleware from "redux-saga";
import { connect } from "react-redux";
import { combineReducers } from 'redux'; 

import ReduxThunk from 'redux-thunk'

// IMPORT rootSaga
// import {rootSaga} from "../saga_stuff/saga_combined";

import {
	reducerForPrivileges,
	reducerJWT,
	reducerForSocialPost,
	reducerForComment,
	reducerForLike,
	reducerForShare,
	reducerForUser,
	reducerForAdvertisement,
	reducerForPage,
	reducerForBook,
	reducerForSport,

	reducerForNotification,
} from "./reducers"

import { add_more_socialposts } from "./reducers/reducer_for_SocialPost"

export const rootReducer = combineReducers({
	socialposts: reducerForSocialPost,
	comments: reducerForComment,
	likes: reducerForLike,
	shares: reducerForShare,
	advertisements: reducerForAdvertisement,
	pages: reducerForPage,
	books: reducerForBook,
	sports: reducerForSport,
	privileges: reducerForPrivileges,

	all_users: reducerForUser,
	notifications:reducerForNotification,
});

export const mapStateToProps = state => {
	return {
		all_likes: state.socialposts.totalLikes,
		all_shares: state.socialposts.totalShares,
		all_comments: state.socialposts.totalComments,

		total_friends:state.all_users.list_of_friends, 
		list_of_friend_suggestions: state.all_users.suggestions,
		list_of_friend_requests: state.all_users.requests,		
		// friends: state.all_users.friends,
		// friend_suggestions: state.all_users.friend_suggestions,

		notifications_list:state.notifications.all_notifications,
		// total_notifications:state.notifications.all_notifications,

		show_socialpost_comments:state.socialposts.showOnlyCommentsQuantityForSocialPost,

		show_socialpost_likes:state.socialposts.showOnlyLikesQuantityForSocialPost,
		show_sport_likes:state.sports.showOnlyLikesQuantityForSport,
		show_book_likes:state.books.showOnlyLikesQuantityForBook,
		show_page_likes:state.pages.showOnlyLikesQuantityForPage,

		show_socialpost_shares:state.socialposts.showOnlySharesQuantityForSocialPost,

		total_socialposts: state.socialposts.totalSocialPost,
		current_socialpost: state.socialposts.currentSocialPost,

		userToken: state.all_users.userToken,
		isSignedIn: state.all_users.isSignedIn,

		user_avatar_image: state.all_users.user_avatar_image,
		user_name_in_profile: state.all_users.user_name_in_profile,
		user_brief_intro: state.all_users.user_brief_intro,
		user_about_me: state.all_users.user_about_me,
		user_working_zone: state.all_users.user_working_zone,
		user_education: state.all_users.user_education,
		user_contact_details: state.all_users.user_contact_details,
		user_cover_image: state.all_users.user_cover_image,
		user_total_friends: state.all_users.total_friends,
		// phone_number: state.all_users.phone_number,
		// user_name: state.all_users.user_name,

		total_advertisements: state.advertisements.totalAdvertisement,
		current_advertisement: state.advertisements.currentAdvertisement,

		total_pages: state.pages.totalPage,
		current_page: state.pages.currentPage,

		total_books: state.books.totalBook,
		current_book: state.books.currentBook,

		total_sports: state.sports.totalSport,
		current_sport: state.sports.currentSport,


		isAllowedBasic: state.privileges.isAllowedBasic,
		isAllowedPostsInteraction: state.privileges.isAllowedPostsInteraction,
		isAllowedPostsCreation: state.privileges.isAllowedPostsCreation,
		isAllowedAdsCreation: state.privileges.isAllowedAdsCreation,
		isAllowedBooksCreation: state.privileges.isAllowedBooksCreation,
		isAllowedPagesCreation: state.privileges.isAllowedPagesCreation,
		isAllowedSportsCreation: state.privileges.isAllowedSportsCreation,

	};
};

export const mapDispatchToProps = dispatch => {
	return {
		
		
		
		set_total_likes: (likes_list) => dispatch( { type: "SET_LIKES", likes_list: likes_list } ),
		set_total_comments: (comments_list) => dispatch( { type: "SET_COMMENTS", comments_list: comments_list } ),
		set_total_shares: (shares_list) => dispatch( { type: "SET_SHARES", shares_list: shares_list } ),

		set_total_friends_count: (total_friends) => dispatch( { type: "SET_FRIENDS_COUNT", total_friends: total_friends } ),
		set_friends: (friends_list) => dispatch( { type: "SET_FRIENDS", friends_list: friends_list } ),
		set_friends_suggestions: (args_list) => dispatch( { type: "SET_FRIENDS_SUGGESTIONS", args_list: args_list } ),
		set_friends_requests: (args_list) => dispatch( { type: "SET_FRIENDS_REQUESTS", args_list: args_list } ),

		set_fetched_notifications: (notifications_list) => dispatch( { type: "SET_FETCHED_NOTIFICATIONS", notifications_list: notifications_list } ),
		append_fetched_notifications: (notifications_list) => dispatch( { type: "APPEND_FETCHED_NOTIFICATIONS", notifications_list: notifications_list } ),


		hide_comments_for_socialpost: () => dispatch( {type: "HIDE_COMMENT_QUANTITY_FOR_SOCIALPOST"} ),
		hide_likes_for_socialpost: () => dispatch( {type: "HIDE_LIKE_QUANTITY_FOR_SOCIALPOST"} ),
		hide_likes_for_book: () => dispatch( {type: "HIDE_LIKE_QUANTITY_FOR_BOOK"} ),
		hide_likes_for_page: () => dispatch( {type: "HIDE_LIKE_QUANTITY_FOR_PAGE"} ),
		hide_likes_for_sport: () => dispatch( {type: "HIDE_LIKE_QUANTITY_FOR_SPORT"} ),
		hide_shares_for_socialpost: () => dispatch( {type: "HIDE_SHARE_QUANTITY_FOR_SOCIALPOST"} ),


		toggle_show_comments_for_socialpost: () => dispatch( {type: "TOGGLE_COMMENT_QUANTITY_FOR_SOCIALPOST"} ),
		toggle_show_likes_for_socialpost: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_SOCIALPOST"} ),
		toggle_show_likes_for_book: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_BOOK"} ),
		toggle_show_likes_for_page: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_PAGE"} ),
		toggle_show_likes_for_sport: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_SPORT"} ),
		toggle_show_shares_for_socialpost: () => dispatch( {type: "TOGGLE_SHARE_QUANTITY_FOR_SOCIALPOST"} ),


// user
		set_is_signed_in: (booleon) => dispatch( { type:"SET_IS_SIGNED_IN", booleon: booleon } ),
		set_user_token: (token) => dispatch( { type:"SET_USER_TOKEN", token: token } ),
		set_phone_number: (phone_number) => dispatch( { type: "SET_PHONE_NUMBER", phone_number: phone_number} ),
		remove_phone_number: () => dispatch( { type: "REMOVE_PHONE_NUMBER" } ),
		set_user_name: (user_name) => dispatch( { type: "SET_USER_NAME", user_name: user_name} ),
		remove_user_name: () => dispatch( { type: "REMOVE_USER_NAME" } ),

		set_user_name_in_profile: (user_name_in_profile) => dispatch( { type: "SET_USER_NAME_IN_PROFILE", user_name_in_profile: user_name_in_profile} ),
		remove_user_name_in_profile: () => dispatch( { type: "REMOVE_USER_NAME_IN_PROFILE" } ),
		set_user_avatar_image: (user_avatar_image) => dispatch( { type: "SET_USER_AVATAR_IMAGE", user_avatar_image: user_avatar_image} ),
		remove_user_avatar_image: () => dispatch( { type: "REMOVE_USER_AVATAR_IMAGE" } ),
		set_user_cover_image: (user_cover_image) => dispatch( { type: "SET_USER_COVER_IMAGE", user_cover_image: user_cover_image} ),
		remove_user_cover_image: () => dispatch( { type: "REMOVE_USER_COVER_IMAGE" } ),
		set_user_name_in_profile: (user_name_in_profile) => dispatch( { type: "SET_USER_NAME_IN_PROFILE", user_name_in_profile: user_name_in_profile} ),
		remove_user_name_in_profile: () => dispatch( { type: "REMOVE_USER_NAME_IN_PROFILE" } ),
		set_user_avatar_image: (user_avatar_image) => dispatch( { type: "SET_USER_AVATAR_IMAGE", user_avatar_image: user_avatar_image} ),
		remove_user_avatar_image: () => dispatch( { type: "REMOVE_USER_AVATAR_IMAGE" } ),
		set_user_cover_image: (user_cover_image) => dispatch( { type: "SET_USER_COVER_IMAGE", user_cover_image: user_cover_image} ),
		remove_user_cover_image: () => dispatch( { type: "REMOVE_USER_COVER_IMAGE" } ),
		set_user_brief_intro: (user_brief_intro) => dispatch( { type: "SET_USER_BRIEF_INTRO", user_brief_intro: user_brief_intro} ),
		remove_user_brief_intro: () => dispatch( { type: "REMOVE_USER_BRIEF_INTRO" } ),
		set_user_about_me: (user_about_me) => dispatch( { type: "SET_USER_ABOUT_ME", user_about_me: user_about_me} ),
		remove_user_about_me: () => dispatch( { type: "REMOVE_USER_ABOUT_ME" } ),
		set_user_working_zone: (user_working_zone) => dispatch( { type: "SET_USER_WORKING_ZONE", user_working_zone: user_working_zone} ),
		remove_user_working_zone: () => dispatch( { type: "REMOVE_USER_WORKING_ZONE" } ),
		set_user_education: (user_education) => dispatch( { type: "SET_USER_EDUCATION", user_education: user_education} ),
		remove_user_education: () => dispatch( { type: "REMOVE_USER_EDUCATION" } ),
		set_user_contact_details: (user_contact_details) => dispatch( { type: "SET_USER_CONTACT_DETAILS", user_contact_details: user_contact_details} ),
		remove_user_contact_details: () => dispatch( { type: "REMOVE_USER_CONTACT_DETAILS" } ),

// privileges
		allow_basic_privilege: () => dispatch( { type:"ALLOW_BASIC" } ),
		allow_posts_interaction_privilege: () => dispatch( { type:"ALLOW_POSTS_INTERACTION" } ),
		allow_posts_creation_privilege: () => dispatch( { type:"ALLOW_POSTS_CREATION" } ),
		allow_ads_creation_privilege: () => dispatch( { type:"ALLOW_ADS_CREATION" } ),
		allow_books_creation_privilege: () => dispatch( { type:"ALLOW_BOOKS_CREATION" } ),
		allow_pages_creation_privilege: () => dispatch( { type:"ALLOW_PAGES_CREATION" } ),
		allow_sports_creation_privilege: () => dispatch( { type:"ALLOW_SPORTS_CREATION" } ),
		revoke_basic_privilege: () => dispatch( { type:"REVOKE_BASIC" } ),
		revoke_posts_interaction_privilege: () => dispatch( { type:"REVOKE_POSTS_INTERACTION" } ),
		revoke_posts_creation_privilege: () => dispatch( { type:"REVOKE_POSTS_CREATION" } ),
		revoke_ads_creation_privilege: () => dispatch( { type:"REVOKE_ADS_CREATION" } ),
		revoke_books_creation_privilege: () => dispatch( { type:"REVOKE_BOOKS_CREATION" } ),
		revoke_pages_creation_privilege: () => dispatch( { type:"REVOKE_PAGES_CREATION" } ),
		revoke_sports_creation_privilege: () => dispatch( { type:"REVOKE_SPORTS_CREATION" } ),

// social posts
		set_current_socialpost: (current_socialpost) => dispatch( { type: "SET_CURRENT_SOCIALPOST", current_socialpost:current_socialpost } ),
		set_fetched_socialposts: (socialpost_list) => dispatch( { type: "SET_FETCHED_SOCIALPOST", socialpost_list: socialpost_list } ),
		set_fetched_10_more_socialpost: (socialpost_list) => dispatch( { type: "SET_FETCHED_10_MORE_SOCIALPOST", socialpost_list: socialpost_list } ),

		async_append_fetched_socialposts:(socialpost_list) => dispatch( add_more_socialposts(socialpost_list) ),

// comment, like, share social posts 
		add_comment_to_socialpost: (socialpost_id, comment_object) => dispatch( { type: "ADD_COMMENT_TO_SOCIALPOST", socialpost_id: socialpost_id, comment_object: comment_object } ),
		remove_comment_from_socialpost: (socialpost_id, comment_object, comment_id) => dispatch( { type: "REMOVE_COMMENT_FROM_SOCIALPOST", socialpost_id: socialpost_id, comment_object: comment_object, comment_id: comment_id } ),
		add_like_to_socialpost: (socialpost_id, like_object) => dispatch( { type: "ADD_LIKE_TO_SOCIALPOST", socialpost_id: socialpost_id, like_object: like_object } ),
		remove_like_from_socialpost: (socialpost_id, like_object, like_id) => dispatch( { type: "REMOVE_LIKE_FROM_SOCIALPOST", socialpost_id: socialpost_id, like_object: like_object, like_id: like_id } ),
		add_share_to_socialpost: (socialpost_id, share_object) => dispatch( { type: "ADD_SHARE_TO_SOCIALPOST", socialpost_id: socialpost_id, share_object: share_object } ),
		remove_share_from_socialpost: (socialpost_id, share_object, share_id) => dispatch( { type: "REMOVE_SHARE_FROM_SOCIALPOST", socialpost_id: socialpost_id, share_object: share_object, share_id: share_id } ),

// ad
		set_current_advertisement: (current_advertisement) => dispatch( { type: "SET_CURRENT_ADVERTISEMENT", current_advertisement:current_advertisement } ),
		set_fetched_advertisements: (advertisement_list) => dispatch( { type: "SET_FETCHED_ADVERTISEMENT", advertisement_list: advertisement_list } ),
		set_fetched_10_more_advertisement: (advertisement_list) => dispatch( { type: "SET_FETCHED_10_MORE_ADVERTISEMENT", advertisement_list: advertisement_list } ),

// page
		set_current_page: (current_page) => dispatch( { type: "SET_CURRENT_PAGE", current_page:current_page } ),
		set_fetched_pages: (page_list) => dispatch( { type: "SET_FETCHED_PAGE", page_list: page_list } ),
		set_fetched_10_more_page: (page_list) => dispatch( { type: "SET_FETCHED_10_MORE_PAGE", page_list: page_list } ),

// book
		set_current_book: (current_book) => dispatch( { type: "SET_CURRENT_BOOK", current_book:current_book } ),
		set_fetched_books: (book_list) => dispatch( { type: "SET_FETCHED_BOOK", book_list: book_list } ),
		set_fetched_10_more_book: (book_list) => dispatch( { type: "SET_FETCHED_10_MORE_BOOK", book_list: book_list } ),

// sport
		set_current_sport: (current_sport) => dispatch( { type: "SET_CURRENT_SPORT", current_sport:current_sport } ),
		set_fetched_sports: (sport_list) => dispatch( { type: "SET_FETCHED_SPORT", sport_list: sport_list } ),
		set_fetched_10_more_sport: (sport_list) => dispatch( { type: "SET_FETCHED_10_MORE_SPORT", sport_list: sport_list } ),


	};

};

// const sagaMiddleWare = createSagaMiddleware();

const persistConfig = {
	key: 'root',
	storage:AsyncStorage,
	blacklist: [
		'total_socialposts',
		'current_socialpost',
		'total_advertisements',
		'current_advertisement',
		'total_pages',
		'current_page',
		'total_books',
		'current_book',
		'total_sports',
		'current_sport',
		'toggle_show_comments_for_socialpost',
		'toggle_show_likes_for_socialpost',
		'toggle_show_likes_for_book',
		'toggle_show_likes_for_page',
		'toggle_show_likes_for_sport',
		'toggle_show_shares_for_socialpost',
		'list_of_friends',
		'list_of_friend_suggestions',
	],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer
	// , applyMiddleware(sagaMiddleWare)
	, applyMiddleware(ReduxThunk)
);

// export const persistor = persistStore(store)

// sagaMiddleWare.run(rootSaga);