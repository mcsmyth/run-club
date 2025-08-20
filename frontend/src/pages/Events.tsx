import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Track Training Session',
      date: 'Aug 26, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track'
    },
    {
      id: 2,
      title: 'Track Training Session',
      date: 'Sep 2, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track'
    },
    {
      id: 3,
      title: 'Track Training Session',
      date: 'Sep 9, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600">
            Join our track training sessions and connect with fellow walkers and runners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {event.title}
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                Join Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
