import Taro,{
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  Content,
  Container
} from './../../components/Tabs';

interface Props {
  tabs:Array<any>
}

interface State {
  curPage:number
}

import ListItem from './item';

class List extends PureComponent<Props> {

  state:State = {
    curPage:0
  }

  get tabs() {
    const {
      tabs
    } = this.props;
    return tabs || [];
  }

  private onChange = (page:number) => {
    this.setState({
      curPage:page
    },this.scrollToTop)
  }

  private scrollToTop = () => {
    Taro.pageScrollTo({
      duration:0,
      scrollTop:0
    })
  }

  render() {
    const {
      tabs
    } = this.props;

    const {
      curPage
    } = this.state;

    return (
      <Container
        height={44}
        tabs={tabs}
        page={curPage}
        onChange={this.onChange}
      >
        {this.tabs.map((tab:any,i:number) => {
          const { list = [] } = tab;
          return (
            <Content
              key={i}
              page={i}
              current={curPage}
            >
              {list.map((item:any) => {
                return (
                  <ListItem
                    data={item}
                    key={item.id}
                  />
                )
              })}
            </Content>
          )
        })}
      </Container>
    )
  }
}

export default List;
