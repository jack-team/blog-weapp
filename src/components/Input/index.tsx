import {
  Config,
  PureComponent
} from '@tarojs/taro';

import {
  View,
  Input
} from '@tarojs/components';

import styles from './input.module.scss';

interface Props {
  value?:string;
  onInput?:Function;
  placeholder?:string;
}

class InputView extends PureComponent<Props> {

  static defaultProps = {
    value:``,
    placeholder:``,
    onInput:() => null
  }

  private onInput = (e:any) => {
    const {
      onInput
    } = this.props;
    if(!!onInput) {
      onInput(e.target.value);
    }
  }

  render() {
    const {
      value,
      placeholder
    } = this.props;

    const className = [
      styles.placeholder_view
    ];

    if(!!value) {
      className.push(
        styles.placeholder_show
      )
    }

    return (
      <View className={styles.input_view}>
        <View className={styles.input_header}>
          <View className={className.join(` `)}>
            {placeholder}
          </View>
        </View>
        <Input
          value={value}
          onInput={this.onInput}
          placeholder={placeholder}
          className={styles.input_style}
          placeholderClass={styles.placeholder}
        />
      </View>
    )
  }
}

export default InputView;
