import React from 'react';
import Navigation from './Components/router';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(combineReducers, applyMiddleware(thunk))

class App extends React.Component{

  render(){

    return(
      <Provider store={store}>
        <Navigation/>
      </Provider>
    )
  }
}
export default App;
