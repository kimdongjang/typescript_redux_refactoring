import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GithubAction } from './types';
import { getUserProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

/**
 *  TReturnType: thunk 함수에서 반환하는 값의 타입을 설정합니다.
    TState: 스토어의 상태에 대한 타입을 설정합니다.
    TExtraThunkArg: redux-thunk 미들웨어의 Extra Argument의 타입을 설정합니다.
    TBasicAction: dispatch 할 수 있는 액션들의 타입을 설정합니다.
 * @param username 
 * @returns 
 */
export function getUserProfileThunk(username: string): ThunkAction<void, RootState, null, GithubAction> {
    return async (dispatch: Dispatch) => {
        const { request, success, failure } = getUserProfileAsync;
        dispatch(request());
        try {
            const userProfile = await getUserProfile(username);
            dispatch(success(userProfile));
        } catch (e) {
            dispatch(failure(e as AxiosError));
        }
    };
}
