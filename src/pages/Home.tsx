import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleJoinEvent = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setModalOpen(true);
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Track Training Session',
      date: 'Aug 26, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track',
      participants: 24
    },
    {
      id: 2,
      title: 'Track Training Session',
      date: 'Sep 2, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track',
      participants: 18
    },
    {
      id: 3,
      title: 'Track Training Session',
      date: 'Sep 9, 2024',
      time: '5:00 PM',
      location: 'Burlingame High School Track',
      participants: 32
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stride, stroll, or sprint.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join our community of walkers and runners and achieve your fitness goals together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/events" 
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Events
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <Link 
              to="/events" 
              className="text-primary hover:text-primary-dark font-semibold"
            >
              View All Events →
            </Link>
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
                <button 
                  onClick={() => handleJoinEvent(event.title)}
                  className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Running?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community and discover the joy of running with others
          </p>
          <Link 
            to="/events" 
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Find Your Next Run
          </Link>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventTitle={selectedEvent}
      />
    </div>
  );
};

export default Home;
