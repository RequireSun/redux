import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  // 返回一个函数, 这个函数的参数是一个 creator 函数, 通过调用它来生成仓库
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState)
    var dispatch = store.dispatch
    var chain = []
    // 中间件只能获取到两样属性, 一个是原本的 state, 一个是事件触发器, 他会直接将事件转发到仓库的事件上去
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // 调用每一个中间件生成器, 生成中间件, 每个生成的中间件的参数都是 next
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 从后往前依次调用中间件
    // 不断的将原本的 dispatch 包到中间件当中, 最终形成的是一个大包
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
