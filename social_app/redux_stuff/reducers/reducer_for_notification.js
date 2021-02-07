const initialState = {
	all_notifications:[
	],
}

const reducerForNotification = (state = initialState, action) => {

	switch (action.type) {

		case "SET_FETCHED_NOTIFICATIONS":

			return {...state, all_notifications: action.notifications_list}
			break;

		default:

			return state

	}

};

export default reducerForNotification;
