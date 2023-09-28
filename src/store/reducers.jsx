// reducers.js
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
  } from './actions';
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_DATA_SUCCESS:
        return { ...state, loading: false, data: action.payload, error: null };
      case FETCH_DATA_FAILURE:
        return { ...state, loading: false, data: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default dataReducer;
  