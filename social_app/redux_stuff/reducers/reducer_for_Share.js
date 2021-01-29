const initialState = {

	currentShare:{
			phone_number:'dummy',
			user_name:'dummy',
			user_name_in_profile:'dummy',
			user_avatar_image:'dummy',
			user_cover_image:'dummy',
			user_brief_intro:'dummy',
			user_about_me:'dummy',
			user_working_zone:'dummy',
			user_education:'dummy',
			user_contact_details:'dummy',
		},

	totalShare: [
			{ phone_number:'dummy1', user_name:'dummy1', user_name_in_profile:'dummy1', user_avatar_image:'dummy1', user_cover_image:'dummy1', user_brief_intro:'dummy1', user_about_me:'dummy1', user_working_zone:'dummy1', user_education:'dummy1', user_contact_details:'dummy1',},
			{ phone_number:'dummy2', user_name:'dummy2', user_name_in_profile:'dummy2', user_avatar_image:'dummy2', user_cover_image:'dummy2', user_brief_intro:'dummy2', user_about_me:'dummy2', user_working_zone:'dummy2', user_education:'dummy2', user_contact_details:'dummy2',},
			{ phone_number:'dummy3', user_name:'dummy3', user_name_in_profile:'dummy3', user_avatar_image:'dummy3', user_cover_image:'dummy3', user_brief_intro:'dummy3', user_about_me:'dummy3', user_working_zone:'dummy3', user_education:'dummy3', user_contact_details:'dummy3',},
			{ phone_number:'dummy4', user_name:'dummy4', user_name_in_profile:'dummy4', user_avatar_image:'dummy4', user_cover_image:'dummy4', user_brief_intro:'dummy4', user_about_me:'dummy4', user_working_zone:'dummy4', user_education:'dummy4', user_contact_details:'dummy4',},
			{ phone_number:'dummy5', user_name:'dummy5', user_name_in_profile:'dummy5', user_avatar_image:'dummy5', user_cover_image:'dummy5', user_brief_intro:'dummy5', user_about_me:'dummy5', user_working_zone:'dummy5', user_education:'dummy5', user_contact_details:'dummy5',},
			{ phone_number:'dummy6', user_name:'dummy6', user_name_in_profile:'dummy6', user_avatar_image:'dummy6', user_cover_image:'dummy6', user_brief_intro:'dummy6', user_about_me:'dummy6', user_working_zone:'dummy6', user_education:'dummy6', user_contact_details:'dummy6',},
			{ phone_number:'dummy7', user_name:'dummy7', user_name_in_profile:'dummy7', user_avatar_image:'dummy7', user_cover_image:'dummy7', user_brief_intro:'dummy7', user_about_me:'dummy7', user_working_zone:'dummy7', user_education:'dummy7', user_contact_details:'dummy7',},
			{ phone_number:'dummy8', user_name:'dummy8', user_name_in_profile:'dummy8', user_avatar_image:'dummy8', user_cover_image:'dummy8', user_brief_intro:'dummy8', user_about_me:'dummy8', user_working_zone:'dummy8', user_education:'dummy8', user_contact_details:'dummy8',},
			{ phone_number:'dummy9', user_name:'dummy9', user_name_in_profile:'dummy9', user_avatar_image:'dummy9', user_cover_image:'dummy9', user_brief_intro:'dummy9', user_about_me:'dummy9', user_working_zone:'dummy9', user_education:'dummy9', user_contact_details:'dummy9',},
			{ phone_number:'dummy10', user_name:'dummy10', user_name_in_profile:'dummy10', user_avatar_image:'dummy10', user_cover_image:'dummy10', user_brief_intro:'dummy10', user_about_me:'dummy10', user_working_zone:'dummy10', user_education:'dummy10', user_contact_details:'dummy10',},
		],
	}

const reducerForShare = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_SHARE":

			return {...state, currentShare: action.current_share}
			break;


		case "SET_FETCHED_SHARE":

			return {...state, totalShare: action.share_list}
			break;

		case "SET_FETCHED_10_MORE_SHARE":

			return {...state, totalShare: [...state.Share, action.share_list] }
			break;


		default:

			return state

	}

};

export default reducerForShare;
