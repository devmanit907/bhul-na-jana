
// events: [
//     {
//         'user_id': 1,
//         'name': 'Chintu',
//         'nickname': '',
//         'event_date': '20 Dec',
//         'event_type': 'anniversary',
//         'spouse_name': 'chinki'
//     },
//     {
//         'user_id': 1,
//         'name': '',
//         'nickname': '',
//         'event_date': '',
//         'event_type': 'birthday',
//         'spouse_name': null
//     },{
//         'user_id': 2,
//         'name': 'Chintu',
//         'nickname': '',
//         'event_date': '20 Dec',
//         'event_type': 'birthday'
//     }
// ]

const saveEvent = (event_data) => {
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(event_data);
    localStorage.setItem('events', JSON.stringify(events))
}

export default saveEvent