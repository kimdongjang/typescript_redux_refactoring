import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { AnyAsyncActionCreator } from './types';
/**
 * 리팩터링 state의 data 타입을 T로 두며 어떤 타입의 데이터라도 받을 수 있도록 state type을 지정
 */
export type AsyncState<T, E = any> = {
    data: T | null;
    loading: boolean;
    error: E | null;
};

export const asyncState = {
    // 다음 코드는 화살표 함수에 Generic 을 설정 한 것입니다.
    // T, E는 any 타입이고,
    // initialData는 T의 타입으로 지정
    // 결과값은  AsyncState<T, E> 타입으로 반환
    initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
        loading: false,
        data: initialData || null,
        error: null,
    }),
    load: <T, E = any>(data?: T): AsyncState<T, E> => ({
        loading: true,
        data: data || null,
        error: null,
    }),
    success: <T, E = any>(data: T): AsyncState<T, E> => ({
        loading: false,
        data,
        error: null,
    }),
    error: <T, E>(error: E): AsyncState<T, E> => ({
        loading: false,
        data: null,
        error: error,
    }),
};

export function createAsyncReducer<
    S,
    AC extends AnyAsyncActionCreator,
    K extends keyof S,
>(asyncActionCreator: AC, key: K) {
    return (state: S, action: AnyAction) => {
        // 각 액션 생성함수의 type 을 추출해줍니다.
        const [request, success, failure] = [
            asyncActionCreator.request,
            asyncActionCreator.success,
            asyncActionCreator.failure,
        ].map(getType);
        switch (action.type) {
            case request:
                return {
                    ...state,
                    [key]: asyncState.load(),
                };
            case success:
                return {
                    ...state,
                    [key]: asyncState.success(action.payload),
                };
            case failure:
                return {
                    ...state,
                    [key]: asyncState.error(action.payload),
                };
            default:
                return state;
        }
    };
}
