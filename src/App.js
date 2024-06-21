import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css';
import './custom.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [summarizedEvents, setSummarizedEvents] = useState([]);

  // Function to add an event with timestamp
  const addEvent = (event) => {
    const newEvent = { ...event, time: new Date() };
    setEvents([...events, newEvent]);
  };

  // Function to calculate duration between two timestamps in hours and minutes
  const calculateDuration = (start, end) => {
    const durationMs = end.getTime() - start.getTime();
    const hours = String(Math.floor(durationMs / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((durationMs % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to handle summarize button click
  const summarizeEvents = () => {
    const summarized = events.map((event, index) => {
      if (index < events.length - 1) {
        const duration = calculateDuration(event.time, events[index + 1].time);
        return { ...event, duration };
      }
      return { ...event, duration: 'Event in progress' }; // For the last event, show it as ongoing
    });
    setSummarizedEvents(summarized);
  };

  return (
    <div className="min-h-screen bg-grey-100 flex items-center justify-center py-12 px-6 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full sm:max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Daily Tracker</h1>
          <EventForm addEvent={addEvent} />
          <EventList events={events} />
          <button
            onClick={summarizeEvents}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 focus:outline-none focus:shadow-outline"
          >
            Summarize
          </button>

        </div>
        <div className="bg-white shadow-md rounded-lg p-6 ">
          {/* Display summarized events */}

          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Summarized Events</h1>
          <ul className='px-3'>
            {summarizedEvents.map((event, index) => (
              <li key={index} className="grid grid-cols-2 mb-2">
                <span className="font-semibold text-blue-500 text-left">{event.event}</span>
                <span className="text-right">{event.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
