import {
  Config,
  PureComponent
} from '@tarojs/taro';

import Content from './content';

class Detail extends PureComponent {

  config: Config = {
    navigationBarTitleText: `CNode 中文社区`
  }

  get params() {
    const {
      params
    } = this.$router;
    return params;
  }

  get topicId() {
    const {
      topicId
    } = this.params;
    return topicId;
  }

  render() {
    return (
      <Content topicId={this.topicId} />
    )
  }
}

export default Detail;
