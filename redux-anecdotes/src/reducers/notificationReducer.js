import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    flashMsg(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return null
    }
  }

})
export const { flashMsg, removeNotification } = notificationSlice.actions

export const setNotification = (msg, time) => {
  return dispatch => {
    dispatch(flashMsg(msg))
    const seconds = time * 1000
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds)
  }
}

export default notificationSlice.reducer