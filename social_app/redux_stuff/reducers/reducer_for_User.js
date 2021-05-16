const initialState = {

	list_of_friends:[],
	suggestions:[],
	requests:[],

	total_friends:0,

	isSignedIn: false,
	userToken: null,

	phone_number: null,
	user_name: null,
	user_name_in_profile: null,
	user_avatar_image: null,
	user_cover_image: null,
	// user_brief_intro:'dummy',
	// user_about_me:'dummy',
	// user_working_zone:'dummy',
	// user_education:'dummy',
	// user_contact_details:'dummy',
}

const reducerForUser = (state = initialState, action) => {

	switch (action.type) {

		case "SET_FRIENDS_COUNT":

			return {...state, total_friends: action.total_friends}
			break;


		case "SET_FRIENDS":

			return {...state, list_of_friends: action.friends_list}
			break;

		case "SET_FRIENDS_SUGGESTIONS":

			return {...state, suggestions: action.args_list}
			break;

		case "SET_FRIENDS_REQUESTS":

			return {...state, requests: action.args_list}
			break;


		case "SET_IS_SIGNED_IN":

			return {...state, isSignedIn: action.booleon}
			break;

		case "SET_USER_TOKEN":

			return {...state, userToken: action.token}
			break;

		case "SET_PHONE_NUMBER":

			return {...state, phone_number: action.phone_number}
			break;

		case "REMOVE_PHONE_NUMBER":

			return {...state, phone_number: null}
			break;

		case "SET_USER_NAME":

			return {...state, user_name: action.user_name}
			break;

		case "REMOVE_USER_NAME":

			return {...state, user_name: null}
			break;

		case "SET_USER_NAME_IN_PROFILE":

			return {...state, user_name_in_profile: action.user_name_in_profile}
			break;

		case "REMOVE_USER_NAME_IN_PROFILE":

			return {...state, user_name_in_profile: null}
			break;

		case "SET_USER_AVATAR_IMAGE":

			return {...state, user_avatar_image: action.user_avatar_image}
			break;

		case "REMOVE_USER_AVATAR_IMAGE":

			return {...state, user_avatar_image: null}
			break;

		case "SET_USER_COVER_IMAGE":

			return {...state, user_cover_image: action.user_cover_image}
			break;

		case "REMOVE_USER_COVER_IMAGE":

			return {...state, user_cover_image: null}
			break;

		// case "SET_USER_BRIEF_INTRO":

		// 	return {...state, user_brief_intro: action.user_brief_intro}
		// 	break;

		// case "REMOVE_USER_BRIEF_INTRO":

		// 	return {...state, user_brief_intro: null}
		// 	break;

		// case "SET_USER_ABOUT_ME":

		// 	return {...state, user_about_me: action.user_about_me}
		// 	break;

		// case "REMOVE_USER_ABOUT_ME":

		// 	return {...state, user_about_me: null}
		// 	break;

		// case "SET_USER_WORKING_ZONE":

		// 	return {...state, user_working_zone: action.user_working_zone}
		// 	break;

		// case "REMOVE_USER_WORKING_ZONE":

		// 	return {...state, user_working_zone: null}
		// 	break;

		// case "SET_USER_EDUCATION":

		// 	return {...state, user_education: action.user_education}
		// 	break;

		// case "REMOVE_USER_EDUCATION":

		// 	return {...state, user_education: null}
		// 	break;

		// case "SET_USER_CONTACT_DETAILS":

		// 	return {...state, user_contact_details: action.user_contact_details}
		// 	break;

		// case "REMOVE_USER_CONTACT_DETAILS":

		// 	return {...state, user_contact_details: null}
		// 	break;

		default:

			return state

	}

};

export default reducerForUser;
