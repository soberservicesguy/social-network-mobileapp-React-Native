const initialState = {

	currentAdvertisement:{
		// ad_name:'dummy',
		// ad_image:'dummy',
		// ad_description:'dummy',
		// endpoint:'dummy',
	},

	totalAdvertisement: [
			// { ad_name:'dummy1', ad_image:'dummy1', ad_description:'dummy1', endpoint:'dummy1',},
			// { ad_name:'dummy2', ad_image:'dummy2', ad_description:'dummy2', endpoint:'dummy2',},
			// { ad_name:'dummy3', ad_image:'dummy3', ad_description:'dummy3', endpoint:'dummy3',},
			// { ad_name:'dummy4', ad_image:'dummy4', ad_description:'dummy4', endpoint:'dummy4',},
			// { ad_name:'dummy5', ad_image:'dummy5', ad_description:'dummy5', endpoint:'dummy5',},
			// { ad_name:'dummy6', ad_image:'dummy6', ad_description:'dummy6', endpoint:'dummy6',},
			// { ad_name:'dummy7', ad_image:'dummy7', ad_description:'dummy7', endpoint:'dummy7',},
			// { ad_name:'dummy8', ad_image:'dummy8', ad_description:'dummy8', endpoint:'dummy8',},
			// { ad_name:'dummy9', ad_image:'dummy9', ad_description:'dummy9', endpoint:'dummy9',},
			// { ad_name:'dummy10', ad_image:'dummy10', ad_description:'dummy10', endpoint:'dummy10',},
		],
	}

const reducerForAdvertisement = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_ADVERTISEMENT":

			return {...state, currentAdvertisement: action.current_advertisement}
			break;


		case "SET_FETCHED_ADVERTISEMENT":

			return {...state, totalAdvertisement: action.advertisement_list}
			break;

		case "SET_FETCHED_10_MORE_ADVERTISEMENT":

			return {...state, totalAdvertisement: [...state.Advertisement, action.advertisement_list] }
			break;


		default:

			return state

	}

};

export default reducerForAdvertisement;
