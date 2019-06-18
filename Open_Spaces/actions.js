import {AsyncStorage} from 'react-native';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token: token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token: token
});

export const removeToken = (noToken) => ({
    type: 'REMOVE_TOKEN',
    token: noToken
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const accessNavigation = navigate =>({
  type: 'ACCESS_NAVIGATION',
  navigate: (route)=> navigate(route)
})

export const saveUserToken = token => {
  return dispatch => {
          dispatch(saveToken(token))
  }
}

export const getNavigation = navigate => {
  return dispatch =>{
    dispatch(accessNavigation(navigate))
  }
}



export const getUserToken = () => {
  return dispatch => {
    AsyncStorage.getItem('token')
    .then(data=> dispatch(getToken(data)))
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    })
  }
}


export const removeUserToken = () => dispatch =>
    AsyncStorage.clear()
        .then((data) => {
          console.log("removeUser token",data)
            dispatch(loading(false));
            dispatch(removeToken(null));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })
