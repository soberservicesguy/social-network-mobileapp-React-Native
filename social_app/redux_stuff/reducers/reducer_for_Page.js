const initialState = {

	showOnlyLikesQuantityForPage:false,

	currentPage:{
			page_name:'dummy',
			page_image:'dummy',
			page_description:'dummy',
			endpoint:'dummy',
		},

	totalPage: [
			{ page_name:'dummy1', page_image:'dummy1', page_description:'dummy1', endpoint:'dummy1',},
			{ page_name:'dummy2', page_image:'dummy2', page_description:'dummy2', endpoint:'dummy2',},
			{ page_name:'dummy3', page_image:'dummy3', page_description:'dummy3', endpoint:'dummy3',},
			{ page_name:'dummy4', page_image:'dummy4', page_description:'dummy4', endpoint:'dummy4',},
			{ page_name:'dummy5', page_image:'dummy5', page_description:'dummy5', endpoint:'dummy5',},
			{ page_name:'dummy6', page_image:'dummy6', page_description:'dummy6', endpoint:'dummy6',},
			{ page_name:'dummy7', page_image:'dummy7', page_description:'dummy7', endpoint:'dummy7',},
			{ page_name:'dummy8', page_image:'dummy8', page_description:'dummy8', endpoint:'dummy8',},
			{ page_name:'dummy9', page_image:'dummy9', page_description:'dummy9', endpoint:'dummy9',},
			{ page_name:'dummy10', page_image:'dummy10', page_description:'dummy10', endpoint:'dummy10',},
		],
	}

const reducerForPage = (state = initialState, action) => {

	switch (action.type) {

		case "TOGGLE_LIKE_QUANTITY_FOR_PAGE":
			return {...state, showOnlyLikesQuantityForPage: (state.showOnlyLikesQuantityForPage === true) ? false : true }
			break;

		case "SET_CURRENT_PAGE":

			return {...state, currentPage: action.current_page}
			break;


		case "SET_FETCHED_PAGE":

			return {...state, totalPage: action.page_list}
			break;

		case "SET_FETCHED_10_MORE_PAGE":

			return {...state, totalPage: [...state.Page, action.page_list] }
			break;


		default:

			return state

	}

};

export default reducerForPage;
