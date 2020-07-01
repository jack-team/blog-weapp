import Taro, {
  Config,
  Component
} from '@tarojs/taro';

import './app.scss';

import {
  Provider
} from '@tarojs/redux';

import {
  PersistGate
} from 'redux-persist/integration/react';

import HomePage from './pages/home';

import store, { persist } from './state';

class App extends Component {
  config:Config = {
    pages: [
      'pages/home/index',
      'pages/detail/index',
      'pages/user/index',
      'pages/login/index',
    ],
    window: {
      navigationBarTextStyle:`white`,
      navigationBarBackgroundColor:`#ff7a4c`,
      navigationBarTitleText: `YU-TAO 中文社区`
    },
    tabBar: {
      custom:true,
      list:[
        {
          text:`首页`,
          pagePath:`pages/home/index`
        },
        {
          text:`我的`,
          pagePath:`pages/user/index`
        }
      ]
    }
  }

  render () {
    return (
      <PersistGate persistor={persist}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </PersistGate>
    )
  }
}

Taro.render(<App />,
  document.getElementById('app')
);
