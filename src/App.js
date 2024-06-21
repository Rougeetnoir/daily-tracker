import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import './custom.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [summarizedEvents, setSummarizedEvents] = useState([]);
  const [chartData, setChartData] = useState(null);

  const addEvent = (event) => {
    const newEvent = { ...event, time: new Date() };
    setEvents([...events, newEvent]);
  };

  const calculateDuration = (start, end) => {
    const durationMs = end.getTime() - start.getTime();
    const hours = String(Math.floor(durationMs / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((durationMs % (1000 * 60)) / 1000)).padStart(2, '0');
    return { hours, minutes, seconds, formatted: `${hours}:${minutes}:${seconds}`, durationMs };
  };

  const summarizeEvents = () => {
    let totalDurationMs = 0;
    const summarized = events.map((event, index) => {
      if (index < events.length - 1) {
        const duration = calculateDuration(event.time, events[index + 1].time);
        totalDurationMs += duration.durationMs;
        return { ...event, duration: duration.formatted, durationMs: duration.durationMs };
      }
      return { ...event, duration: 'Event in progress', durationMs: 0 };
    });

    setSummarizedEvents(summarized);

    if (totalDurationMs > 0) {
      const chartLabels = summarized.map(event => event.event);
      const chartValues = summarized.map(event => (event.durationMs / totalDurationMs) * 100);

      const newChartData = {
        labels: chartLabels,
        datasets: [{
          data: chartValues,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#E7E9ED'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#E7E9ED'
          ]
        }]
      };

      setChartData(newChartData);
    }
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const data = tooltipItem.chart.data;
            if (!data || !data.datasets || !data.datasets[0]) {
              return '';
            }
            const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            const percentage = Math.round((value / total) * 100);
            return `${data.labels[tooltipItem.dataIndex]}: ${percentage}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6 sm:px-0">
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

        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Summarized Events</h1>
          <ul className="px-3">
            {summarizedEvents.map((event, index) => (
              <li key={index} className="grid grid-cols-2 mb-2">
                <span className="font-semibold text-blue-500 text-left">{event.event}</span>
                <span className="text-right">{event.duration}</span>
              </li>
            ))}
          </ul>
          {chartData && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Time Distribution</h2>
              <div className="flex justify-center">
                <div className="w-48 h-48">
                  <Pie data={chartData} options={options} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
