import {
  useCallback,
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Text
} from '@tarojs/components';

import {
  TabItem
} from './container';

interface Props {
  page: number,
  height?:number,
  tabs: Array<TabItem>,
  onChange: Function
}

import styles from './tabs.module.scss';

class Header extends PureComponent<Props> {

  static defaultProps = {
    tabs: [],
    page: 0,
    height:56,
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

  get styles() {
    const {
      height
    } = this.props;
    return {
      height:`${height}PX`,
      lineHeight:`${height}PX`
    }
  }

  render() {
    const {
      tabs,
      page,
      onChange
    } = this.props;

    return (
      <View
        style={this.styles}
        className={styles.tab_header_container}
      >
        <View className={styles.tab_header_content}>
          {tabs.map((item: TabItem, i: number) => {
            const callBack = useCallback(
              () => onChange(i), [page]
            )
            const className = (
              i === page ? styles.tab_selected : ``
            )
            return (
              <View
                key={item.title}
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
        <View className={styles.tab_indicator}>
          <View
            style={this.indicatorStyle}
            className={styles.indicator}
          >
            <View className={
              styles.indicator_scroll
            }/>
          </View>
        </View>
      </View>
    )
  }
}

export default Header;
