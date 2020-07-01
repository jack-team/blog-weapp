import {
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Image,
  WebView
} from "@tarojs/components";

class Login extends PureComponent {

  onError = (e:any) => {
    console.log(e)
  }

  onMessage = (e:any) => {
    console.log(e)
  }

  render() {
    return (
      <View>
        <WebView src="http://192.168.0.103:6868" onError={this.onError} onMessage={this.onMessage}/>
      </View>
    )
  }
}

export default Login;
