import {
  Action
} from 'redux';

interface InitState {
  token:string,
  userInfo:any
}

interface _Action extends Action {
  data:any
}

import * as constants from './../constants/user';

const initState:InitState = {
  token:``,
  userInfo:{}
}

export default (
  state: InitState = initState,
  action: _Action
) => {

  const {
    type,
    data
  } = action;

  switch (type) {
    case constants.getUserInfo: {
      state.userInfo = data;
      state.token = data.token;
      return {
        ...state
      };
    }

    case constants.userLoginOut: {
      state.userInfo = {};
      state.token = ``;
      return {
        ...state
      };
    }
  }

  return state;
}
