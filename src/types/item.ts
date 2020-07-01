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
