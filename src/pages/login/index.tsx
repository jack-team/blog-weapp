import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View
} from "@tarojs/components";

import {
  InputView
} from './../../components';

import styles from './../../styles/login.module.scss';

interface State {
  token:string
}

interface Props {
  onLogin:Function
}

class Login extends PureComponent<Props,State> {

  config:Config = {
    navigationBarTitleText:`登录`
  }

  state:State = {
    token:``
  }

  static defaultProps = {
    onLogin:() => null
  }

  private onTokenInput = (value:string) => {
    this.setState({
      token: value
    })
  }

  private openScan = () => {
    Taro.scanCode({
      success:(e) => {
        this.setState({
          token:e.result
        },this.onLogin)
      }
    });
  }

  private onLogin = () => {
    const {
      token = ``
    } = this.state;

    if(!token.trim()) {
       return Taro.atMessage({
         type:`error`,
         message:`请输入 AccessToken`
       })
    }
    this.props.onLogin(token);
  }

  render() {
    const {
      token
    } = this.state;

    return (
      <View className={styles.page_view}>
        <InputView
          value={token}
          onInput={this.onTokenInput}
          placeholder="请输入 AccessToken"
        />
        <View className={styles.buttons}>
          <View className={styles.submit_button} onClick={this.onLogin}>登录</View>
          <View className={styles.submit_button} onClick={this.openScan}>
            扫码登录
          </View>
        </View>
      </View>
    )
  }
}

export default Login;
