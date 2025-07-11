import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EventDetailsModal from '../components/modals/EventDetailsModal';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [bookingFormData, setBookingFormData] = useState({
    eventName: '',
    participantName: '',
    email: '',
    phone: '',
    participants: '',
    specialRequirements: ''
  });
  
  // Mock events data with detailed information
  const eventsData = [
    {
      id: 1,
      title: "Chennai Corporate Cricket League",
      date: "June 15-20, 2025",
      location: "Chennai Central Cricket Ground",
      image: "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "A 5-day cricket tournament for corporate teams with exciting prizes and networking opportunities.",
      category: "tournament",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "16 teams (15 players per team)",
        duration: "5 days",
        price: "₹25,000 per team",
        includes: [
          "Professional umpires",
          "Live scoring system",
          "Team jerseys",
          "Refreshments",
          "Trophy and medals",
          "Prize money"
        ],
        requirements: [
          "Company ID proof",
          "Team roster submission",
          "Medical fitness certificate",
          "Cricket whites mandatory"
        ],
        schedule: [
          "Day 1-3: League matches",
          "Day 4: Quarter-finals and Semi-finals",
          "Day 5: Finals and Award ceremony"
        ],
        organizer: "ArenaHub Sports",
        contact: "tournaments@arenahub.com"
      }
    },
    {
      id: 2,
      title: "Badminton Masterclass",
      date: "July 8, 2025",
      location: "Jubilee Hills Badminton Arena, Hyderabad",
      image: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Learn advanced techniques and strategies from India's national badminton champion.",
      category: "workshop",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "30 participants",
        duration: "Full day workshop",
        price: "₹5,000 per person",
        includes: [
          "Professional coaching",
          "Video analysis",
          "Equipment guidance",
          "Nutrition consultation",
          "Certificate of completion",
          "Lunch and refreshments"
        ],
        requirements: [
          "Minimum 2 years playing experience",
          "Own badminton racket",
          "Proper sports attire",
          "Age 15+"
        ],
        schedule: [
          "9:00 AM - Basic techniques review",
          "11:00 AM - Advanced strategies",
          "2:00 PM - Practice matches",
          "4:00 PM - Personal feedback"
        ],
        organizer: "National Badminton Academy",
        contact: "academy@arenahub.com"
      }
    },
    {
      id: 3,
      title: "Weekend Football Tournament",
      date: "May 20-21, 2025",
      location: "Chennai Central Football Turf",
      image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Join our weekend 5-a-side football tournament for all skill levels. Teams of 7 players maximum.",
      category: "tournament",
      registrationOpen: true,
      featured: false,
      details: {
        capacity: "16 teams (7 players per team)",
        duration: "2 days",
        price: "₹3,000 per team",
        includes: [
          "Referee services",
          "First aid support",
          "Refreshments",
          "Medals for winners",
          "Photography coverage"
        ],
        requirements: [
          "Team registration form",
          "Player ID proofs",
          "Football boots mandatory",
          "Team uniforms required"
        ],
        schedule: [
          "Day 1: Group stages",
          "Day 2: Knockouts and Finals"
        ]
      }
    },
    {
      id: 4,
      title: "Tennis Open Day",
      date: "June 5, 2025",
      location: "Hyderabad Tennis Complex",
      image: "https://images.pexels.com/photos/8224728/pexels-photo-8224728.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Free tennis sessions, equipment testing, and mini competitions for tennis enthusiasts of all ages.",
      category: "open_day",
      registrationOpen: true,
      featured: false,
      details: {
        capacity: "100 participants",
        duration: "Full day event",
        price: "Free entry",
        includes: [
          "Basic tennis lessons",
          "Equipment trials",
          "Mini tournaments",
          "Professional demonstrations",
          "Tennis gear exhibition"
        ]
      }
    },
    {
      id: 5,
      title: "Basketball Training Camp",
      date: "July 15-18, 2025",
      location: "Chennai Indoor Basketball Court",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Intensive 4-day basketball training camp for youth players aged 12-18, coached by professional players.",
      category: "workshop",
      registrationOpen: false,
      featured: false,
      details: {
        capacity: "40 participants",
        duration: "4 days",
        price: "₹8,000 per person",
        includes: [
          "Professional coaching",
          "Skills assessment",
          "Tactical training",
          "Nutrition guidance",
          "Training kit"
        ]
      }
    },
    {
      id: 6,
      title: "Charity Run for Education",
      date: "August 12, 2025",
      location: "Hyderabad City Park",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "5K and 10K charity run to raise funds for underprivileged children's education. All proceeds go to local NGOs.",
      category: "charity",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "1000 participants",
        duration: "One morning",
        price: "₹500 registration fee",
        includes: [
          "Race number",
          "T-shirt",
          "Finisher medal",
          "Refreshments",
          "Certificate"
        ]
      }
    }
  ];
  
  // Filter events based on active filter
  const filteredEvents = activeFilter === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.category === activeFilter);
  
  // Featured events
  const featuredEvents = eventsData.filter(event => event.featured);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking submitted successfully! We will contact you shortly with further details.');
    setBookingFormData({
      eventName: '',
      participantName: '',
      email: '',
      phone: '',
      participants: '',
      specialRequirements: ''
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-24" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Tournaments</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join our exciting sports events, tournaments, workshops, and more. Whether you're a participant or spectator, there's something for everyone!
          </p>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Don't Miss Out</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Featured Events</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-70"></div>
                  <div className="absolute top-4 right-4 bg-[#ff5e14] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#2f3241]">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2 text-[#ff5e14]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-[#ff5e14]" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${event.registrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {event.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                    </span>
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="text-[#ff5e14] font-medium hover:text-[#e54d00] flex items-center"
                    >
                      Learn More <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Events with Filters */}
      <section id="upcoming" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">What's Happening</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Upcoming Events</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            <button 
              onClick={() => setActiveFilter('all')} 
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === 'all' ? 'bg-[#ff5e14] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All Events
            </button>
            <button 
              onClick={() => setActiveFilter('tournament')} 
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === 'tournament' ? 'bg-[#ff5e14] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Tournaments
            </button>
            <button 
              onClick={() => setActiveFilter('workshop')} 
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === 'workshop' ? 'bg-[#ff5e14] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Workshops & Training
            </button>
            <button 
              onClick={() => setActiveFilter('open_day')} 
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === 'open_day' ? 'bg-[#ff5e14] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Open Days
            </button>
            <button 
              onClick={() => setActiveFilter('charity')} 
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === 'charity' ? 'bg-[#ff5e14] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Charity Events
            </button>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-[#2f3241] text-xs font-bold px-3 py-1 rounded-full capitalize">
                    {event.category.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-[#2f3241]">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-[#ff5e14]" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-[#ff5e14]" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${event.registrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {event.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                    </span>
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="text-[#ff5e14] font-medium hover:text-[#e54d00] text-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white p-8 rounded-lg shadow-md inline-block">
                <Filter size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-600 mb-4">There are no events matching your current filter.</p>
                <button 
                  onClick={() => setActiveFilter('all')} 
                  className="bg-[#ff5e14] text-white px-4 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  Show All Events
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Event Booking Form */}
      <section id="event-booking-form" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Register Now</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Event Registration Form</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    value={bookingFormData.eventName}
                    onChange={(e) => setBookingFormData({...bookingFormData, eventName: e.target.value})}
                    required
                  >
                    <option value="">Select Event</option>
                    {eventsData.map(event => (
                      <option key={event.id} value={event.title} disabled={!event.registrationOpen}>
                        {event.title} {!event.registrationOpen ? '(Registration Closed)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter your full name"
                    value={bookingFormData.participantName}
                    onChange={(e) => setBookingFormData({...bookingFormData, participantName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter your email"
                    value={bookingFormData.email}
                    onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter number of participants"
                    value={bookingFormData.participants}
                    onChange={(e) => setBookingFormData({...bookingFormData, participants: e.target.value})}
                    required
                  />
                </div>

                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Any special requirements or requests"
                    value={bookingFormData.specialRequirements}
                    onChange={(e) => setBookingFormData({...bookingFormData, specialRequirements: e.target.value})}
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <p className="text-sm text-gray-600">
                  By submitting this form, you agree to our terms and conditions.
                </p>
                <button
                  type="submit"
                  className="bg-[#ff5e14] text-white px-8 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Host Your Event */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#2f3241] to-[#394153] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Organize With Us</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Host Your Event at ArenaHub</h2>
              
              <p className="text-white/90 mb-4">
                Looking for the perfect venue for your sports tournament, corporate event, or training session? ArenaHub offers premium facilities and comprehensive event support services.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>State-of-the-art facilities for multiple sports</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Professional event management support</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Catering, equipment, and staff services available</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Customizable packages to fit your budget</span>
                </li>
              </ul>
              
              <button
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const contactNavLink = document.querySelector('a[href="/contact"]');
                    if (contactNavLink instanceof HTMLElement) {
                      contactNavLink.click();
                      contactNavLink.focus();
                    }
                  }, 100);
                }}
                className="inline-block bg-[#ff5e14] text-white px-6 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
              >
                Contact for Booking
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Event hosting" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Event hosting" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/8426704/pexels-photo-8426704.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Event hosting" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://images.pexels.com/photos/8426230/pexels-photo-8426230.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Event hosting" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent || {
          title: '',
          date: '',
          location: '',
          image: '',
          description: '',
          category: '',
          registrationOpen: false
        }}
      />
    </div>
  );
};

export default Events;