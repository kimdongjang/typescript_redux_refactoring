import { createAsyncAction  } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AxiosError } from 'axios';


export const GET_USER_PROFILE = 'github/GET_USER_PROFILE'; // 요청이 시작됐을 때 디스패치 되는 액션
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS'; // 디스패치 성공시 GithubProfile 매핑해서 결과 반환
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR'; // 디스패치 실패시 AxiosError 에러 반환

// 직관적
// export const getUserProfile = createStandardAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>();

// 리팩터링 전
// export const getUserProfileAsync = createAsyncAction(
//     GET_USER_PROFILE,
//     GET_USER_PROFILE_SUCCESS,
//     GET_USER_PROFILE_ERROR
//   )<undefined, GithubProfile, AxiosError>();

// 리팩터링 후(액션 생성 함수의 any타입에 넣을 타입을 명시)
  export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
  )<string, GithubProfile, AxiosError>();