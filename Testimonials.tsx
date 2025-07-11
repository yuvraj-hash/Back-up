import React, { useState, useEffect } from 'react';

const Testimonials: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      content: "The facilities at Arena Hub are world-class. We booked the football turf for our corporate tournament and everyone was impressed with the quality. Will definitely come back!",
      name: "Ravi Kumar",
      title: "IT Professional",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Football"
    },
    {
      id: 2,
      content: "I've been using Arena Hub for my weekend badminton sessions for months now. The courts are always well-maintained and the booking process is so simple. Highly recommend!",
      name: "Priya Sharma",
      title: "Badminton Enthusiast",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 4.5,
      sport: "Badminton"
    },
    {
      id: 3,
      content: "The cricket pitch at Arena Hub is perfect! We organized a tournament with friends and the experience was fantastic. Great facilities and friendly staff.",
      name: "Aditya Patel",
      title: "Cricket Club Captain",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Cricket"
    },
    {
      id: 4,
      content: "As a fitness trainer, I often recommend Arena Hub to my clients. The facilities are clean, spacious, and always available. The staff is also very accommodating!",
      name: "Meera Singh",
      title: "Personal Trainer",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Fitness"
    },
    {
      id: 5,
      content: "The gym facilities are top-notch! I've been a premium member for 6 months and the equipment quality, cleanliness, and professional trainers have exceeded my expectations.",
      name: "Rahul Verma",
      title: "Fitness Enthusiast",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Gym"
    },
    {
      id: 6,
      content: "Arena Hub's tennis courts are exceptional. The booking system is seamless, and the facility maintenance is impeccable. It's become my go-to place for tennis practice!",
      name: "Sneha Reddy",
      title: "Tennis Player",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 4.5,
      sport: "Tennis"
    },
    {
      id: 7,
      content: "The basketball court lighting and flooring are perfect! I've played at many venues, but Arena Hub stands out for its professional-grade facilities and friendly atmosphere.",
      name: "Michael Thomas",
      title: "Basketball Coach",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Basketball"
    },
    {
      id: 8,
      content: "Monthly membership at Arena Hub has transformed my fitness journey. The variety of sports facilities and gym equipment keeps my workout routine exciting and effective.",
      name: "Anjali Desai",
      title: "Sports Enthusiast",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60",
      rating: 5,
      sport: "Multi-Sport"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  const displayedTestimonials = showAllReviews ? testimonials : testimonials.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-br from-[#1a1d29] via-[#2f3241] to-[#1a1d29] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff5e14] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <span className="text-[#ff5e14] font-bold text-sm uppercase tracking-wider bg-[#ff5e14]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ff5e14]/30">
              ⭐ Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            What Our <span className="bg-gradient-to-r from-[#ff5e14] to-[#ffa500] bg-clip-text text-transparent">Champions</span> Say
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#ff5e14] to-[#ffa500] mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Join thousands of satisfied athletes who've made Arena Hub their home for sports excellence
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#ff5e14] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Featured Review
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <blockquote className="text-xl md:text-2xl font-light italic text-white/90 mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#ff5e14] shadow-lg"
                />
                <div className="text-left">
                  <h4 className="text-white font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-300">{testimonials[currentIndex].title}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-[#ff5e14]/20 text-[#ff5e14] text-sm rounded-full">
                    {testimonials[currentIndex].sport}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#ff5e14] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff5e14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Sport Badge */}
              <div className="absolute -top-3 -right-3 bg-[#ff5e14] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {testimonial.sport}
              </div>

              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#ff5e14] to-[#e54d00] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-white/90 mb-6 text-sm italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center justify-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#ff5e14] shadow-md"
                    loading="lazy"
                  />
                  <div className="text-center">
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-300 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#ff5e14] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] text-white font-semibold rounded-full hover:from-[#e54d00] hover:to-[#ff5e14] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="relative z-10">
              {showAllReviews ? 'Show Less Reviews' : 'View All Reviews'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;