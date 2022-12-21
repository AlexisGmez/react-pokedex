import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlace = createSlice({

    name: 'nameTrainer',
    initialState: localStorage.getItem('nameTrainer') ?? '',
    reducers: {
        setNameTrainerGlobal: (state,action)=> action.payload
    }
})


export const {setNameTrainerGlobal} = nameTrainerSlace.actions;
export default nameTrainerSlace.reducer;