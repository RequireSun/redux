import createStore from './createStore'
import combineReducers from './utils/combineReducers'
import bindActionCreators from './utils/bindActionCreators'
import applyMiddleware from './utils/applyMiddleware'
import compose from './utils/compose'

export {
  createStore,              // 新建 store
  combineReducers,          // 合并 reducer
  bindActionCreators,
  applyMiddleware,
  compose
}
