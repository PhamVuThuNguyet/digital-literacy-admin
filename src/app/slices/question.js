import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state = action.payload;
      return state;
    },
    addQuestion: (state, action) => {
      return {...state,...action.payload};
    },
  },
});

export const { setQuestions, addQuestion } = questionSlice.actions;

export default questionSlice.reducer;
