import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AsyncState } from '../../lib/reducerUtils';

// 액션을 typeof actions으로 지정. reducer쪽에서 actions인지 알아볼 수 있게.
export type GithubAction = ActionType<typeof actions>;

// export type GithubState = {
//   userProfile: {
//     loading: boolean;
//     error: Error | null;
//     data: GithubProfile | null;
//   };
// };

// github라고 하는 reducer의 state를 리팩터링된 state 타입으로 초기화
export type GithubState = {
    userProfile: AsyncState<GithubProfile, Error>;
};
