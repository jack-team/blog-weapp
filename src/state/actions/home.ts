import {
  Dispatch
} from 'redux';

import Service from './../../service';
import * as types from './../constants/home';

interface topicPara {
  limit: number,
  page: number,
  tab: string
}

const whiteFields:Array<string> = [
  `id`,
  `top`,
  `good`,
  `title`,
  `author`,
  `visit_count`,
  `last_reply_at`
]

const getWhiteValue = (item: any) => {
  const _value: any = {};
  whiteFields.forEach((key: string) => (
    _value[key] = item[key]
  ))
  return _value;
}

//获取推荐列表
export const getTopicList = (
  para: topicPara
) => (
  async (dispatch: Dispatch) => {
    const {
      tab,
      page
    } = para;

    try {
      const list = (
        await Service.get(
          `/topics`, para
        )
      ) as Array<any>

      const queryList = (
        list.map(getWhiteValue)
      )

      const data = {
        tab: tab,
        page: page,
        list: queryList,
        loaded: page > 1
      }

      dispatch({
        data: data,
        type: types.getTopicList
      })

      return list;
    }
    catch (e) {
      return Promise.reject(e)
    }
  }
)


interface Actions {
  getTopicList(para: topicPara): Promise<any>
}

export default Actions;
