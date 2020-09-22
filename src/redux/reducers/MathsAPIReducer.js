import { MATHS_API_REQUEST, MATHS_API_RESPONSE } from '../actions/MathsAPIAction';

const initial_state = {
    categories: {},
    questions: {},
};

const maths_api = (state = initial_state, action) => {
    switch (action.type) {
        case MATHS_API_REQUEST:
            return state;
        case MATHS_API_RESPONSE:
            return {
                ...state,
                [action.response_type]: action.response,
            };
        default:
            return state;
    }
};

export default maths_api;
