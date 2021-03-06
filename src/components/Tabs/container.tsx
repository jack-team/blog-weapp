import {
  useCallback,
  PureComponent
} from '@tarojs/taro';

import {
  View
} from '@tarojs/components';

export interface TabItem {
  title: string,
  [propName:string]:any
}

interface Props {
  page: number,
  height?:number,
  tabs: Array<TabItem>,
  onChange: Function
}

import Header from './header';

import styles from './tabs.module.scss';

class Container extends PureComponent<Props> {
  static defaultProps = {
    page: 0,
    tabs: [],
    height:56,
    onChange: () => null
  }

  get scrollContentStyle() {
    const {
      tabs,
      page
    } = this.props;

    const {
      length
    } = tabs;

    const value:number = (
      page / length * 100
    )

    return {
      width:`${length * 100}%`,
      transform: `translate3d(-${value}%,0,0)`
    }
  }

  render() {
    const {
      tabs,
      page,
      height,
      children,
      onChange
    } = this.props;
    return (
      <View className={styles.tabs_container}>
        <Header
          tabs={tabs}
          page={page}
          height={height}
          onChange={onChange}
        />
        <View className={styles.tabs_content}>
          <View
            style={this.scrollContentStyle}
            className={styles.tabs_content_scroll}
          >
            {children}
          </View>
        </View>
      </View>
    )
  }
}

export default Container;
