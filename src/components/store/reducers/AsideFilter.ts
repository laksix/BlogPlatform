import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { AsideFilterItems } from "../../aside/types"
interface AsideState {
    currentFilters: string [],
    plainOptions: string [],
}


const initialState : AsideState = {
    currentFilters: [AsideFilterItems.NullTranstion,AsideFilterItems.OneTransition,AsideFilterItems.SecondTransition],
    plainOptions : [AsideFilterItems.NullTranstion,AsideFilterItems.OneTransition,AsideFilterItems.SecondTransition,AsideFilterItems.ThreeTransition]
   
}


export const AsideFilterSlice = createSlice({
    name:'asideFilter',
    initialState,
    reducers: {
        setCurrentFilters(state,action: PayloadAction<string[]>){
            state.currentFilters = [];
            const filters = action.payload;
            filters.map(e => state.currentFilters.push(e))
        },
        setFiltersAll (state,action: PayloadAction<boolean>) {
          if (action.payload){
            state.currentFilters = [AsideFilterItems.NullTranstion,AsideFilterItems.OneTransition,AsideFilterItems.SecondTransition,AsideFilterItems.ThreeTransition]
          } else state.currentFilters = []
        }
       
    }
})

export default AsideFilterSlice.reducer