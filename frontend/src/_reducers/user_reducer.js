import {
    LOGIN_USER,
    REGISTER_USER,
    CHECK_USER,
    SEND_EMAIL
} from '../_actions/types';

const initialState = {
    LoginSuccess: null,
    register: null,
    check: null,
    send: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, LoginSuccess: action.payload };

        case REGISTER_USER:
            return { ...state, register: action.payload };

        case CHECK_USER:
            return { ...state, check: action.payload };

        case SEND_EMAIL:
            return { ...state, send: action.payload };

        default:
            return state;
    }
}