import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import goods from "./goods"

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['goods']
// }

const rootReducer = combineReducers({
  goods,
})

export default rootReducer
// export default persistReducer(persistConfig, rootReducer)