//Importation librairie
//Importation Reducer

import { createStore, combineReducers } from 'redux'
import playerReducer from '../components/playing/player/reducer'

//Creation constantes

const rootReducer = combineReducers({
    player: playerReducer,
})


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
