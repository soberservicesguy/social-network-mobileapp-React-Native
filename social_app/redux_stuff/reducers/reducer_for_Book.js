const initialState = {

	showOnlyLikesQuantityForBook:false,

	currentBook:{
		// book_name:'dummy',
		// book_image:'dummy',
		// book_description:'dummy',
		// endpoint:'dummy',
	},

	totalBook: [
			// { book_name:'dummy1', book_image:'dummy1', book_description:'dummy1', endpoint:'dummy1',},
			// { book_name:'dummy2', book_image:'dummy2', book_description:'dummy2', endpoint:'dummy2',},
			// { book_name:'dummy3', book_image:'dummy3', book_description:'dummy3', endpoint:'dummy3',},
			// { book_name:'dummy4', book_image:'dummy4', book_description:'dummy4', endpoint:'dummy4',},
			// { book_name:'dummy5', book_image:'dummy5', book_description:'dummy5', endpoint:'dummy5',},
			// { book_name:'dummy6', book_image:'dummy6', book_description:'dummy6', endpoint:'dummy6',},
			// { book_name:'dummy7', book_image:'dummy7', book_description:'dummy7', endpoint:'dummy7',},
			// { book_name:'dummy8', book_image:'dummy8', book_description:'dummy8', endpoint:'dummy8',},
			// { book_name:'dummy9', book_image:'dummy9', book_description:'dummy9', endpoint:'dummy9',},
			// { book_name:'dummy10', book_image:'dummy10', book_description:'dummy10', endpoint:'dummy10',},
		],
	}

const reducerForBook = (state = initialState, action) => {

	switch (action.type) {

		case "HIDE_LIKE_QUANTITY_FOR_BOOK":
			return {...state, showOnlyLikesQuantityForBook: false }
			break;


		case "TOGGLE_LIKE_QUANTITY_FOR_BOOK":
			return {...state, showOnlyLikesQuantityForBook: (state.showOnlyLikesQuantityForBook === true) ? false : true }
			break;

		case "SET_CURRENT_BOOK":

			return {...state, currentBook: action.current_book}
			break;


		case "SET_FETCHED_BOOK":

			return {...state, totalBook: action.book_list}
			break;

		case "SET_FETCHED_10_MORE_BOOK":

			return {...state, totalBook: [...state.Book, action.book_list] }
			break;


		default:

			return state

	}

};

export default reducerForBook;
