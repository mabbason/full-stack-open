import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filterBy',
  initialState: '',
  reducers: {
    filterChange(_, action) {
      const filterBy = action.payload
      return filterBy
    },
  }

})
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer