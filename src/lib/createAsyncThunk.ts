import { Dispatch } from 'redux';
import { AsyncActionCreator } from 'typesafe-actions';

type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;

/**
 * 
 * @param asyncActionCreator 액션 생성 함수
 * @param promiseCreator F extends (...params: any[]) => Promise<any>는 해당타입의 프로미스를 리턴하는 함수 형태만 받도록 설정함
 * @returns 
 */
export default function createAsyncThunk<A extends AnyAsyncActionCreator, F extends (...params: any[]) => Promise<any>>(
    asyncActionCreator: A,
    promiseCreator: F
) {
    type Params = Parameters<F>; // 프로미스의 함수 파라미터 타입을 추론해줌. F의 타입이 무엇인지(string, number, etc)

    // 위 params 타입을 통해 thunk 함수의 파라미터가 F함수의 파라미터와 동일해짐.
    return function thunk(...params: Params) {
        return async (dispatch: Dispatch) => {
            const { request, success, failure } = asyncActionCreator;
            dispatch(request(undefined)); // 파라미터를 비우면 타입 에러가 나기 때문에 undefined 전달
            try {
                const result = await promiseCreator(...params);
                dispatch(success(result));
            } catch (e) {
                dispatch(failure(e));
            }
        };
    };
}