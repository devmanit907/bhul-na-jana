import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: JSON.parse(localStorage.getItem('events')) || []
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
        'updateEvent': (state, action) => {
            console.log('updateEvent', action.payload)
            let updatedEvent = action.payload
            let newEvents = state.events.map((e) => {
                if(parseInt(e.id) === parseInt(updatedEvent.id)){
                    return updatedEvent
                }
            })
            console.log({newEvents})
            localStorage.setItem('events', JSON.stringify(newEvents))
            state.events = newEvents
        }
    }
})

export const eventActions = eventSlice.actions

export default eventSlice.reducer