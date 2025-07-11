import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ServiceDetailsModal from './modals/ServiceDetailsModal';
import PremiumMembershipModal from './modals/PremiumMembershipModal';

interface ServicesProps {
  onBookNow: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookNow }) => {
  const [activeTab, setActiveTab] = useState("standard");
  const [selectedService, setSelectedService] = useState<null | {
    title: string;
    description: string;
    features: string[];
    image: string;
    pricing?: {
      amount: string;
      period: string;
    };
  }>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const services = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Turf Booking",
      description: "Book our premium natural grass turfs for football, cricket, and more. Perfect for team practices and friendly matches.",
      features: [
        "FIFA-standard artificial turf",
        "Floodlights for evening games",
        "Changing rooms and showers",
        "Equipment rental available",
        "Spectator seating area",
        "First aid facilities"
      ],
      pricing: {
        amount: "₹1000",
        period: "per hour"
      }
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Court Rentals",
      description: "High-quality indoor and outdoor courts for basketball, volleyball, badminton, and tennis available for hourly bookings.",
      features: [
        "Professional-grade flooring",
        "Climate controlled environment",
        "Equipment rental",
        "Locker rooms",
        "Coaching available",
        "Tournament hosting"
      ],
      pricing: {
        amount: "₹500",
        period: "per hour"
      }
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Tournament Hosting",
      description: "Host your next sports tournament with us. We provide complete organizational support and top-notch facilities.",
      features: [
        "Full event management",
        "Referee services",
        "Live scoring system",
        "Catering options",
        "Medical support",
        "Photography services"
      ],
      pricing: {
        amount: "₹25000",
        period: "per day"
      }
    }
  ];
  
  const premiumServices = [
    {
      id: 4,
      image: "https://images.pexels.com/photos/8224728/pexels-photo-8224728.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Professional Coaching",
      description: "One-on-one sessions with certified coaches to improve your skills and technique in your chosen sport.",
      features: [
        "Certified trainers",
        "Personalized training plans",
        "Video analysis",
        "Progress tracking",
        "Nutrition guidance",
        "Regular assessments"
      ],
      pricing: {
        amount: "₹1500",
        period: "per session"
      }
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/8112121/pexels-photo-8112121.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "VIP Facilities",
      description: "Exclusive access to premium locker rooms, private courts, and personalized service for our VIP members.",
      features: [
        "Private changing rooms",
        "Priority booking",
        "Personal locker",
        "Towel service",
        "Refreshment counter",
        "Dedicated support"
      ],
      pricing: {
        amount: "₹5000",
        period: "per month"
      }
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/5384534/pexels-photo-5384534.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Corporate Packages",
      description: "Customized sports packages for corporate events, team building, and employee wellness programs.",
      features: [
        "Team building activities",
        "Corporate tournaments",
        "Wellness programs",
        "Event planning",
        "Catering services",
        "Branded merchandise"
      ],
      pricing: {
        amount: "Custom",
        period: "per package"
      }
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Premium Gym Access",
      description: "State-of-the-art gym facilities with modern equipment and personal training services in Chennai and Hyderabad.",
      features: [
        "Latest equipment",
        "Personal training",
        "Group classes",
        "Nutrition planning",
        "Body composition analysis",
        "24/7 access"
      ],
      pricing: {
        amount: "₹2000",
        period: "per month"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-100" id="quick-booking">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Our Premium Services</h2>
          <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-white inline-flex p-1 rounded-full shadow-md">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === "standard" ? "bg-[#ff5e14] text-white" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setActiveTab("standard")}
            >
              Standard Services
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === "premium" ? "bg-[#ff5e14] text-white" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setActiveTab("premium")}
            >
              Premium Membership
            </button>
          </div>
        </div>
        
        {activeTab === "standard" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl text-white font-bold">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedService({
                        title: service.title,
                        description: service.description,
                        features: service.features,
                        image: service.image,
                        pricing: service.pricing
                      })}
                      className="text-[#ff5e14] font-medium hover:text-[#e54d00] flex items-center"
                    >
                      Learn More <ChevronRight size={16} className="ml-1" />
                    </button>
                    <button 
                      onClick={onBookNow}
                      className="bg-[#ff5e14] text-white px-4 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="bg-gradient-to-br from-[#2f3241] to-[#394153] p-8 rounded-xl shadow-xl mb-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Arena Hub Premium Membership</h3>
                  <p className="mb-6">Upgrade to our premium membership for exclusive benefits, priority bookings, and special perks that enhance your sports and fitness experience.</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[#ff5e14] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority booking up to 14 days in advance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[#ff5e14] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>10% discount on all bookings and services</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[#ff5e14] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Access to exclusive VIP areas and premium facilities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[#ff5e14] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free equipment rental on every visit</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[#ff5e14] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited gym access at both locations</span>
                    </li>
                  </ul>
                  <div className="space-x-4">
                    <button 
                      onClick={() => setShowPremiumModal(true)}
                      className="inline-block px-6 py-3 bg-[#ff5e14] text-white font-medium rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                    >
                      Join Premium
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 text-center">
                    <div className="text-[#ff5e14] text-5xl font-bold mb-2">₹999</div>
                    <p className="text-lg mb-6">per month</p>
                    <ul className="text-sm space-y-2 mb-6 text-left">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-[#ff5e14] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>No joining fee</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-[#ff5e14] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Cancel anytime</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-[#ff5e14] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Yearly plan available</span>
                      </li>
                    </ul>
                    <div className="text-xs text-white/70">*Terms and conditions apply</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumServices.map(service => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#ff5e14] text-white text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl text-white font-bold">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setSelectedService({
                          title: service.title,
                          description: service.description,
                          features: service.features,
                          image: service.image,
                          pricing: service.pricing
                        })}
                        className="text-[#ff5e14] font-medium hover:text-[#e54d00] flex items-center"
                      >
                        Learn More <ChevronRight size={16} className="ml-1" />
                      </button>
                      <button 
                        onClick={onBookNow}
                        className="bg-[#ff5e14] text-white px-4 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ServiceDetailsModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService || {
          title: '',
          description: '',
          features: [],
          image: '',
        }}
      />
      <PremiumMembershipModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </section>
  );
};

export default Services;