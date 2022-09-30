import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Components/UserSlice';
 const store = configureStore({
  reducer: {
    users:  userReducer
  }
})

export default store;