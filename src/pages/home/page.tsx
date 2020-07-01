import Taro,{
  PureComponent
} from '@tarojs/taro';

import {
  AtActivityIndicator
} from 'taro-ui';

import {
  View,
  Text
} from '@tarojs/components';

import {
  Tab
} from './../../types/item';

import RowItem from './item';

import Service from './../../service';

import styles from './../../styles/home.module.scss';

interface Props {
  tab: Tab,
  onInit: Function
}

interface State {
  isLastPage:boolean,
  dataSource: Array<any>
}

class PageContent extends PureComponent<Props, State> {
  page: number = 0;

  static defaultProps = {
    tab: 'all',
    home: {},
    onInit: () => null
  }

  state: State = {
    dataSource: [],
    isLastPage:false
  }

  //加载更多标识
  private isLoad: boolean = false;

  //刷新标识
  private isRefresh:boolean = false;

  get tab() {
    const {
      tab
    } = this.props;
    return tab as Tab;
  }

  get pageNum() {
    return this.page;
  }

  get dataSource() {
    const {
      dataSource = []
    } = this.state;
    return dataSource;
  }

  componentDidMount() {
    this.onInit();
  }

  private onInit = () => {
    this.props.onInit(this);
    this.pullDownRefresh(this.onRefreshEnd);
  }

  private stopRefresh = () => {
    Taro.stopPullDownRefresh();
  }

  private onRefreshEnd = () => {
    this.stopRefresh();
    this.isRefresh = false;
  }

  private onLoadMoreEnd = () => {
    this.isLoad = false;
  }

  public onRefresh = () => {
    this.pullDownRefresh(
      this.onRefreshEnd
    );
  }

  public onLoadMore = () => {
    const {
      isLastPage
    } = this.state;
    if (this.isLoad || isLastPage) {
      return false
    }
    this.scrollToLower(
      this.onLoadMoreEnd
    )
  }

  private pullDownRefresh = (done: Function) => {
    //如果在刷新中...
    if(this.isRefresh) {
      return this.stopRefresh();
    }
    this.isRefresh = true;
    this.loadData(1, done);
    this.setState({ isLastPage:false });
  }

  private scrollToLower = (
    done: Function
  ) => {
    this.isLoad = true;
    const page = this.pageNum + 1;
    this.loadData(page, done);
  }

  private createList = (list:Array<any>) => {
    return list.map((item:any) => {
      delete item[`content`];
      return item;
    });
  }

  private loadData = async (
    page: number, done: Function
  ) => {
    let list = [];
    let success = true;

    const {
      dataSource
    } = this.state;

    const _opts = {
      limit: 30,
      page: page,
      tab: this.tab
    }

    try {
      list = (
        await Service.get(
          `/topics`, _opts
        ) || []
      ) as Array<any>;

      this.page = page;

      list = (
        this.createList(list)
      );

      const _list:Array<any> = (
        [...dataSource, ...list]
      );

      this.setState({
        dataSource: page > 1 ? _list : list,
        isLastPage: _list.length < _opts.limit
      });
    }
    catch (e) {
      success = false;
    }

    done(list, success);
  }

  render() {
    const {
      isLastPage
    } = this.state;

    return (
      <View className={styles.row_item_container}>
        {this.dataSource.map((item: any) => (
          <RowItem key={item.id} data={item}/>
        ))}
        {isLastPage ? (
          this.dataSource.length > 0 ? (
            <View className={styles.no_more}>
              <View className={styles.line_style} />
              <Text className={styles.no_more_text}>
                我是有底线的
              </Text>
              <View className={styles.line_style} />
            </View>
          ) : null
          ) : (
          <View className={styles.footer_loading}>
            <AtActivityIndicator
              size={32} color="#ff7a4c" content='加载中...'
            />
          </View>
        )}
      </View>
    )
  }
}

export default PageContent;
