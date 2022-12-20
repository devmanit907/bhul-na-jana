import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: JSON.parse(localStorage.getItem('events', '[]'))
}


const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        'saveEvent': (state, action) => {
            let newEvent = action.payload;
            let updatedEvents = [...state.events, newEvent]
            localStorage.setItem('events', JSON.stringify(updatedEvents))
            state.events = updatedEvents
        },
    }
})

export const eventActions = eventSlice.actions

export default eventSlice.reducer