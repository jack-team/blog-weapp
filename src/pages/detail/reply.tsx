import {
  PureComponent
} from '@tarojs/taro';

import {
  View
} from "@tarojs/components";

import {
  AtAvatar
} from 'taro-ui';

import {
  ReplyItem
} from './../../state/reducers/detail';

import {
  Parser
} from './../../components';

import forNow from './../../utils/forNow';

import styles from './../../styles/detail.module.scss';

interface Props {
  item:ReplyItem
}

class Replies extends PureComponent<Props> {
  static defaultProps = {
    item:{}
  }

  get item() {
    const {
      item
    } = this.props;
    return item;
  }

  get author() {
    const {
      author
    } = this.item;
    return author || {};
  }

  get avatarUrl() {
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
    } = this.item;
    return create_at;
  }

  get content() {
    const {
      content
    } = this.item;
    return content;
  }

  render() {
    return (
      <View className={styles.reply_item}>
        <AtAvatar
          size="small"
          circle={true}
          image={this.avatarUrl}
        />
        <View className={styles.reply_content}>
          <View className={styles.reply_user_content}>
            <View className={styles.reply_user_name}>
              {this.userName}
            </View>
            <View className={styles.reply_create}>
              {forNow(this.createAt)}
            </View>
          </View>
          <Parser html={this.content} />
        </View>
      </View>
    )
  }

}

export default Replies;
