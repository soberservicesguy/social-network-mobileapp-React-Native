const initialState = {

	totalLikes:[],
	totalShares:[],
	totalComments:[],

	showOnlyCommentsQuantityForSocialPost:false,
	showOnlyLikesQuantityForSocialPost:false,
	showOnlySharesQuantityForSocialPost: false,


	currentSocialPost:{
		// type_of_post:'dummy',
		// post_text:'dummy',
		// image_for_post:'dummy',
		// video_for_post:'dummy',
		// video_thumbnail_image:'dummy',
		// total_likes:'dummy',
		// total_shares:'dummy',
		// endpoint:'dummy',
		// date_of_publishing:'dummy',
	},



	totalSocialPost: [
			// { type_of_post:'dummy1', post_text:'dummy1', image_for_post:'dummy1', video_for_post:'dummy1', video_thumbnail_image:'dummy1', total_likes:'dummy1', total_shares:'dummy1', endpoint:'dummy1', date_of_publishing:'dummy1',},
			// { type_of_post:'dummy2', post_text:'dummy2', image_for_post:'dummy2', video_for_post:'dummy2', video_thumbnail_image:'dummy2', total_likes:'dummy2', total_shares:'dummy2', endpoint:'dummy2', date_of_publishing:'dummy2',},
			// { type_of_post:'dummy3', post_text:'dummy3', image_for_post:'dummy3', video_for_post:'dummy3', video_thumbnail_image:'dummy3', total_likes:'dummy3', total_shares:'dummy3', endpoint:'dummy3', date_of_publishing:'dummy3',},
			// { type_of_post:'dummy4', post_text:'dummy4', image_for_post:'dummy4', video_for_post:'dummy4', video_thumbnail_image:'dummy4', total_likes:'dummy4', total_shares:'dummy4', endpoint:'dummy4', date_of_publishing:'dummy4',},
			// { type_of_post:'dummy5', post_text:'dummy5', image_for_post:'dummy5', video_for_post:'dummy5', video_thumbnail_image:'dummy5', total_likes:'dummy5', total_shares:'dummy5', endpoint:'dummy5', date_of_publishing:'dummy5',},
			// { type_of_post:'dummy6', post_text:'dummy6', image_for_post:'dummy6', video_for_post:'dummy6', video_thumbnail_image:'dummy6', total_likes:'dummy6', total_shares:'dummy6', endpoint:'dummy6', date_of_publishing:'dummy6',},
			// { type_of_post:'dummy7', post_text:'dummy7', image_for_post:'dummy7', video_for_post:'dummy7', video_thumbnail_image:'dummy7', total_likes:'dummy7', total_shares:'dummy7', endpoint:'dummy7', date_of_publishing:'dummy7',},
			// { type_of_post:'dummy8', post_text:'dummy8', image_for_post:'dummy8', video_for_post:'dummy8', video_thumbnail_image:'dummy8', total_likes:'dummy8', total_shares:'dummy8', endpoint:'dummy8', date_of_publishing:'dummy8',},
			// { type_of_post:'dummy9', post_text:'dummy9', image_for_post:'dummy9', video_for_post:'dummy9', video_thumbnail_image:'dummy9', total_likes:'dummy9', total_shares:'dummy9', endpoint:'dummy9', date_of_publishing:'dummy9',},
			// { type_of_post:'dummy10', post_text:'dummy10', image_for_post:'dummy10', video_for_post:'dummy10', video_thumbnail_image:'dummy10', total_likes:'dummy10', total_shares:'dummy10', endpoint:'dummy10', date_of_publishing:'dummy10',},
		],

	}

const reducerForSocialPost = (state = initialState, action) => {

	let list_with_key = []
	let last_key


	switch (action.type) {

		case "SET_LIKES":
			return {...state, totalLikes: action.likes_list}
			break;
		case "SET_COMMENTS":
			return {...state, totalComments: action.comments_list}
			break;
		case "SET_SHARES":
			return {...state, totalShares: action.shares_list}
			break;




		case "HIDE_SHARE_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlySharesQuantityForSocialPost: false }
			break;


		case "HIDE_COMMENT_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlyCommentsQuantityForSocialPost: false }
			break;

		case "HIDE_LIKE_QUANTITY_FOR_SOCIALPOST":
			return {...state, showOnlyLikesQuantityForSocialPost: false }
			break;



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

			return {...state, currentSocialPost: action.post}
			break;


		case "APPEND_FETCHED_SOCIALPOST":

			last_key = (state.totalSocialPost.length > 0) ? state.totalSocialPost[ state.totalSocialPost.length - 1 ].key : 0
			// console.log({last_key:last_key})
			list_with_key = [ ...state.totalSocialPost ] // since previously we assigned keys

			action.socialpost_list.map((item, index) => {
				list_with_key.push( {key: last_key + index + 1, ...item} )
			})

			return {...state, totalSocialPost: list_with_key }
			break;



		case "SET_FETCHED_SOCIALPOST":

			list_with_key = []

			action.socialpost_list.map((item, index) => {
				list_with_key.push( {key: index, ...item} )
			})

			return {...state, totalSocialPost: list_with_key}
			break;

		case "SET_FETCHED_10_MORE_SOCIALPOST":

			last_key = (state.totalSocialPost.length > 0) ? state.totalSocialPost[ state.totalSocialPost.length - 1 ].key : 0

			list_with_key = [ ...state.totalSocialPost ] // since previously we assigned keys

			action.socialpost_list.map((item, index) => {
				list_with_key.push( {key: last_key + index + 1, ...item} )
			})

			return {...state, totalSocialPost: list_with_key }
			break;


		case 'ADD_SOCIALPOSTS': 
			return {...state, totalSocialPost:action.socialposts}
		


		default:

			return state

	}

};

export default reducerForSocialPost;

// Write a synchronous outer function that receives the `text` parameter:
export function add_more_socialposts(socialpost_list) {
	// And then creates and returns the async thunk function:
	return async function saveNewTodoThunk(dispatch, getState) {
		// ✅ Now we can use the text value and send it to the server

		let current_state = getState()
		// console.log(current_state)
		// let current_socialposts = current_state.totalSocialPost
		let { socialposts } = current_state
		// console.log( Object.keys(current_state) )
		// console.log(socialposts.totalSocialPost)
		socialposts = socialposts.totalSocialPost

		let last_key = (socialposts.length > 0) ? socialposts[ socialposts.length - 1 ].key  : 0
		// console.log({last_key:last_key})
		let list_with_key = [ ...socialposts ] // since previously we assigned keys

		socialpost_list.map((item, index) => {
			list_with_key.push( {key: last_key + index + 1, ...item} )
		})

		// console.log(list_with_key)

		dispatch({type:'ADD_SOCIALPOSTS', socialposts: list_with_key })
	}
}


// store.dispatch( add_more_socialposts(socialpost_list) )