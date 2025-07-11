import React, { useState } from 'react';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';

const Booking: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const [showFormError, setShowFormError] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    sport: '',
    date: '',
    time: '',
    players: '',
    duration: '',
    name: '',
    email: '',
    phone: ''
  });
  // Add state for price tab
  const [priceTab, setPriceTab] = useState<'pay' | 'member'>('pay');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  // Payment modal states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiApp, setUpiApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  // Add state for payment success/error and loading
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const sportDescriptions: Record<string, string> = {
  football: '₹150 per person for up to 2 hours. Maximum: 22 players (11 vs 11). Equipment & sportswear available for rent. Membership options available.',
  cricket: '₹200 per person for up to 2 hours. Maximum: 22 players (11 vs 11). Equipment & sportswear available for rent. Membership options available.',
  basketball: '₹150 per person for up to 2 hours. Maximum: 10 players (5 vs 5). Equipment & sportswear available for rent. Membership options available.',
  badminton: '₹100 per person for up to 2 hours. Maximum: 4 players (2 vs 2). Equipment & sportswear available for rent. Membership options available.',
  tennis: '₹100 per person for up to 2 hours. Maximum: 4 players (2 vs 2). Equipment & sportswear available for rent. Membership options available.',
  gym: '₹200 per person for up to 2 hours. Fitness gear and gym attire available for rent. Membership options available.',
  swimming: '₹200 per person for up to 2 hours. Swimwear and safety gear available for rent. Membership options available.'
};

  // Non-member and membership prices
  const nonMemberPrices: Record<string, string> = {
    football: '₹150 per person for up to 2 hours',
    cricket: '₹200 per person for up to 2 hours',
    basketball: '₹150 per person for up to 2 hours',
    badminton: '₹100 per person for up to 2 hours',
    tennis: '₹100 per person for up to 2 hours',
    gym: '₹200 per person for up to 2 hours',
    swimming: '₹200 per person for up to 2 hours'
  };
  const memberPrices: Record<string, string> = {
    football: '₹1,800/month (up to 3 sessions/week included)',
    cricket: '₹2,400/month (up to 3 sessions/week included)',
    basketball: '₹1,800/month (unlimited access during open hours)',
    badminton: '₹1,200/month (unlimited access during open hours)',
    tennis: '₹1,200/month (unlimited access during open hours)',
    gym: '₹2,000/month (unlimited daily access up to 2 hours/day)',
    swimming: '₹2,000/month (unlimited daily access up to 2 hours/day)'
  };

  // Validation for name, email, phone
  const validateName = (name: string) => /^[a-zA-Z ]{2,50}$/.test(name);
  const validateEmail = (email: string) => /^(?=.{6,254}$)([a-zA-Z0-9._%+-]{1,64})@(gmail\.com|yahoo\.(com|co\.in)|outlook\.com|hotmail\.com|icloud\.com|protonmail\.com)$/.test(email);
  const validatePhone = (phone: string) => /^(?:\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/.test(phone);

  // Inline error states for personal info
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Helper: Reset all form and modal states
  const resetAll = () => {
    setSelectedSport('');
    setShowFormError(false);
    setFormData({
      location: '',
      sport: '',
      date: '',
      time: '',
      players: '',
      duration: '',
      name: '',
      email: '',
      phone: ''
    });
    setPriceTab('pay');
    setShowConfirmModal(false);
    setShowPayModal(false);
    setFormValidated(false);
    setPaymentMethod('card');
    setCardName('');
    setCardNumber('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    setUpiApp('');
    setUpiId('');
    setBank('');
    setPaymentStatus('idle');
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    setNameError(''); setEmailError(''); setPhoneError('');
    if (!selectedSport) {
      setShowFormError(true);
      const sportSection = document.getElementById('sport-selection');
      if (sportSection) {
        sportSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (!validateName(formData.name)) {
      setNameError('Please enter a valid name (letters and spaces only, 2-50 characters).');
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address (gmail, yahoo, outlook, hotmail, icloud, protonmail only).');
      valid = false;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid Indian phone number.');
      valid = false;
    }
    // Date validation: prevent past dates
    if (formData.date && new Date(formData.date) < new Date(new Date().toDateString())) {
      alert('Please select a valid date (today or future).');
      return;
    }
    if (!valid) return;
    setFormValidated(true);
    setShowConfirmModal(true);
  };

  // Payment form submit handler
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus('idle');
    setTimeout(() => {
      // Simulate payment success/failure
      if (
        (paymentMethod === 'card' && cardName && cardNumber.length >= 16 && expiryMonth && expiryYear && cvv) ||
        (paymentMethod === 'upi' && upiApp && upiId) ||
        (paymentMethod === 'netbanking' && bank)
      ) {
        setPaymentStatus('success');
        setLoading(false);
        setTimeout(() => {
          resetAll();
        }, 2000);
      } else {
        setPaymentStatus('error');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=compress&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Sports Venue</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Choose from our premium sports facilities in Chennai and Hyderabad
          </p>
        </div>
      </div>

      {/* Sport Selection Section */}
      <div id="sport-selection" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-[#2f3241] mb-8">
          Let the Games Begin – Select Your Sport or Workout Option
        </h2>
        {/* Arrange sports in 2 rows: 1st row 4 sports, 2nd row 3 sports */}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {[
              { id: 'football', name: 'Football', image: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=300' }, // Football match
              { id: 'cricket', name: 'Cricket', image: '/cricket.jpeg' }, // Use correct local public image
              { id: 'basketball', name: 'Basketball', image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'badminton', name: 'Badminton', image: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=300' }
            ].map(sport => (
              <div
                key={sport.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 ${
                  selectedSport === sport.id ? 'ring-4 ring-[#ff5e14] scale-105' : ''
                }`}
                onClick={() => {
                  setSelectedSport(sport.id);
                  setFormData(prev => ({ ...prev, sport: sport.id }));
                  setShowFormError(false);
                }}
              >
                <img 
                  src={sport.image} 
                  alt={sport.name}
                  className="w-full h-32 object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
                  <h3 className="font-semibold">{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'tennis', name: 'Tennis', image: 'https://images.pexels.com/photos/8224728/pexels-photo-8224728.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'swimming', name: 'Swimming Pool', image: 'https://images.pexels.com/photos/261185/pexels-photo-261185.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'gym', name: 'Gym', image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=300' }
            ].map(sport => (
              <div
                key={sport.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 ${
                  selectedSport === sport.id ? 'ring-4 ring-[#ff5e14] scale-105' : ''
                }`}
                onClick={() => {
                  setSelectedSport(sport.id);
                  setFormData(prev => ({ ...prev, sport: sport.id }));
                  setShowFormError(false);
                }}
              >
                <img 
                  src={sport.image} 
                  alt={sport.name}
                  className="w-full h-32 object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
                  <h3 className="font-semibold">{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedSport && (
          <div className="text-center mt-8">
            <p className="text-xl font-medium text-[#ff5e14]">
              Selected Sport: {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
            </p>
          </div>
        )}
        {showFormError && (
          <div className="mt-8 text-center text-red-600 bg-red-100 p-4 rounded-md">
            Please select a sport to continue
          </div>
        )}
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Price/Membership Tab Switcher */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              className={`px-6 py-2 rounded-l-md font-semibold border border-[#ff5e14] focus:outline-none transition-colors duration-200 ${priceTab === 'pay' ? 'bg-[#ff5e14] text-white' : 'bg-white text-[#ff5e14]'}`}
              onClick={() => setPriceTab('pay')}
              aria-pressed={priceTab === 'pay'}
            >
              Pay Per Use
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-r-md font-semibold border-t border-b border-r border-[#ff5e14] focus:outline-none transition-colors duration-200 ${priceTab === 'member' ? 'bg-[#ff5e14] text-white' : 'bg-white text-[#ff5e14]'}`}
              onClick={() => setPriceTab('member')}
              aria-pressed={priceTab === 'member'}
            >
              Membership
            </button>
          </div>
          {/* Pricing Info */}
          {selectedSport && (
            <div className="mb-6 text-center">
              <span className="inline-block px-4 py-2 rounded bg-gray-100 text-[#ff5e14] font-semibold text-base">
                {priceTab === 'pay' ? nonMemberPrices[selectedSport] : memberPrices[selectedSport]}
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selected Sport (read-only) - now first */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Sport
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  value={selectedSport ? (selectedSport === 'swimming' ? 'Swimming Pool' : selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)) : ''}
                  readOnly
                  tabIndex={-1}
                  placeholder="Select your sport above"
                />
              </div>
              {/* Location - now second */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Location
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={formData.location}
                  onChange={(e) => {
                    if ((selectedSport === 'swimming' || selectedSport === 'gym') && e.target.value === 'hyderabad') {
                      setFormData({...formData, location: ''});
                      setShowFormError(true);
                      return;
                    }
                    setFormData({...formData, location: e.target.value});
                    setShowFormError(false);
                  }}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="chennai">Chennai Central</option>
                  <option value="hyderabad" disabled={selectedSport === 'swimming' || selectedSport === 'gym'}>Hyderabad Jubilee Hills</option>
                </select>
                {(selectedSport === 'swimming' || selectedSport === 'gym') && formData.location === 'hyderabad' && (
                  <span className="text-xs text-red-500">Location not available for this sport.</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  Time Slot
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="8-10">8:00 AM - 10:00 AM</option>
                  <option value="10-12">10:00 AM - 12:00 PM</option>
                  <option value="12-14">12:00 PM - 2:00 PM</option>
                  <option value="14-16">2:00 PM - 4:00 PM</option>
                  <option value="16-18">4:00 PM - 6:00 PM</option>
                  <option value="18-20">6:00 PM - 8:00 PM</option>
                  <option value="20-21">8:00 PM - 9:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  Date
                </label>
                <input 
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Number of Players
                </label>
                <input 
                  type="number"
                  min={(selectedSport && ['tennis','cricket','football','basketball','badminton'].includes(selectedSport)) ? 2 : 1}
                  max={(() => {
                    switch(selectedSport) {
                      case 'football': return 22;
                      case 'cricket': return 22;
                      case 'basketball': return 10;
                      case 'badminton': return 4;
                      case 'tennis': return 4;
                      case 'gym': return 15;
                      case 'swimming': return 15;
                      default: return 99;
                    }
                  })()}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  placeholder="Enter number of players"
                  value={formData.players}
                  onChange={(e) => setFormData({...formData, players: e.target.value})}
                  required
                  disabled={priceTab === 'member'}
                />
                {selectedSport && priceTab === 'member' && Number(formData.players) > 1 && (
                  <p className="text-xs text-orange-600 mt-1">Membership is for a single person only. Charges applicable for non-member guest access.</p>
                )}
                {selectedSport && formData.players && Number(formData.players) > ((() => {
                  switch(selectedSport) {
                    case 'football': return 22;
                    case 'cricket': return 22;
                    case 'basketball': return 10;
                    case 'badminton': return 4;
                    case 'tennis': return 4;
                    case 'gym': return 15;
                    case 'swimming': return 15;
                    default: return 99;
                  }
                })()) && (
                  <p className="text-xs text-red-500 mt-1">Maximum players for {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} is {(() => {
                    switch(selectedSport) {
                      case 'football': return 22;
                      case 'cricket': return 22;
                      case 'basketball': return 10;
                      case 'badminton': return 4;
                      case 'tennis': return 4;
                      case 'gym': return 15;
                      case 'swimming': return 15;
                      default: return 99;
                    }
                  })()}.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  Duration
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="4">4 Hours</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text"
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent ${nameError ? 'border-red-500' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => { setFormData({...formData, name: e.target.value}); setNameError(''); }}
                    required
                    aria-invalid={!!nameError}
                    aria-describedby="name-error"
                  />
                  {nameError && <span id="name-error" className="text-xs text-red-500">{nameError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email"
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent ${emailError ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => { setFormData({...formData, email: e.target.value}); setEmailError(''); }}
                    required
                    aria-invalid={!!emailError}
                    aria-describedby="email-error"
                  />
                  {emailError && <span id="email-error" className="text-xs text-red-500">{emailError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent ${phoneError ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => { setFormData({...formData, phone: e.target.value}); setPhoneError(''); }}
                    required
                    aria-invalid={!!phoneError}
                    aria-describedby="phone-error"
                  />
                  {phoneError && <span id="phone-error" className="text-xs text-red-500">{phoneError}</span>}
                </div>
              </div>
            </div>

            {/* Total Bookings Calculation */}
            <div className="md:col-span-2 text-right text-lg font-semibold text-[#2f3241]">
              Total Bookings: {(() => {
                if (!selectedSport || !formData.players || !formData.duration) return '₹0';
                const players = parseInt(formData.players, 10);
                const duration = parseInt(formData.duration, 10);
                if (isNaN(players) || isNaN(duration)) return '₹0';
                if (priceTab === 'pay') {
                  let pricePerPerson = 0;
                  switch(selectedSport) {
                    case 'football': pricePerPerson = 150; break;
                    case 'cricket': pricePerPerson = 200; break;
                    case 'basketball': pricePerPerson = 150; break;
                    case 'badminton': pricePerPerson = 100; break;
                    case 'tennis': pricePerPerson = 100; break;
                    case 'gym': pricePerPerson = 200; break;
                    case 'swimming': pricePerPerson = 200; break;
                    default: pricePerPerson = 0;
                  }
                  const sessionBlock = 2;
                  const blocks = Math.ceil(duration/sessionBlock);
                  const total = pricePerPerson * players * blocks;
                  return `₹${total}`;
                } else {
                  // Membership: 1 member + (guests if any)
                  let memberFee = 0;
                  let guestFee = 0;
                  let guestCount = Math.max(0, players - 1);
                  switch(selectedSport) {
                    case 'football': memberFee = 1800; guestFee = 150; break;
                    case 'cricket': memberFee = 2400; guestFee = 200; break;
                    case 'basketball': memberFee = 1800; guestFee = 150; break;
                    case 'badminton': memberFee = 1200; guestFee = 100; break;
                    case 'tennis': memberFee = 1200; guestFee = 100; break;
                    case 'gym': memberFee = 2000; guestFee = 200; break;
                    case 'swimming': memberFee = 2000; guestFee = 200; break;
                    default: memberFee = 0; guestFee = 0;
                  }
                  const sessionBlock = 2;
                  const blocks = Math.ceil(duration/sessionBlock);
                  const guestTotal = guestFee * guestCount * blocks;
                  if (guestCount > 0) {
                    return `₹${memberFee}/month + ₹${guestTotal} (guest access)`;
                  } else {
                    return `₹${memberFee}/month`;
                  }
                }
              })()}
            </div>

            <div className="flex justify-end gap-4 mt-4 md:col-span-2">
              <button 
                type="submit"
                style={{ fontSize: '1rem', padding: '10px 20px', background: '#22c55e', color: 'white', borderRadius: '0.375rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5em' }}
                className="hover:bg-green-700 transition-colors duration-300"
                disabled={(selectedSport === 'swimming' || selectedSport === 'gym') && formData.location === 'hyderabad'}
              >
                Confirm Booking
              </button>
              <button 
                type="button"
                className="px-8 py-3 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500 transition-colors duration-300"
                onClick={resetAll}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Facility Features */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedSport === 'gym' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Gym Facilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• State-of-the-art equipment</li>
                  <li>• Personal trainers available</li>
                  <li>• Cardio section</li>
                  <li>• Weight training area</li>
                  <li>• Locker rooms</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Membership Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free fitness assessment</li>
                  <li>• Workout plan</li>
                  <li>• Access to all equipment</li>
                  <li>• Shower facilities</li>
                  <li>• Fitness tracking</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Additional Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Nutrition guidance</li>
                  <li>• Group classes</li>
                  <li>• Supplements store</li>
                  <li>• Towel service</li>
                  <li>• Parking facility</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Venue Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional grade facilities</li>
                  <li>• Well-maintained courts/fields</li>
                  <li>• Floodlights for evening games</li>
                  <li>• Equipment rental available</li>
                  <li>• First aid support</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Amenities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Changing rooms</li>
                  <li>• Shower facilities</li>
                  <li>• Drinking water</li>
                  <li>• Seating area</li>
                  <li>• Parking space</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#2f3241]">Support</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-center">
                    <span className="w-8">📞</span> +91 9876543210
                  </p>
                  <p className="flex items-center">
                    <span className="w-8">✉️</span> support@arenahub.com
                  </p>
                  <p className="flex items-center">
                    <span className="w-8">⏰</span> 8 AM - 9 PM (Daily)
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div className="text-center w-full max-w-lg mx-auto p-6" style={{ minWidth: 340, maxWidth: 480 }}>
          <h2 className="text-2xl font-bold mb-4 text-[#2f3241]">Booking Confirmed!</h2>
          <p className="mb-2">Thank you, {formData.name}, for booking <span className="font-semibold">{selectedSport ? (selectedSport === 'swimming' ? 'Swimming Pool' : selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)) : ''}</span>.</p>
          <p className="mb-2">We have received your booking details and will contact you soon.</p>
          <p className="mb-4 text-orange-600 font-medium">Booking will be treated as Pay on Spot.</p>
          {(selectedSport === 'swimming' || selectedSport === 'gym') && formData.location === 'hyderabad' && (
            <div className="mt-4 mb-2 p-3 bg-red-100 border border-red-200 rounded text-red-700 text-sm">
              Location not available for this sport.
            </div>
          )}
          <div className="mt-4 mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-900 text-sm">
            <strong>Note:</strong> To secure your slot, complete the online payment at the earliest — priority is given to the first successful payment. If someone else books the same slot and pays before you, your booking may be canceled, including for on-spot registrations.
          </div>
          <button className="mt-6 px-6 py-2 bg-[#ff5e14] text-white rounded-md mr-4" onClick={() => setShowConfirmModal(false)}>Close</button>
          <button
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md"
            onClick={() => { setShowConfirmModal(false); setShowPayModal(true); }}
            disabled={(selectedSport === 'swimming' || selectedSport === 'gym') && formData.location === 'hyderabad'}
          >
            Pay
          </button>
        </div>
      </Modal>
      {/* Payment Modal */}
      <Modal open={showPayModal} onClose={() => setShowPayModal(false)}>
        <div className="w-full max-w-2xl mx-auto p-4" style={{ minWidth: 420, maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 className="text-2xl font-bold mb-4 text-[#2f3241] text-center">Booking Payment</h2>
          <form className="space-y-4" onSubmit={handlePayment}>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="col-span-2 md:col-span-1">
                <label className="font-medium text-gray-700">Sport:</label>
                <span className="ml-2 text-gray-900">{selectedSport ? (selectedSport === 'swimming' ? 'Swimming Pool' : selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)) : ''}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="font-medium text-gray-700">Name:</label>
                <span className="ml-2 text-gray-900">{formData.name}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="font-medium text-gray-700">Email:</label>
                <span className="ml-2 text-gray-900">{formData.email}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="font-medium text-gray-700">Phone:</label>
                <span className="ml-2 text-gray-900">{formData.phone}</span>
              </div>
              <div className="col-span-2">
                <label className="font-medium text-gray-700">Amount to Pay:</label>
                <span className="ml-2 font-bold text-[#ff5e14] text-lg">{(() => {
                  if (!selectedSport || !formData.players || !formData.duration) return '₹0';
                  const players = parseInt(formData.players, 10);
                  const duration = parseInt(formData.duration, 10);
                  if (isNaN(players) || isNaN(duration)) return '₹0';
                  if (priceTab === 'pay') {
                    let pricePerPerson = 0;
                    switch(selectedSport) {
                      case 'football': pricePerPerson = 150; break;
                      case 'cricket': pricePerPerson = 200; break;
                      case 'basketball': pricePerPerson = 150; break;
                      case 'badminton': pricePerPerson = 100; break;
                      case 'tennis': pricePerPerson = 100; break;
                      case 'gym': pricePerPerson = 200; break;
                      case 'swimming': pricePerPerson = 200; break;
                      default: pricePerPerson = 0;
                    }
                    const sessionBlock = 2;
                    const blocks = Math.ceil(duration/sessionBlock);
                    const total = pricePerPerson * players * blocks;
                    return `₹${total}`;
                  } else {
                    let memberFee = 0;
                    let guestFee = 0;
                    let guestCount = Math.max(0, players - 1);
                    switch(selectedSport) {
                      case 'football': memberFee = 1800; guestFee = 150; break;
                      case 'cricket': memberFee = 2400; guestFee = 200; break;
                      case 'basketball': memberFee = 1800; guestFee = 150; break;
                      case 'badminton': memberFee = 1200; guestFee = 100; break;
                      case 'tennis': memberFee = 1200; guestFee = 100; break;
                      case 'gym': memberFee = 2000; guestFee = 200; break;
                      case 'swimming': memberFee = 2000; guestFee = 200; break;
                      default: memberFee = 0; guestFee = 0;
                    }
                    const sessionBlock = 2;
                    const blocks = Math.ceil(duration/sessionBlock);
                    const guestTotal = guestFee * guestCount * blocks;
                    if (guestCount > 0) {
                      return `₹${memberFee}/month + ₹${guestTotal} (guest access)`;
                    } else {
                      return `₹${memberFee}/month`;
                    }
                  }
                })()}</span>
              </div>
            </div>
            {/* Payment Method Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as 'card' | 'upi' | 'netbanking')}>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
              {paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on Card" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} required pattern="[0-9 ]{16,19}" />
                    {cardNumber && !/^([0-9]{4} ?){4,5}$/.test(cardNumber) && <span className="text-xs text-red-500">Enter a valid card number</span>}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={expiryMonth} onChange={e => setExpiryMonth(e.target.value)} placeholder="MM" maxLength={2} required pattern="0[1-9]|1[0-2]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={expiryYear} onChange={e => setExpiryYear(e.target.value)} placeholder="YY" maxLength={2} required pattern="[0-9]{2}" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="password" className="w-full p-2 border border-gray-300 rounded-md" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" maxLength={4} required pattern="[0-9]{3,4}" />
                    </div>
                  </div>
                </>
              )}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI App</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" value={upiApp} onChange={e => setUpiApp(e.target.value)}>
                      <option value="">Select UPI App</option>
                      <option value="gpay">Google Pay</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="paytm">Paytm</option>
                      <option value="bhim">BHIM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="Enter UPI ID" required={paymentMethod==='upi'} />
                  </div>
                </div>
              )}
              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md" value={bank} onChange={e => setBank(e.target.value)}>
                    <option value="">Select Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="yes">Yes Bank</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </div>
            <div className="space-y-3 mt-6">
              <button type="submit" className="w-full px-6 py-3 bg-[#ff5e14] text-white rounded-md font-semibold hover:bg-[#e54d00] transition-colors duration-300">Proceed to Checkout</button>
              <button type="button" className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-md" onClick={() => setShowPayModal(false)}>Cancel</button>
              {paymentStatus === 'success' && <div className="text-green-600 text-center font-semibold mt-2">Payment Successful! Booking Confirmed.</div>}
              {paymentStatus === 'error' && <div className="text-red-600 text-center font-semibold mt-2">Payment Failed. Please check your details.</div>}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Booking;
