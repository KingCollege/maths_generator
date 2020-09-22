import { combineReducers } from 'redux';
import ModalReducer from './reducers/ModalReducer';
import MathsAPI from './reducers/MathsAPIReducer';
export default combineReducers({
    modal: ModalReducer,
    maths_api: MathsAPI,
});
