import React from 'react';
import { X, Calendar, MapPin, Users, Clock, DollarSign } from 'lucide-react';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: string;
    location: string;
    image: string;
    description: string;
    category: string;
    registrationOpen: boolean;
    details?: {
      capacity?: string;
      duration?: string;
      price?: string;
      requirements?: string[];
      includes?: string[];
      schedule?: string[];
      organizer?: string;
      contact?: string;
    };
  };
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  if (!isOpen) return null;

  const handleBooking = () => {
    onClose();
    const bookingSection = document.getElementById('event-booking-form');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      // Add focus to the first form element
      const firstInput = bookingSection.querySelector('input, select') as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-3xl shadow-xl">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img 
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <h2 className="text-2xl font-bold text-white">{event.title}</h2>
              <span className="inline-block mt-2 bg-[#ff5e14] text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                {event.category.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="text-[#ff5e14] w-5 h-5 mr-2" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-[#ff5e14] w-5 h-5 mr-2" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                {event.details?.capacity && (
                  <div className="flex items-center">
                    <Users className="text-[#ff5e14] w-5 h-5 mr-2" />
                    <span className="text-gray-700">{event.details.capacity}</span>
                  </div>
                )}
                {event.details?.duration && (
                  <div className="flex items-center">
                    <Clock className="text-[#ff5e14] w-5 h-5 mr-2" />
                    <span className="text-gray-700">{event.details.duration}</span>
                  </div>
                )}
                {event.details?.price && (
                  <div className="flex items-center">
                    <DollarSign className="text-[#ff5e14] w-5 h-5 mr-2" />
                    <span className="text-gray-700">{event.details.price}</span>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>

            {event.details?.includes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-[#2f3241]">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {event.details.includes.map((item, index) => (
                    <div key={index} className="flex items-start bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#ff5e14] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.details?.requirements && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-[#2f3241]">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {event.details.requirements.map((req, index) => (
                    <div key={index} className="flex items-start bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#ff5e14] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.details?.schedule && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-[#2f3241]">Schedule</h3>
                <div className="space-y-2">
                  {event.details.schedule.map((item, index) => (
                    <div key={index} className="flex items-start bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Organized by: {event.details?.organizer || 'ArenaHub'}</p>
                  <p className="text-sm text-gray-600">Contact: {event.details?.contact || 'events@arenahub.com'}</p>
                </div>
                <button
                  onClick={handleBooking}
                  className="bg-[#ff5e14] text-white px-6 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300 transform hover:scale-105"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;