import React, { useState } from 'react';

const EventForm = ({ addEvent }) => {
    const [event, setEvent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent({ event, time: new Date() });
        setEvent('');
    };

    return (
        <form className="flex items-center justify-between" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 mr-2 flex-1"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="Event"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
                Log Event
            </button>
        </form>
    );
};

export default EventForm;
