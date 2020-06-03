import {
  Action
} from 'redux';

import * as types from './../../state/constants/home';

export interface author {
  loginname: string,
  avatar_url: string
}

export type Tab = 'ask' | 'share' | 'job' | 'good' | 'all';

export interface TopicItem {
  tab: Tab,
  id: string,
  top: boolean,
  title: string,
  author: author,
  author_id: string,
  content: string,
  create_at: string,
  good: boolean,
  visit_count: number,
  reply_count: number,
  last_reply_at: string
}

export interface TabItem {
  page: number,
  list: Array<TopicItem>
}

export interface InitState {
  tabs: {
    [tabName: string]: TabItem
  }
}

const initState: InitState = {
  tabs: {}
}

interface _Action extends Action {
  data: any
}

export default (
  state = initState,
  action: _Action
) => {
  const {
    type,
    data
  } = action;

  switch (type) {
    case types.getTopicList : {
      const {
        tab,
        page,
        list,
        loaded
      } = data;

      const {
        tabs = {}
      } = state;

      const tabItem = (
        tabs[tab] || {}
      )

      let {
        list: dataSource = []
      } = tabItem;

      dataSource = !loaded ? list : [
        ...list, ...dataSource
      ]

      const item = {
        page:page,
        list:dataSource
      }

      return {
        ...state,
        tabs:{
          ...tabs,
          [tab]:item
        }
      }
    }
  }

  return state;
}
