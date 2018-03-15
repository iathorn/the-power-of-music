import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const ADMIN_LOGIN = 'base/ADMIN_LOGIN';
const CHECK_ADMIN_LOGIN = 'base/CHECK_ADMIN_LOGIN';
const ADMIN_LOGOUT = 'base/ADMIN_LOGOUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const TEMP_LOGIN = 'base/TEMP_LOGIN';

// action creator
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const adminLogin = createAction(ADMIN_LOGIN, api.adminLogin);
export const checkAdminLogin = createAction(CHECK_ADMIN_LOGIN, api.adminLoginCheck);
export const adminLogout = createAction(ADMIN_LOGOUT, api.adminLogout);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const tempLogin = createAction(TEMP_LOGIN);

// initial state
const initialState = Map({
    modal: Map({
        remove: false,
        login: false
    }),
    loginModal: Map({
        password: '',
        error: false
    }),
    logged: false
});

// reducer
export default handleActions({
    [SHOW_MODAL]: (state, action) => {
        const { payload: modalName } = action;
        return state.setIn(['modal', modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
        const { payload: modalName } = action;
        return state.setIn(['modal', modalName], false);
    },
    [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        return state.set('loginModal', initialState.get('loginModal'));
    },
    ...pender({
        type: ADMIN_LOGIN,
        onSuccess: (state, action) => {
            return state.set('logged', true);
        },
        onError: (state, action) => {
            return state.setIn(['loginModal', 'error'], true)
                        .setIn(['loginModal', 'password'], '');
        }
    }),
    ...pender({
        type: CHECK_ADMIN_LOGIN,
        onSuccess: (state, action) => {
            const { logged } = action.payload.data;
            return state.set('logged', logged);
        }
    }),
    [CHANGE_PASSWORD_INPUT]: (state, action) => {
        const { payload: value } = action;
        return state.setIn(['loginModal', 'password'], value);

    },
    [TEMP_LOGIN]: (state, action) => {
        return state.set('logged', true);
    }
}, initialState);