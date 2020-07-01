import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import UserContent from './content';

class Info extends PureComponent {
   get params() {
      const {
        params
      } = this.$router;
      return params;
   }

  componentDidMount() {
     Taro.setNavigationBarTitle({
       title:this.userName
     })
  }

   get userName() {
      const {
        userName
      } = this.params;
      return userName;
   }

   render() {
     return (
       <UserContent
         userName={this.userName}
       />
     )
   }
}

export default Info;
