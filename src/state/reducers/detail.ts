import {
  Action
} from 'redux';

import {
  Tab,
  author
} from './home';

import * as types from './../constants/detail';

export interface ReplyItem {
  id: string,
  author: author,
  content: string,
  is_uped: boolean,
  reply_id: string,
  create_at: string
}

export interface Detail {
  tab: Tab,
  author:author,
  id: string,
  top: boolean,
  title: string,
  good: boolean,
  content: string,
  create_at: string,
  author_id: string,
  is_collect: boolean,
  last_reply_at: string,
  reply_count: number,
  visit_count: number,
  replies: Array<ReplyItem>
}

export interface InitState {
  details: {
    [topicId: string]: Detail
  }
}

interface _Action extends Action {
  data:any
}

const initState: InitState = {
  details: {}
}

export default (state = initState,action:_Action) => {
  const {
    data,
    type
  } = action;

  switch (type) {
    case types.getTopicDetail:{
      const {
        id
      } = data as Detail;

      state.details[id] = data;

      return { ...state };
    }
  }

  return state;
}
