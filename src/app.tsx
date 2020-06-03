import Taro, {
  Config,
  Component
} from '@tarojs/taro';

import {
  Provider
} from '@tarojs/redux';

import './app.scss';

import store from './state';

import HomePage from './pages/home';

class App extends Component {
  config:Config = {
    pages: [
      'pages/home/index',
      'pages/detail/index'
    ],
    window: {
      backgroundTextStyle: `light`,
      navigationBarTextStyle: `black`,
      navigationBarTitleText: `WeChat`,
      navigationBarBackgroundColor: `#fff`
    }
  }

  render () {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    )
  }
}

Taro.render(
  <App />,
  document.getElementById('app')
)
