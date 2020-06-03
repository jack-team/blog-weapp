import {
  useCallback,
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Text
} from '@tarojs/components';

import styles from './tabs.module.scss';

interface TabItem {
  title: string
}

interface Props {
  page: number,
  tabs: Array<TabItem>,
  onChange: Function
}

class Container extends PureComponent<Props> {
  static defaultProps = {
    page: 0,
    tabs: [],
    onChange: () => null
  }

  get indicatorStyle() {
    const {
      tabs,
      page
    } = this.props;

    return {
      width: `${1 / tabs.length * 100}%`,
      transform: `translate3d(${page * 100}%,0,0)`
    }
  }

  get scrollContentStyle() {
    const {
      tabs,
      page
    } = this.props;

    const {
      length
    } = tabs;

    return {
      width:`${length*100}%`,
      transform: `translate3d(-${page/length * 100}%,0,0)`
    }
  }

  render() {
    const {
      tabs,
      children
    } = this.props;

    return (
      <View className={styles.tabs_container}>
        <View className={styles.tab_header_container}>
          <View className={styles.tab_header_content}>
            {tabs.map((item: TabItem, i: number) => {
              const {
                page,
                onChange
              } = this.props;
              const callBack = useCallback(
                () => onChange(i), [page]
              )
              const className = (
                i === page ? styles.tab_header_selected : ``
              )
              return (
                <View
                  key={i}
                  onClick={callBack}
                  className={styles.tab_header_item}
                >
                  <Text className={className}>
                    {item.title}
                  </Text>
                </View>
              )
            })}
          </View>
          <View className={styles.tab_header_indicator}>
            <View
              style={this.indicatorStyle}
              className={styles.indicator}
            />
          </View>
        </View>
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
