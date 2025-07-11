import React from 'react';
import { Shield, DollarSign, Zap } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-cover bg-center" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/12987444/pexels-photo-12987444.jpeg?auto=compress&cs=tinysrgb&w=1600')"
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Game with Arena Hub
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Premium sports venues for athletes and enthusiasts. Book courts, join tournaments, and experience world-class amenities at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={onBookNow}
              className="px-8 py-3 bg-[#ff5e14] text-white font-semibold rounded-md hover:bg-white hover:text-[#ff5e14] transition-all duration-300 min-w-[160px]"
            >
              Book Now
            </button>
            <a 
              href="#features" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#ff5e14] transition-all duration-300 min-w-[160px]"
            >
              Explore Facilities
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Shield className="text-[#ff5e14]" size={24} />
              </div>
              <span className="font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="text-[#ff5e14]" size={24} />
              </div>
              <span className="font-medium">Affordable Rates</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Zap className="text-[#ff5e14]" size={24} />
              </div>
              <span className="font-medium">Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ff5e14] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;