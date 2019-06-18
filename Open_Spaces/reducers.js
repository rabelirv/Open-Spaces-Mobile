import { combineReducers } from 'redux';

const rootReducer = (state = {
    token: null,
    loading: true,
    error: null,
    navigate: null
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token };
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        case 'ACCESS_NAVIGATION':
            return { ...state, navigate:action.navigate}
        default:
            return state;
    }
};

export default combineReducers({
    token: rootReducer
});
