import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleWare = createSagaMiddleWare();

const configureStore = initialState => {
    const middlewares = [
        sagaMiddleWare,
    ];
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    );
    
     sagaMiddleWare.run(rootSaga);
     return store;
}

export default configureStore;