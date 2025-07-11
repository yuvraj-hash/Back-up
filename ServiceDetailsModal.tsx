import React from 'react';
import { X } from 'lucide-react';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    features: string[];
    image: string;
  };
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-2xl shadow-xl">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img 
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{service.title}</h2>
          </div>

          <div className="p-6">
            <p className="text-gray-600 text-lg mb-4">{service.description}</p>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#2f3241]">Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-[#ff5e14] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1 text-[#2f3241]">Operating Hours</h4>
                  <p className="text-gray-600 text-sm">Monday - Sunday<br />8:00 AM - 9:00 PM</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1 text-[#2f3241]">Contact Support</h4>
                  <p className="text-gray-600 text-sm">
                    Phone: +91 9876543210<br />
                    Email: support@arenahub.com
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1 text-[#2f3241]">Locations</h4>
                  <p className="text-gray-600 text-sm">Chennai Central<br />Hyderabad Jubilee Hills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;