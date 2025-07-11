import React from 'react';
import { Award, Users, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleVenueNavigation = () => {
    navigate('/');
    setTimeout(() => {
      const venueSection = document.getElementById('venues');
      if (venueSection) {
        venueSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactNavigation = () => {
    navigate('/contact');
    setTimeout(() => {
      const contactNavLink = document.querySelector('a[href="/contact"]');
      if (contactNavLink instanceof HTMLElement) {
        contactNavLink.click();
        contactNavLink.focus();
      }
    }, 100);
  };

  const teamMembers = [
    {
      name: "Yuvraj Alnitak",
      position: "Founder & CEO",
      image: "/Profile-pic2.png",
      bio: "Visionary founder with a deep-rooted passion for sports and technology."
    },
    {
      name: "Priya Patel",
      position: "Operations Director",
      image: "https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "15+ years experience in facilities management and customer service excellence."
    },
    {
      name: "Vikram Singh",
      position: "Head of Technology",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Tech entrepreneur focused on creating seamless digital experiences for sports enthusiasts."
    },
    {
      name: "Anita Reddy",
      position: "Marketing Director",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Digital marketing specialist with a background in sports brand development."
    }
  ];
  
  const timelineEvents = [
    {
      year: "2020",
      title: "Company Founded",
      description: "ArenaHub was founded with a vision to revolutionize sports venue booking in India."
    },
    {
      year: "2021",
      title: "First Location",
      description: "Opened our first premium sports facility in Chennai with 5 different sport options."
    },
    {
      year: "2022",
      title: "Expansion to Hyderabad",
      description: "Launched our second location in Hyderabad's Jubilee Hills area."
    },
    {
      year: "2023",
      title: "Web App Launch",
      description: "Released our web app, making booking even more convenient."
    },
    {
      year: "2024",
      title: "Premium Membership",
      description: "Introduced our premium membership program with exclusive benefits."
    },
    {
      year: "2025",
      title: "Future Plans",
      description: "Expanding to 5 new cities across India with enhanced facilities and services."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-cover bg-center py-32" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/12987444/pexels-photo-12987444.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      >
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ArenaHub</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Discover the story behind India's premier sports venue booking platform and our mission to transform how people access and enjoy sports facilities.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl font-bold mt-2 mb-6 text-[#2f3241]">Changing How India Plays Sports</h2>
              
              <p className="text-gray-600 mb-4">
                ArenaHub was born from a simple observation: despite India's passion for sports, finding and booking quality venues remained a challenge for most enthusiasts.
              </p>
              
              <p className="text-gray-600 mb-4">
                Founded in 2020 by Rahul Sharma, a former professional cricketer, ArenaHub set out to solve this problem by creating a seamless platform connecting sports lovers with premium facilities.
              </p>
              
              <p className="text-gray-600 mb-6">
                What started as a single location in Chennai has now grown into a network of state-of-the-art venues across multiple cities, with plans for nationwide expansion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleContactNavigation}
                  className="bg-[#ff5e14] text-white px-6 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300 text-center"
                >
                  Contact Us
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Swimming pool" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Football" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Badminton" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Gym" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission and Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Mission & Values</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#2f3241]">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To democratize access to premium sports facilities and create vibrant sporting communities across India, making it easier for everyone to lead an active lifestyle.
              </p>
              
              <h3 className="text-2xl font-bold mb-6 text-[#2f3241]">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To become India's most trusted platform for sports venue bookings, with presence in every major city and a community of 1 million active users by 2030.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#ff5e14]">
                <p className="italic text-gray-700">
                  "We believe that access to quality sports facilities shouldn't be a privilege but a right for everyone passionate about sports."
                </p>
                <p className="mt-2 font-medium">— Yuvraj Alnitak, Founder & CEO</p>
              </div>
            </div>
            
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-[#ff5e14] mb-4">
                    <Award size={36} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Excellence</h4>
                  <p className="text-gray-600">
                    We are committed to providing the highest quality facilities and services to our customers.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-[#ff5e14] mb-4">
                    <Users size={36} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Community</h4>
                  <p className="text-gray-600">
                    We foster inclusive sporting communities where people of all skill levels feel welcome.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-[#ff5e14] mb-4">
                    <Target size={36} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Accessibility</h4>
                  <p className="text-gray-600">
                    We make sports venues accessible to everyone through affordable pricing and convenient booking.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-[#ff5e14] mb-4">
                    <TrendingUp size={36} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                  <p className="text-gray-600">
                    We constantly innovate to improve the sports booking experience for our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Meet Our Team</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">The People Behind ArenaHub</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Removed social icons overlay */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-[#2f3241]">{member.name}</h3>
                  <p className="text-[#ff5e14] font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Journey Timeline */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Growth Timeline</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex flex-col md:flex-row`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-1'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'md:ml-auto' : ''} max-w-md relative`}>
                      <div className="inline-block bg-[#ff5e14] text-white text-sm font-bold px-4 py-1 rounded mb-3">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-[#2f3241]">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                      
                      {/* Arrow for desktop */}
                      <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 hidden md:block
                        ${index % 2 === 0 ? 'right-[-8px]' : 'left-[-8px]'}`}></div>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div className="w-8 h-8 bg-[#ff5e14] rounded-full flex items-center justify-center z-10">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:pr-12 md:text-right'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#2f3241] to-[#394153] text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Join Us in Transforming Sport Accessibility in India</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Whether you're a casual player or a serious athlete, ArenaHub has the perfect venue for your sport of choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleVenueNavigation}
              className="bg-[#ff5e14] text-white px-8 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300 text-center"
            >
              Find a Venue
            </button>
            <button 
              onClick={handleContactNavigation}
              className="border border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#2f3241] transition-colors duration-300 text-center"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;