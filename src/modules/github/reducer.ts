import { createReducer } from 'typesafe-actions';
import { GithubState, GithubAction } from './types';

import { getUserProfileAsync } from './actions';
import { asyncState, createAsyncReducer } from '../../lib/reducerUtils';

// const initialState: GithubState = {
//     userProfile: {
//         loading: false,
//         error: null,
//         data: null
//     }
// };

// const github = createReducer<GithubState, GithubAction>(initialState, {
//     [GET_USER_PROFILE]: state => ({
//         ...state,
//         userProfile: {
//             loading: true,
//             error: null,
//             data: null
//         }
//     }),
//     [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
//         ...state,
//         userProfile: {
//             loading: false,
//             error: null,
//             data: action.payload
//         }
//     }),
//     [GET_USER_PROFILE_ERROR]: (state, action) => ({
//         ...state,
//         userProfile: {
//             loading: false,
//             error: action.payload,
//             data: null
//         }
//     })
// });

// export default github;

// githubState 타입으로 초기 상태를 지정
const initialState: GithubState = {
    userProfile: asyncState.initial(),
};

// const github = createReducer<GithubState, GithubAction>(initialState, {
//     [GET_USER_PROFILE]: (state) => ({
//         ...state,
//         userProfile: asyncState.load(),
//     }),
//     [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
//         ...state,
//         userProfile: asyncState.success(action.payload),
//     }),
//     [GET_USER_PROFILE_ERROR]: (state, action) => ({
//         ...state,
//         userProfile: asyncState.error(action.payload),
//     }),
// });

const github = createReducer<GithubState, GithubAction>(
    initialState,
).handleAction(
    [
        getUserProfileAsync.request,
        getUserProfileAsync.success,
        getUserProfileAsync.failure,
    ],
    createAsyncReducer(getUserProfileAsync, 'userProfile'),
);

export default github;
