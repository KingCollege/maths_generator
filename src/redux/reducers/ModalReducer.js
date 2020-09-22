import { TOGGLE_MODAL } from '../actions/ModalAction';

const initial_state = {
    toggle_modal: false,
};

const toggle_modal_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return { ...state, toggle_modal: action.toggle };
        default:
            return state;
    }
};

export default toggle_modal_reducer;
