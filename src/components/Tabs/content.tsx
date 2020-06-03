import {
  PureComponent
} from '@tarojs/taro';

import {
  View
} from '@tarojs/components';

import styles from './tabs.module.scss';

interface Props {
  page:number,
  total:number
}

class Content extends PureComponent<Props> {
  static defaultProps = {
    page:0
  }

  get contentStyle() {
    const {
      page,
      total
    } = this.props;

    return {
      width:`${1/total*100}%`,
      transform: `translate3d(${page * 100}%,0,0)`
    }
  }

  render() {
    return (
      <View
        style={this.contentStyle}
        className={styles.tabs_content_item}
      >
        {this.props.children}
      </View>
    )
  }
}

export default Content;
