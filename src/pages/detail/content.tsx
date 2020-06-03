import Taro,{
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Text
} from "@tarojs/components";

import {
  AtAvatar,
  AtActivityIndicator
} from 'taro-ui';

import {
  Parser
} from './../../components';

import Reply from './reply';

import {
  Detail,
  ReplyItem
} from './../../state/reducers/detail';

import connect from './../../utils/connect';

import forNow from './../../utils/forNow';

import styles from './../../styles/detail.module.scss';

import DetailActions, * as detailAction from './../../state/actions/detail';

interface Props {
  detail?:Detail,
  topicId:string,
  detailActions?:DetailActions
}

const _mapState_ = (
  { detail }:any,
  { topicId }:any
) => {
  const {
    details = {}
  } = detail || {};
  return details[topicId] || {};
}

@connect({detail:_mapState_},{
  detailActions:detailAction
})
class Content extends PureComponent<Props> {
  static defaultProps = {
    topicId:``,
    detailActions:{}
  }

  get topicId() {
    const {
      topicId
    } = this.props;
    return topicId;
  }

  get Data() {
    const {
      detail
    } = this.props;
    return detail as Detail;
  }

  get isLoading() {
    const {
      id
    } = this.Data;
    return !id;
  }

  get title() {
    const {
      title
    } = this.Data;
    return title;
  }

  get author() {
    const {
      author
    } = this.Data;
    return author || {};
  }

  get avatar() {
    const {
      avatar_url
    } = this.author;
    return avatar_url;
  }

  get userName() {
    const {
      loginname
    } = this.author;
    return loginname;
  }

  get createAt() {
    const {
      create_at
    } = this.Data;
    return create_at;
  }

  get visitCount() {
    const {
      visit_count = 0
    } = this.Data;
    return visit_count;
  }

  get content():string {
    const {
      content
    } = this.Data;
    return content
  }

  get replies() {
    const {
      replies = []
    } = this.Data;
    return replies;
  }

  get detailActions() {
    const {
      detailActions
    } = this.props;
    return detailActions || {} as DetailActions;
  }

  async componentDidMount() {
    await this.detailActions.
    getTopicDetail(this.topicId);
    Taro.setNavigationBarTitle({
      title:this.title
    });
  }

  render() {
    return (
      <View className={styles.container}>
        {this.isLoading ? (
          <View className={styles.loading}>
            <AtActivityIndicator
              size={32}
              color='#999'
              content='加载中...'
            />
          </View>
        ):(
          <View className={styles.page_container}>
            <View className={styles.header}>
              <Text className={styles.title}>
                {this.title}
              </Text>
              <View className={styles.header_content}>
                <AtAvatar
                  size="small"
                  circle={true}
                  image={this.avatar}
                  className={styles.avatar_style}
                />
                <View className={styles.header_right}>
                  <Text> • 作者 {this.userName}</Text>
                  <Text> • 发布于 {forNow(this.createAt)}</Text>
                  <Text> • {this.visitCount} 次浏览</Text>
                </View>
              </View>
            </View>
            <View className={styles.desc_content}>
              {!!this.content && (
                <Parser html={this.content} />
              )}
            </View>
            <View style={styles.replies_content}>
              {this.replies.map((
                item:ReplyItem,i:number
              ) => <Reply key={i} item={item} /> )}
            </View>
          </View>
        )}
      </View>
    )
  }

}

export default Content;
