import {
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View
} from "@tarojs/components";

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
          return (
            <Content
              key={i}
              page={i}
              current={curPage}
            >

            </Content>
          )
        })}
      </Container>
    )
  }
}

export default List;
