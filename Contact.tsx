import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Here you would normally send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div>
      {/* Header Section */}
      <section 
        className="relative bg-cover bg-center py-24" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to our team for prompt and friendly service.
          </p>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-[#ff5e14]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Anna Salai, Chennai, TN 600002</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-[#ff5e14]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+91 9876543210</p>
              <p className="text-gray-600">+91 9876543211</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#ff5e14]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">info@arenahub.com</p>
              <p className="text-gray-600">support@arenahub.com</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-[#ff5e14]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
              <p className="text-gray-600">Monday - Sunday</p>
              <p className="text-gray-600">8:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Send Us a Message</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {submitted && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14]"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center bg-[#ff5e14] text-white py-3 px-6 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7742075562127!2d80.2691143!3d13.0568046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f4eaaaaaaa%3A0xaaaaaaaaaaaaaaaa!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1635234567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen 
                loading="lazy"
                title="Arena Hub Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-4 hover:bg-gray-100">
                  <span>How do I book a venue?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 p-4 pt-0">
                  You can book a venue through our website by navigating to the "Book Now" page. Select your preferred location, sport, date, and time slot, then follow the prompts to complete your booking.
                </p>
              </details>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-4 hover:bg-gray-100">
                  <span>What is your cancellation policy?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 p-4 pt-0">
                  Cancellations made at least 24 hours before the scheduled booking time are eligible for a full refund. Cancellations made less than 24 hours in advance may be subject to a cancellation fee.
                </p>
              </details>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-4 hover:bg-gray-100">
                  <span>Do you provide equipment for rental?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 p-4 pt-0">
                  Yes, we offer equipment rental for most sports at an additional cost. You can add equipment rental during the booking process or request it when you arrive at the venue.
                </p>
              </details>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-4 hover:bg-gray-100">
                  <span>How can I host a tournament at your venues?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 p-4 pt-0">
                  For tournament hosting, please contact our events team directly at events@arenahub.com or call us at +91 9876543210. We offer comprehensive tournament packages including venue booking, equipment, and organizational support.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;