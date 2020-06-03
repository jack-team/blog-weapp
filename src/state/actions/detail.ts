import {
  Dispatch
} from 'redux';

import Service from './../../service';
import * as types from './../constants/detail';

//获取话题详情
export const getTopicDetail = (topicId:string) => {
   return async (dispatch:Dispatch) => {
     try {
       const res = await Service.get(
         `/topic/${topicId}`
       )

       dispatch({
         data:res,
         type:types.getTopicDetail
       })

       return res;

     }
     catch (e) {
       return Promise.reject(e);
     }
   }
}


export default interface Actions {
  getTopicDetail(topicId:string):Promise<any>
}
