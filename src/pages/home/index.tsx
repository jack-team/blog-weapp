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

const tabPages = [
  {title: `全部`,tab:`all`},
  {title: `精华`,tab:`good`},
  {title: `分享`,tab:`share`},
  {title: `问答`,tab:`ask`},
  {title: `招聘`,tab:`job`}
];

import PageContent from './page';

import styles from './../../styles/home.module.scss';

class Index extends PureComponent {
  state = {
    page: 0
  }

  created: any = (
    new Set([0])
  )

  config: Config = {
    navigationBarTitleText: `CNode 中文社区`
  }

  onPageChange = (page: number) => {
    this.created.add(page);
    this.setState({page: page});
  }

  render() {
    const {
      length
    } = tabPages;

    const {
      page
    } = this.state;

    return (
       <View className={styles.pageView}>
         <Container
           page={page}
           tabs={tabPages}
           onChange={this.onPageChange}
         >
           {tabPages.map((
             item:any,i:number
           ) => {
             const created = (
               this.created.has(i)
             )
             return (
               <Content
                 key={i}
                 page={i}
                 total={length}
               >
                 {created ? (
                   <PageContent
                     tab={item.tab}
                   />
                 ) : null}
               </Content>
             )
           })}
         </Container>
       </View>
    )
  }
}

export default Index;
