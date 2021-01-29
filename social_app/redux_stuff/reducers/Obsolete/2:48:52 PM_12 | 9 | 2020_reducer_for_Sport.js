const initialState = {

	currentSport:{
		},

	totalSport: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
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
