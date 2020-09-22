export const MATHS_API_REQUEST = 'MATHS_API_REQUEST';
export const MATHS_API_RESPONSE = 'MATHS_API_RESPONSE';

// request/response type => used as initial state attributes
export const CATEGORIES = 'categories';
export const QUESTIONS = 'questions';

export const maths_api_request = (url, request_type) => ({
    type: MATHS_API_REQUEST,
    url,
    request_type,
});

export const maths_api_response = (response, response_type) => ({
    type: MATHS_API_RESPONSE,
    response,
    response_type,
});
