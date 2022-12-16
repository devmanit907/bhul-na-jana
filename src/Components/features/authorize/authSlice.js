import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'loggedInUser': null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        'login': (state, action) => {
            state.loggedInUser = action.payload
        },
        'logout': (state) => {
            state.loggedInUser = null
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer