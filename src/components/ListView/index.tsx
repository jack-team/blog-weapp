import {
  PureComponent
} from '@tarojs/taro';

import {
  View
} from '@tarojs/components';

import './styles.scss';

import ListView from 'taro-listview';

interface Props {
  lazy?: boolean,
  limit?: number,
  list: Array<any>,
  onScrollToLower: Function,
  onPullDownRefresh: Function
}

interface State {
  isEmpty: boolean,
  hasMore: boolean,
  success: boolean
}

class List extends PureComponent<Props, State> {
  loading: boolean = false;

  static defaultProps = {
    list: [],
    limit: 30,
    lazy: false,
    onScrollToLower: () => null,
    onPullDownRefresh: () => null
  }

  state = {
    isEmpty: false,
    hasMore: true,
    success: true
  }

  pullDownRefresh = () => {
    const {
      onPullDownRefresh
    } = this.props;

    if (this.loading) {
      return false
    }

    this.loading = true;

    onPullDownRefresh(
      this.onPullDownRefreshEnd
    )
  }

  scrollToLower = () => {
    const {
      onScrollToLower
    } = this.props;

    if (this.loading) {
      return false
    }

    this.loading = true;

    onScrollToLower(
      this.onScrollToLowerEnd
    )
  }

  onScrollToLowerEnd = (
    list: Array<any>,
    success: boolean = true
  ) => {
    const {
      limit = 0
    } = this.props;

    this.loading = false;

    if (success) {
      const hasMore = (
        list.length >= limit
      )
      this.setState({
        success: true,
        hasMore: hasMore
      })
    }
    else {
      this.setState({
        success: false
      })
    }
  }

  onPullDownRefreshEnd = (
    list: Array<any>,
    success: boolean = true
  ) => {
    const {
      limit = 0
    } = this.props;

    this.loading = false;

    if (success) {
      const isEmpty = (
        list.length <= 0
      )

      const hasMore = (
        list.length >= limit
      )

      this.setState({
        isEmpty: isEmpty,
        hasMore: hasMore
      })
    }
    else {
      this.setState({
        success: false
      })
    }
  }

  render() {
    const {
      lazy,
      list,
      children
    } = this.props;

    const {
      isEmpty,
      hasMore,
      success
    } = this.state;

    return (
      <View className="list_view_container">
        <ListView
          lazy={lazy}
          isLoaded={false}
          hasMore={hasMore}
          isEmpty={isEmpty}
          autoHeight={true}
          isError={!success}
          style={{height: `100%`}}
          customizeLoading={true}
          needInit={!list.length}
          footerLoadingText="努力加载中..."
          onScrollToLower={this.scrollToLower}
          onPullDownRefresh={this.pullDownRefresh}
        >
          {children}
        </ListView>
      </View>
    )
  }
}

export default List;
