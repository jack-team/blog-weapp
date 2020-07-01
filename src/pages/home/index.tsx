import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View
} from '@tarojs/components';

import {
  Content,
  Container
} from './../../components/Tabs';

import {
  TabBar
} from './../../components';

import PageContent from './page';

import styles from './../../styles/home.module.scss';

interface State {
  page: number
}

interface TabItem {
  title: string,
  tab: 'all' | 'good' | 'share' | 'ask' | 'job'
}

class Index extends PureComponent<any, State> {
  state = {
    page: 0
  }

  created: any = (
    new Set([0])
  )

  _pages: any = {};
  _contents: any = {};

  config: Config = {
    enablePullDownRefresh: true
  }

  _tabs: Array<TabItem> = [
    {title: `全部`, tab: `all`},
    {title: `精华`, tab: `good`},
    {title: `分享`, tab: `share`},
    {title: `问答`, tab: `ask`},
    {title: `招聘`, tab: `job`}
  ];

  private onRunHoc = (done: Function) => {
    Object.keys(
      this._contents
    ).forEach(this.eachRun(done))
  }

  private eachRun = (done: Function) => {
    return (i: any) => {
      const page = this._pages[i];
      const content = this._contents[i];
      if (content.isShow && !!page) done(page);
    }
  }

  //加载更多
  public onReachBottom() {
    this.onRunLoadMore();
  }

  //下拉刷新
  public onPullDownRefresh() {
    this.onRunRefresh();
  }

  public onRunLoadMore = () => {
    this.onRunHoc((page:any) => {
      page.onLoadMore()
    })
  }

  private onRunRefresh = () => {
    this.onRunHoc((page: any) => (
      page.onRefresh()
    ))
  }

  //回到顶部
  private onScrollTop = (done:any) => {
    Taro.pageScrollTo({
      duration:0,
      scrollTop:0, success:done
    })
  }

  private onPageChange = (
    page: number
  ) => {
    this.onScrollTop(() => {
      this.created.add(page);
      this.setState({page: page});
    })
  }

  render() {
    const {
      page
    } = this.state;
    return (
      <View className={styles.pageView}>
        <Container
          page={page}
          tabs={this._tabs}
          onChange={this.onPageChange}
        >
          {this._tabs.map((
            item: any, i: number
          ) => {
            const created = (
              this.created.has(i)
            )
            return (
              <Content
                page={i}
                key={item.tab}
                current={page}
                ref={(e: any) => (
                  this._contents[i] = e
                )}
              >
                {created ? (
                  <PageContent
                    tab={item.tab}
                    onInit={(e: any) => (
                      this._pages[i] = e
                    )}
                  />
                ) : null}
              </Content>
            )
          })}
        </Container>
        <TabBar page={0} />
      </View>
    )
  }
}

export default Index;
