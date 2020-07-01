import {
  PureComponent
} from '@tarojs/taro';

import {
  View
} from '@tarojs/components';

interface Props {
  page: number,
  current: number
}

interface State {
  show: boolean
}

import styles from './tabs.module.scss';

class Content extends PureComponent<Props, State> {
  static defaultProps = {
    page: 0,
    current: 0
  }

  private ms: number = 300;
  private timer: any = null;

  constructor(props: Props) {
    super(props);

    const {
      page,
      current
    } = props;

    const show = (
      page === current
    )

    this.state = {
      show: show
    }
  }

  get isShow() {
    const {
      show
    } = this.state;
    return show;
  }

  componentDidUpdate() {
    const {
      show
    } = this.state;

    const {
      page,
      current
    } = this.props;

    const _show: boolean = (
      page === current
    );

    if (_show && !show) {
      this.setState({
        show: true
      })
    }

    if (!_show && show) {
      this.onHidePage();
    }
  }

  private onHidePage = () => {
    this.timer = (
      setTimeout(this.onShowState, this.ms)
    )
  }

  private onShowState = () => {
    this.setState({ show: false });
  }

  get className() {
    const {
      show
    } = this.state;

    const classList = [
      styles.tabs_content_item
    ];

    if (!show) {
      classList.push(
        styles.tab_item_hide
      );
    };

    return classList.join(` `);
  }

  render() {
    return (
      <View className={this.className}>
        {this.props.children}
      </View>
    )
  }
}

export default Content;
