import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const INITIALIZE = 'editor/ACTION_NAME';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const CHANGE_TRACK_FILE = 'editor/CHANGE_TRACK_FILE';
const CHANGE_COVER_FILE = 'editor/CHANGE_COVER_FILE';

// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const changeTrackFile = createAction(CHANGE_TRACK_FILE);
export const changeCoverFile = createAction(CHANGE_COVER_FILE);

// initial state
const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null,
    trackFile: '',
    coverFile: ''
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    [CHANGE_TRACK_FILE]: (state, action) => {
        const { fileName } = action.payload;
        return state.set('trackFile', fileName);
    },
    [CHANGE_COVER_FILE]: (state, action) => {
        const { fileName } = action.payload;
        return state.set('coverFile', fileName);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    })
}, initialState);