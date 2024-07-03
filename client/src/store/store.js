import {combineReducers} from 'redux'
import { authReducer } from './reducers/authReducer'
import { bugReducer} from "./reducers/bugReducer"
import { showReducer } from './reducers/showReducer'

export const reducers = combineReducers({
    auth: authReducer,
    bug: bugReducer,
    show: showReducer
})