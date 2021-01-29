const initialState = {

	isAllowedBasic: false,
	isAllowedPostsInteraction: false,
	isAllowedPostsCreation: false,
	isAllowedAdsCreation: false,
	isAllowedBooksCreation: false,
	isAllowedPagesCreation: false,
	isAllowedSportsCreation: false,

}

const reducerForPrivileges = (state = initialState, action) => {

	switch (action.type) {

		case "ALLOW_BASIC":

			return {...state, isAllowedBasic: true}
			break;

		case "ALLOW_POSTS_INTERACTION":

			return {...state, isAllowedPostsInteraction: true}
			break;

		case "ALLOW_POSTS_CREATION":

			return {...state, isAllowedPostsCreation: true}
			break;

		case "ALLOW_ADS_CREATION":

			return {...state, isAllowedAdsCreation: true}
			break;

		case "ALLOW_BOOKS_CREATION":

			return {...state, isAllowedBooksCreation: true}
			break;

		case "ALLOW_PAGES_CREATION":

			return {...state, isAllowedPagesCreation: true}
			break;

		case "ALLOW_SPORTS_CREATION":

			return {...state, isAllowedSportsCreation: true}
			break;





		case "REVOKE_BASIC":

			return {...state, isAllowedBasic: false}
			break;

		case "REVOKE_POSTS_INTERACTION":

			return {...state, isAllowedPostsInteraction: false}
			break;

		case "REVOKE_POSTS_CREATION":

			return {...state, isAllowedPostsCreation: false}
			break;

		case "REVOKE_ADS_CREATION":

			return {...state, isAllowedAdsCreation: false}
			break;

		case "REVOKE_BOOKS_CREATION":

			return {...state, isAllowedBooksCreation: false}
			break;

		case "REVOKE_PAGES_CREATION":

			return {...state, isAllowedPagesCreation: false}
			break;

		case "REVOKE_SPORTS_CREATION":

			return {...state, isAllowedSportsCreation: false}
			break;


		default:

			return state

	}

};

export default reducerForPrivileges;
