import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  AtMessage
} from 'taro-ui';

import {
  View
} from "@tarojs/components";

import {
  TabBar
} from './../../components';

import LoginPage from './../login';

import ContentPage from './content';

import Connect from './../../utils/connect';

import styles from './../../styles/user.module.scss';

import * as userAction from './../../state/actions/user';

@Connect([`user`],{
  userActions:userAction
})
class User extends PureComponent<any> {
  config:Config = {
    navigationBarTitleText:`我的`
  }

  get userState() {
    const {
      user
    } = this.props;
    return user || {};
  }

  get token() {
    const {
      token = ``
    } = this.userState;
    return token;
  }

  get isLogin() {
    return !!this.token;
  }

  get userInfo() {
    const {
      userInfo
    } = this.userState;
    return userInfo || {};
  }

  get userName() {
    const {
      loginname
    } = this.userInfo;
    return loginname;
  }

  get userActions() {
    const {
      userActions
    } = this.props;
    return userActions;
  }

  componentDidMount() {
    if(this.isLogin) {
      this.getUserInfo(this.token);
    }
  }

  private getUserInfo = (token:string) => {
    return this.userActions.getUserInfo(token);
  }

  private onLogin = async (token:string) => {
    Taro.showLoading({
      mask: true,
      title: `加载中`
    })
    try {
      await this.getUserInfo(token);
      Taro.showToast({ title:`登录成功！` });
    }
    catch (e) {
      Taro.atMessage({
        type:`error`,
        message:e.message
      })
    }
    Taro.hideLoading();
  }

  private onLoginOut = () => {
    this.userActions.userLoginOut();
  }

  render() {
    return (
      <View className={styles.page_view}>
        <AtMessage />
        {this.isLogin ? (
          <ContentPage
            showLoginOut={true}
            userName={this.userName}
            onLoginOut={this.onLoginOut}
          />
        ):(
          <LoginPage
            onLogin={this.onLogin}
          />
        )}
        <TabBar page={1}/>
      </View>
    )
  }
}

export default User;
