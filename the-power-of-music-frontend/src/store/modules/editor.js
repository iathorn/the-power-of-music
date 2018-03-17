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
const AJAX_UPLOAD = 'editor/AJAX_UPLOAD';
const AJAX_COVER_UPLOAD = 'editor/AJAX_COVER_UPLOAD';
const GET_POST = 'editor/GET_POST';
const REMOVE_COVER = 'editor/REMOVE_COVER';
const REMOVE_TRACK = 'editor/REMOVE_TRACK';
const REMOVE_AJAX_COVER = 'editor/REMOVE_AJAX_COVER';
const EDIT_POST = 'editor/EDIT_POST';
const AJAX_REMOVE_TRACK = 'editor/AJAX_REMOVE_TRACK';
const AJAX_REMOVE_COVER = 'editor/AJAX_REMOVE_COVER';
// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const changeTrackFile = createAction(CHANGE_TRACK_FILE);
export const changeCoverFile = createAction(CHANGE_COVER_FILE);
export const ajaxUpload = createAction(AJAX_UPLOAD, api.ajaxUpload);
export const ajaxCoverUpload = createAction(AJAX_COVER_UPLOAD, api.ajaxCoverUpload);
export const getPost = createAction(GET_POST, api.getPost);
export const removeCover = createAction(REMOVE_COVER);
export const removeTrack = createAction(REMOVE_TRACK);
export const removeAjaxCover = createAction(REMOVE_AJAX_COVER, api.removeAjaxCover);
export const editPost = createAction(EDIT_POST, api.editPost);
export const ajaxRemoveTrack = createAction(AJAX_REMOVE_TRACK, api.ajaxRemoveTrack);
export const ajaxRemoveCover = createAction(AJAX_REMOVE_COVER, api.ajaxRemoveCover);

// initial state
const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null,
    trackFile: List(),
    coverFile: '',
    uploadedTrackList: List(),
    uploadedCover: '',
    artist: '',
    preloadedTrackList: List()
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
        return state.update('trackFile', trackFile => trackFile.push(fileName))
    },
    [CHANGE_COVER_FILE]: (state, action) => {
        const { fileName } = action.payload;
        return state.set('coverFile', fileName);
    },
    [REMOVE_COVER]: (state, action) => {
        return state.set('coverFile', '')
                    .set('uploadedCover', '');
    },
    [REMOVE_TRACK]: (state, action) => {
        console.log(action.payload);
        const { key } = action.payload;
        return state.update('uploadedTrackList', 
            uploadedTrackList => uploadedTrackList.splice(parseInt(key, 10), 1));
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    }),
    ...pender({
        type: AJAX_UPLOAD,
        onSuccess: (state, action) => {
            console.log(action.payload.data[0].filename);
            const { filename } = action.payload.data[0];
            return state.update('uploadedTrackList', uploadedTrackList => uploadedTrackList.push(filename));
        }
    }),
    ...pender({
        type: AJAX_COVER_UPLOAD,
        onSuccess: (state, action) => {
            const { filename } = action.payload.data[0];
            return state.set('uploadedCover', filename);
        }
    }),
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { list, tags, title, body, cover, artist } = action.payload.data;
            const preloadedTrackList = [];
            for(var i = 0;i < list.name.length;i++){
                preloadedTrackList.push({
                    name: list.name[i],
                    track: list.track[i]
                });
            }
            console.log(preloadedTrackList);
            return state.set('uploadedTrackList', initialState.get('uploadedTrackList'))
                        .set('tags', tags.join(', '))
                        .set('title', title)
                        .set('markdown', body)
                        .set('uploadedCover', cover)
                        .set('artist', artist);
        }
    })
}, initialState);