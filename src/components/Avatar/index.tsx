import {
  PureComponent
} from '@tarojs/taro';

import {
  Image,
  View
} from '@tarojs/components';

interface Props {
  url:string;
  size?:number;
  onClick?:Function;
}

interface State {
  loaded:boolean
}

import avatar_icon from './avatar@2x.png';

import styles from './avatar.module.scss';

class Avatar extends PureComponent<Props,State> {
  url:string = ``;

  state:State = {
    loaded:false
  }

  constructor(props:Props) {
    super(props);
    this.url = props.url;
  }

  static defaultProps = {
    url:``,
    size:36,
    onClick:() => null
  }

  get style() {
    const {
      size
    } = this.props;
    return {
      width:`${size}PX`,
      height:`${size}PX`
    }
  }

  componentDidUpdate() {
    const {
      url
    } = this.props;
    if(this.url !== url) {
      this.url = url;
      this.onLoadStart();
    }
  }

  private onLoaded = () => {
    this.setState({
      loaded:true
    })
  }

  private onLoadStart = () => {
    this.setState({
      loaded:false
    })
  }

  private onClick = (e:any) => {
    const {
      onClick
    } = this.props;
    if(onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      url
    } = this.props;

    const {
      loaded
    } = this.state;

    const className = [
      styles.avatar_image
    ];

    if(loaded) {
      className.push(
        styles.avatar_image_show
      )
    };

    return (
      <View
        style={this.style}
        onClick={this.onClick}
        className={styles.avatar_container}
      >
        {!loaded && (
          <Image
            lazyLoad={false}
            src={avatar_icon}
            className={styles.avatar_default}
          />
        )}
        <Image
          src={url}
          lazyLoad={true}
          onLoad={this.onLoaded}
          className={className.join(` `)}
        />
      </View>
    )
  }
}

export default Avatar;
