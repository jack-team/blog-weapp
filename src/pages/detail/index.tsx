import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import Content from './content';

class Detail extends PureComponent {
  config: Config = {
    enablePullDownRefresh: true
  }

  public _content:any = null;

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

  public onPullDownRefresh() {
    this._content.onGetData().
    then(() => {
      Taro.stopPullDownRefresh();
    })
  }

  render() {
    return (
      <Content
        topicId={this.topicId}
        ref={e => this._content = e}
      />
    )
  }
}

export default Detail;
