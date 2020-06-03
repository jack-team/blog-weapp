import {
  connect
} from '@tarojs/redux';

import {
  Dispatch,
  bindActionCreators
} from 'redux';

interface MapItem {
  [propName: string]: Function
}

type Keys = Array<string> | MapItem;

interface Actions {
  [propName: string]: any;
}

const createMapState = (keys: Keys) => (
  (state: any, props: any) => {
    const reducers: any = {};
    const isArray = (
      Array.isArray(keys)
    )
    if (isArray) {
      (keys as Array<string>).forEach(
        (key: string) => (
          reducers[key] = state[key]
        )
      )
    }
    else {
      const _keys = (
        keys as MapItem
      )
      Object.keys(_keys).forEach(
        (key: string) => (
          reducers[key] = (
            (_keys)[key](state, props)
          )
        )
      )
    }
    return reducers;
  }
)

const createMapDispatch = (actions: Actions) => (
  (dispatch: Dispatch) => {
    const acts: any = {};
    const keys = Object.keys(actions);
    keys.forEach((key: string) => {
      acts[key] = bindActionCreators(
        actions[key], dispatch
      )
    })
    return acts;
  }
)

export default (
  keys?: Keys | Actions | boolean,
  actions?: Keys | Actions | boolean
): Function => {

  const mapState = (
    createMapState(
      (keys || []) as Keys
    )
  )

  const mapAction = (
    createMapDispatch(
      (actions || {}) as Actions
    )
  )

  const hocNext = (
    connect(
      mapState,
      mapAction
    )
  )

  return (component: any) => (
    hocNext(component)
  )
}
