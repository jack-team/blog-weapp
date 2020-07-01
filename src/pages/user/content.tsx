import {
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View
} from "@tarojs/components";

interface State {
  userInfo:any;
}

interface Props {
  userName:string;
  showLoginOut?:boolean;
  onLoginOut?:Function
}

import {
  AtAvatar,
  AtActivityIndicator
} from 'taro-ui';

import ListContent from './list';

import Service from './../../service';

import styles from './../../styles/user.module.scss';

class ContentView extends PureComponent<Props,State> {

  state:State = {
    userInfo:``
  }

  static defaultProps = {
    showLoginOut:false,
    onLoginOut:() => null
  }

  get showLoading() {
    const {
      userInfo
    } = this.state;
    return !userInfo;
  }

  get userInfo() {
    const {
      userInfo
    } = this.state;
    return userInfo || {};
  }

  get avatar() {
    const {
      avatar_url
    } = this.userInfo;
    return avatar_url;
  }

  get userName() {
    const {
      userName
    } = this.props;
    return userName;
  }

  get recent_replies() {
    const {
      recent_replies
    } = this.userInfo;
    return recent_replies || [];
  }

  get recent_topics() {
    const {
      recent_topics
    } = this.userInfo;
    return recent_topics || [];
  }

  get tabs():any {
    return [
      {
        list:this.recent_topics,
        title:`最近发布的(${this.recent_topics.length})`
      },
      {

        list:this.recent_replies,
        title:`最近参与的(${this.recent_replies.length})`
      }
    ]
  }

  componentDidMount() {
    setTimeout(this.getUserInfo);
  }

  private getUserInfo = async () => {
    const url:string = (
      `/user/${this.userName}`
    );
    this.setState({
        userInfo:await Service.get(url)
    })
  }

  private onClickOut = () => {
    const {
      onLoginOut
    } = this.props;
    Taro.showModal({
      title:`确认要退出登录?`,
      success:(res) => {
        if (res.confirm) {
          if(onLoginOut) {
            onLoginOut()
          }
        }
      }
    })
  }

  render() {
    const {
      showLoginOut
    } = this.props;
    return (
      <View>
        {this.showLoading ? (
          <View className={styles.loading_content}>
            <AtActivityIndicator
              size={32}
              color='#999'
              content='加载中...'
            />
          </View>
        ):(
          <View className={styles.page_container}>
            {showLoginOut && (
              <View className={styles.login_out}>
                <View
                  onClick={this.onClickOut}
                  className={styles.login_out_button}
                >
                  退出登录
                </View>
              </View>
            )}
            <View className={styles.header_content}>
              <AtAvatar
                size="large"
                circle={true}
                image={this.avatar}
              />
              <View className={styles.user_name}>
                {this.userName}
              </View>
            </View>
            <View className={styles.page_content_inner}>
              <ListContent tabs={this.tabs} />
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default ContentView;
