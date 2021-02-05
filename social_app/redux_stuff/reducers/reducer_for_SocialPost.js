const initialState = {

	showOnlyCommentsQuantityForSocialPost:false,
	showOnlyLikesQuantityForSocialPost:false,
	showOnlySharesQuantityForSocialPost: false,

	currentSocialPost:{
			type_of_post:'dummy',
			post_text:'dummy',
			image_for_post:'dummy',
			video_for_post:'dummy',
			video_thumbnail_image:'dummy',
			total_likes:'dummy',
			total_shares:'dummy',
			endpoint:'dummy',
			date_of_publishing:'dummy',
		},

	totalSocialPost: [
			{ type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
			{ type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
			{ type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
			{ type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
			{ type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
			{ type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
			{ type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
			{ type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
			{ type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
			{ type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
		],
	}

const reducerForSocialPost = (state = initialState, action) => {

	switch (action.type) {

		case "TOGGLE_SHARE_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlySharesQuantityForSocialPost: (state.showOnlySharesQuantityForSocialPost === true) ? false : true }
			break;


		case "TOGGLE_COMMENT_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlyCommentsQuantityForSocialPost: (state.showOnlyCommentsQuantityForSocialPost === true) ? false : true }
			break;

		case "TOGGLE_LIKE_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlyLikesQuantityForSocialPost: (state.showOnlyLikesQuantityForSocialPost === true) ? false : true }
			break;

		case "SET_CURRENT_SOCIALPOST":

			return {...state, currentSocialPost: action.current_socialpost}
			break;


		case "SET_FETCHED_SOCIALPOST":

			return {...state, totalSocialPost: action.socialpost_list}
			break;

		case "SET_FETCHED_10_MORE_SOCIALPOST":

			return {...state, totalSocialPost: [...state.SocialPost, action.socialpost_list] }
			break;


		default:

			return state

	}

};

export default reducerForSocialPost;
