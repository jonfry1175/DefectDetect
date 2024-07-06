import {combineReducers} from 'redux'
import { authReducer } from './reducers/authReducer'
import { bugReducer} from "./reducers/bugReducer"
import { showReducer } from './reducers/showReducer'
import { levelReducer } from './reducers/levelReducer'
import { roleReducer } from './reducers/roleReducer'

export const reducers = combineReducers({
    auth: authReducer,
    bug: bugReducer,
    show: showReducer,
    level: levelReducer,
    role: roleReducer
})