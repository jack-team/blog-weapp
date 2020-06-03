import {
  PureComponent
} from '@tarojs/taro';

import {
  ListView
} from './../../components';

import RowItem from './item';

import {
  Tab,
  TabItem,
  InitState
} from './../../state/reducers/home';

import connect from './../../utils/connect';

import HomeActions,
  * as homeAction from './../../state/actions/home';

interface Props {
  tab: Tab,
  tabItem?: TabItem,
  homeActions?: HomeActions
}

const mapAction = (
  state:any, props:any
) => {
  const {
    home
  } = state;
  const {
    tab
  } = props;
  const {
    tabs
  } = home as InitState;
  return tabs[tab] || {};
}

@connect({tabItem:mapAction}, {
  homeActions: homeAction
})
class PageContent extends PureComponent<Props> {
  static defaultProps = {
    tab: 'all',
    home: {}
  }

  get tab() {
    const {
      tab
    } = this.props;
    return tab as Tab;
  }

  get tabItem() {
    const {
      tabItem
    } = this.props;
    return tabItem  as TabItem;
  }

  get pageNum() {
    const {
      page = 1
    } = this.tabItem;
    return page;
  }

  get dataSource() {
    const {
      list = []
    } = this.tabItem;
    return list;
  }

  get homeActions() {
    const {
      homeActions
    } = this.props;
    return homeActions as HomeActions;
  }

  private loadData = async (
    page:number,done:Function
  ) => {
     let success = true;
     let dataSource = [];

     const _opts = {
       limit:30,
       page:page,
       tab:this.tab
     }

     try {
       dataSource = (
         await this.homeActions.
         getTopicList(_opts)
       )
     }
     catch (e) {
       success = false
     }

     done(dataSource,success);
  }

  private pullDownRefresh = (
    done:Function
  ) => {
    this.loadData(1,done);
  }

  private scrollToLower = (
    done:Function
  ) => {
    const page = (
      this.pageNum + 1
    )
    this.loadData(page,done);
  }

  render() {
    return (
      <ListView
        limit={30}
        list={this.dataSource}
        onScrollToLower={this.scrollToLower}
        onPullDownRefresh={this.pullDownRefresh}
      >
        {this.dataSource.map((item:any) => (
            <RowItem key={item.id} data={item} />
        ))}
      </ListView>
    )
  }
}

export default PageContent;
