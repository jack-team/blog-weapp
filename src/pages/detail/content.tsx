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

import Service from './../../service';

import {
  Detail,
  ReplyItem
} from './../../types/item';

import forNow from './../../utils/forNow';

import styles from './../../styles/detail.module.scss';

interface Props {
  topicId:string
}

interface State {
  data?:Detail | any
}


class Content extends PureComponent<Props,State> {
  static defaultProps = {
    topicId:``
  }

  state:State = {
    data:{}
  }

  get topicId() {
    const {
      topicId
    } = this.props;
    return topicId;
  }

  get Data() {
    const {
      data
    } = this.state;
    return data  || {} as Detail;
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

  async componentDidMount() {
    this.onGetData();
  }

  private onGetData = async () => {
    const url:string = (
      `/topic/${this.topicId}`
    )
    this.setState({
      data:await Service.get(url)
    },this.onLoaded)
  }

  public onLoaded = () => {
    Taro.setNavigationBarTitle({
      title:this.title
    })
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
              <View className={styles.header_content}>
                <AtAvatar
                  size="small"
                  circle={true}
                  image={this.avatar}
                />
                <View className={styles.header_right}>
                  <View className={styles.user_name}>
                    {this.userName}
                  </View>
                  <View className={styles.update_time}>
                    发布于 {forNow(this.createAt)}
                  </View>
                </View>
                <View className={styles.visit_count}>
                  {this.visitCount} 次浏览
                </View>
              </View>
              <Text className={styles.title}>
                {this.title}
              </Text>
            </View>
            <View className={styles.desc_content}>
              {!!this.content && (
                <Parser html={this.content} />
              )}
            </View>
            <View className={styles.replies_content}>
              <View className={styles.replies_header}>
                共({this.replies.length})条评论
              </View>
              {this.replies.map((
                item:ReplyItem
              ) => <Reply key={item.id} item={item} /> )}
            </View>
          </View>
        )}
      </View>
    )
  }

}

export default Content;
