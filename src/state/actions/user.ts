import {
  Dispatch
} from 'redux';

import Service from './../../service';

import * as constants from './../constants/user';

//获取用户信息
export const getUserInfo = (token: string) => (
  async (dispatch: Dispatch) => {
    const para = {
      accesstoken: token
    }
    try {
      const res = await Service.post(
        `/accesstoken`, para
      );
      dispatch({
        data: {...res, token:token},
        type: constants.getUserInfo
      })
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
)
