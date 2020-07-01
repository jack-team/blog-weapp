import {
  PureComponent
} from '@tarojs/taro';

import {
  View
} from "@tarojs/components";

import {
  TabBar
} from './../../components';

import Connect from './../../utils/connect';

import styles from './../../styles/user.module.scss';

@Connect([`user`])
class User extends PureComponent {

  onError = (e:any) => {
    console.log(e)
  }

  onMessage = (e:any) => {
    console.log(e)
  }

  componentDidMount() {

  }

  render() {
    return (
      <View className={styles.page_view}>
        <TabBar page={1}/>
      </View>
    )
  }
}

export default User;
