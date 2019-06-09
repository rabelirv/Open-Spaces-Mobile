import React from 'react';
import Navigation from './Components/router';
// import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from './reducers'

const store = createStore(combineReducers)

class App extends React.Component{

  render(){

    return(
      // <Provider store={store}>
        <Navigation/>
      // </Provider>
    )
  }
}
export default App;
