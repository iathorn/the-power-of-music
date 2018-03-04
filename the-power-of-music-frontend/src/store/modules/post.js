import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const ACTION_NAME = 'domain/ACTION_NAME';

// action creator
export const actionCreator = createAction(ACTION_NAME);

// initial state
const initialState = Map({
    
});

// reducer
export default handleActions({
    [ACTION_NAME]: (state, action) => {
        return state;
    }
}, initialState);