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
