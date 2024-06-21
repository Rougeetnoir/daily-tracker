// import React from 'react';

// const EventList = ({ events }) => (
//     <ul>
//         {events.map((evt, index) => (
//             <li key={index}>
//                 {evt.event} at {evt.time.toLocaleTimeString()}
//             </li>
//         ))}
//     </ul>
// );

// export default EventList;

import React from 'react';

const EventList = ({ events }) => (
    <div className="my-4">
        <h2 className="text-xl font-bold mb-2  text-center">Event List:</h2>
        <ul className="list-disc list-inside px-3">
            {events.map((evt, index) => (
                <li key={index} className="py-2 custom-dotted-border">
                    <span className="font-semibold text-blue-500">{evt.event}</span> at {evt.time.toLocaleTimeString()}
                </li>
            ))}
        </ul>
    </div>
);

export default EventList;
