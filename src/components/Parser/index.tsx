import {
  PureComponent
} from '@tarojs/taro';

import TaroParser from 'taro-parse';

interface Props {
  html:string
}

const getUrl = (url:string) => {
  const prefix = `http`;
  return url.includes(prefix) ? url:`https:${url}`;
};

class Parser extends PureComponent<Props> {

  static defaultProps = {
    html:``
  }

  onImgClick = (
    url:string,
    urls:Array<string>
  ) => {
    wx.previewImage({
      current:getUrl(url),
      urls:urls.map(getUrl)
    })
  }

  onLinkClick = (url:string) => {

  }

  render() {
    const {
      html
    } = this.props;
    return (
      <TaroParser
        content={html}
        type="markdown"
        onImgClick={this.onImgClick}
        onLinkClick={this.onLinkClick}
      />
    )
  }
}

export default Parser;
