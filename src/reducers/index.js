import { combineReducers } from 'redux'
//redux-form จะทำการเก็บ state และมี reducer ในตัวของมันเอง
//ดังนั้นเวลาเราจะใช้งาน redux-form เราต้องทำเหมือนว่ามันคือ reducer ตัวหนึ่งด้วยครับ
//import { reducer as formReducer } from 'redux-form'

import menuReducer from './menuReducer'
import userReducer from './userReducer'
import subdocReducer from './subdocReducer'

const rootReducers = combineReducers({
    menuReducer,
    userReducer,
    subdocReducer
})

export default rootReducers