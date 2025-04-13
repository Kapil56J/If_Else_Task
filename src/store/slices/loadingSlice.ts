import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingText: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingWithText: (
      state,
      action: PayloadAction<{isLoading: boolean; text?: string}>,
    ) => {
      state.isLoading = action.payload.isLoading;
      state.loadingText = action.payload.text;
    },
  },
});

export const {setLoading, setLoadingWithText} = loadingSlice.actions;
export default loadingSlice.reducer; 