import Taro,{
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Text
} from '@tarojs/components';

import {
  AtAvatar
} from 'taro-ui';

import {
  TopicItem
} from './../../state/reducers/home';

interface Props {
  data:TopicItem
}

import forNow from './../../utils/forNow';

import styles from './../../styles/home.module.scss';

class RowItem extends PureComponent<Props> {
  static defaultProps = {
    data:{}
  }

  get Data() {
    const {
      data
    } = this.props;
    return data;
  }

  get topicId():string {
    const {
      id = ``
    } = this.Data;
    return id;
  }

  get title():string {
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

  get avatar():string {
    const {
      avatar_url
    } = this.author;
    return avatar_url;
  }

  get userName():string {
    const {
      loginname
    } = this.author;
    return loginname;
  }

  get updateTime():string {
    const {
      last_reply_at
    } = this.Data;
    return forNow(last_reply_at);
  }

  get visitCount():number {
    const {
      visit_count
    } = this.Data;
    return visit_count;
  }

  get tagName() {
    const {
      top,
      good
    } = this.Data;

    if(top) {
      return `置顶`;
    }

    if(good) {
      return `精华`;
    }
  }

  private goDetail = () => {
    Taro.navigateTo({
      url:`/pages/detail/index?topicId=${this.topicId}`
    })
  }

  render() {
    return (
      <View
        onClick={this.goDetail}
        className={styles.row_item}
      >
        <View className={styles.row_content}>
          <View className={styles.row_content_left}>
            <AtAvatar
              size="small"
              circle={true}
              image={this.avatar}
              className={styles.avatar_style}
            />
            <View className={styles.user_name}>
              {this.userName} • 更新于{this.updateTime}
            </View>
          </View>
          <View className={styles.visit_count}>
            {this.visitCount} 人浏览
          </View>
        </View>
        <View className={styles.row_title}>
          {!!this.tagName ? (
            <Text className={styles.tag_view}>
              {this.tagName}
            </Text>
          ):null}
          {this.title}
        </View>
      </View>
    )
  }
}

export default RowItem;
