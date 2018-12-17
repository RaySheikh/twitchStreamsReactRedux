import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	userId: null,
	userName: null,
	imgUrl: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			const { userId, userName, imgUrl } = action.payload;
			return { ...state, isSignedIn: true, userId, userName, imgUrl };
		case SIGN_OUT:
			return {
				...state,
				isSignedIn: false,
				userId: null,
				userName: null,
				imgUrl: null
			};
		default:
			return state;
	}
};
