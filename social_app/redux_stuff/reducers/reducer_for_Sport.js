const initialState = {

	currentSport:{
			sport_name:'dummy',
			sport_image:'dummy',
			sport_description:'dummy',
			endpoint:'dummy',
		},

	totalSport: [
			{ sport_name:'dummy1', sport_image:'dummy1', sport_description:'dummy1', endpoint:'dummy1',},
			{ sport_name:'dummy2', sport_image:'dummy2', sport_description:'dummy2', endpoint:'dummy2',},
			{ sport_name:'dummy3', sport_image:'dummy3', sport_description:'dummy3', endpoint:'dummy3',},
			{ sport_name:'dummy4', sport_image:'dummy4', sport_description:'dummy4', endpoint:'dummy4',},
			{ sport_name:'dummy5', sport_image:'dummy5', sport_description:'dummy5', endpoint:'dummy5',},
			{ sport_name:'dummy6', sport_image:'dummy6', sport_description:'dummy6', endpoint:'dummy6',},
			{ sport_name:'dummy7', sport_image:'dummy7', sport_description:'dummy7', endpoint:'dummy7',},
			{ sport_name:'dummy8', sport_image:'dummy8', sport_description:'dummy8', endpoint:'dummy8',},
			{ sport_name:'dummy9', sport_image:'dummy9', sport_description:'dummy9', endpoint:'dummy9',},
			{ sport_name:'dummy10', sport_image:'dummy10', sport_description:'dummy10', endpoint:'dummy10',},
		],
	}

const reducerForSport = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_SPORT":

			return {...state, currentSport: action.current_sport}
			break;


		case "SET_FETCHED_SPORT":

			return {...state, totalSport: action.sport_list}
			break;

		case "SET_FETCHED_10_MORE_SPORT":

			return {...state, totalSport: [...state.Sport, action.sport_list] }
			break;


		default:

			return state

	}

};

export default reducerForSport;
