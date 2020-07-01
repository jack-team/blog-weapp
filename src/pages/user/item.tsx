import {
  Config,
  PureComponent
} from '@tarojs/taro';

interface Props {
  data:any
}

import HomeItem from './../home/item';

class ListItem extends PureComponent<Props> {
  static defaultProps = {
    data:{}
  }

  get Data() {
    const {
      data
    } = this.props;
    return data;
  }

  render() {
    return (
      <HomeItem
        data={this.Data}
      />
    )
  }
}

export default ListItem;
