import Taro,{
  PureComponent,
  createSelectorQuery
} from '@tarojs/taro';

import {
  View,
  Image,
  Editor
} from "@tarojs/components";

import Service from './../../service';

import image_icon from './../../static/image@2x.png';

import styles from './../../styles/detail.module.scss';

interface Props {

}

interface State {
  isFocus:boolean
}

class Edit extends PureComponent<Props,State> {
  state:State = {
    isFocus:false
  }

  editId:string = ``;
  editCtx:any = null;

  constructor() {
    super();
    this.editId = `editor_${Date.now()}`
  }

  private onBlur = () => {
    this.setState({
      isFocus:false
    })
  }

  private onFocus = () => {
    this.setState({
      isFocus:true
    })
  }

  private onEditorReady = () => {
    const query = createSelectorQuery().in(this.$scope);
    query.select(`#${this.editId}`).context((e:any) => (
      this.editCtx = e.context
    )).exec();
  }

  private onChooseImage = async () => {
    const {
      tempFilePaths = []
    } = await Taro.chooseImage({count:1});

    try {
      Taro.showLoading({ title:`上传中` });
      const urls = (
        await Service.upload(tempFilePaths)
      );
      urls.forEach((url:string) => (
        this.editCtx.insertImage({ src: url })
      ))
    }
    catch (e) {
      Taro.showToast({
        title:`上传失败`
      })
    }

    Taro.hideLoading();
  }

  componentDidMount() {

  }

  private onInput = (e:any) => {
    console.log(e)
  }

  render() {
    const {
      isFocus
    } = this.state;

    const className = [
      styles.edit_container
    ];

    if(isFocus) {
      className.push(
        styles.edit_focus
      )
    };

    return (
      <View className={className.join(` `)}>
        <View className={styles.edit_inner}>
          <Editor
            showImgSize
            showImgToolbar
            showImgResize
            id={this.editId}
            placeholder="输入评论.."
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onInput={this.onInput}
            onReady={this.onEditorReady}
            className={styles.edit_content}
          />
        </View>
        <View className={styles.upload_container}>
          <Image
            src={image_icon}
            onClick={this.onChooseImage}
            className={styles.upload_image}
          />
        </View>
      </View>
    )
  }
}

export default Edit;
