import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'loggedInUser': null,
    'loggedOutUser':false,
    'signUpUser':[],
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        'login': (state, action) => {
            state.loggedInUser = action.payload
        },
        'logout': (state,action) => {
            state.loggedOutUser = action.payload
        },
        'signUp':(state,action)=>{
            state.signUpUser = [...state.signUpUser, action.payload];
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer