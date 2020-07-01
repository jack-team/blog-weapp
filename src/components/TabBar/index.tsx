import Taro, {
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Image
} from '@tarojs/components';

import styles from './bar.module.scss';

import me_icon from './../../static/me_normal@2x.png';
import me_icon_selected from './../../static/me_selected@2x.png';

import home_icon from './../../static/discover_normal@2x.png';
import home_icon_selected from './../../static/discover_selected@2x.png';

const barList = [
  {
    name: `首页`,
    icon: home_icon,
    url: `/pages/home/index`,
    selectedIcon: home_icon_selected
  },
  {
    name: `我的`,
    icon: me_icon,
    url: `/pages/user/index`,
    selectedIcon: me_icon_selected
  }
];

interface Props {
  page: number
}

class TabBar extends PureComponent<Props> {
  static defaultProps = {
    page: 0
  }

  private onClick = (url: string) => {
    Taro.switchTab({
      url: url
    })
  }

  render() {
    const {
      page
    } = this.props;
    return (
      <View className={styles.tab_bar_container}>
        {barList.map((bar: any, i: number) => {
          const selected = page === i;

          const className = (
            [styles.tab_bar_text]
          )

          if(selected){
            className.push(
              styles.tab_bar_selected
            )
          }

          return (
            <View
              key={i}
              className={styles.tab_bar_item}
              onClick={() => !selected && this.onClick(bar.url)}
            >
              <Image
                className={styles.tab_bar_icon}
                src={selected ? bar.selectedIcon : bar.icon}
              />
              <View className={className.join(` `)}>
                {bar.name}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default TabBar;
