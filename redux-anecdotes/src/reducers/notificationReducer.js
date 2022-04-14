import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(_, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return null
    }
  }

})
export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer