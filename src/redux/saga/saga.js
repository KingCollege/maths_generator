import { call, put, takeEvery } from 'redux-saga/effects';
import { MATHS_API_REQUEST, maths_api_response } from '../actions/MathsAPIAction';
import { maths_api } from './api';

function* maths_api_cate(action) {
    const data = yield call(maths_api, action.url);
    yield put(maths_api_response(data, action.request_type));
}

function* mySaga() {
    yield takeEvery(MATHS_API_REQUEST, maths_api_cate);
}

export default mySaga;
