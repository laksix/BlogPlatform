import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
interface FilterState {
    filter:string
}


const initialState : FilterState = {
    filter: 'free'
}


export const FilterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
       switchFilter(state, action: PayloadAction<string>){
         state.filter = action.payload
       }
    }
})

export default FilterSlice.reducer