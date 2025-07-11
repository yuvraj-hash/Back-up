import React, { useState } from 'react';

interface PremiumMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  { name: 'Silver', duration: '1 Month', price: '₹999', features: 'Basic premium benefits' },
  { name: 'Gold', duration: '3 Months', price: '₹2,499', features: '+ 2 Free Personal Training' },
  { name: 'Platinum', duration: '6 Months', price: '₹4,799', features: '+ Free Arena Merchandise' },
];

const PremiumMembershipModal: React.FC<PremiumMembershipModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    sport: '',
    startDate: '',
    payment: '',
  });
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipId('AH' + Math.floor(Math.random() * 1000000));
    setEndDate('...'); // Calculate based on plan
    setStep(3);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-[#ff5e14]" onClick={onClose}>&times;</button>
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-[#ff5e14]">Welcome to Arena Hub Premium!</h2>
            <p className="mb-6 text-gray-700">Unlock exclusive access to advanced facilities, priority bookings, expert coaching & more!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Unlimited Gym & Turf Access</div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Priority Booking for Sports Events</div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Free Access to Premium Fitness Classes</div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Personal Training (Monthly Sessions)</div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Arena Hub Merchandise</div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2"><span>✔</span> Exclusive Member Discounts</div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Membership Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {plans.map(plan => (
                <div key={plan.name} className="border rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                  <div className="text-lg font-bold text-[#2f3241] mb-1">{plan.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{plan.duration}</div>
                  <div className="text-2xl font-bold text-[#ff5e14] mb-2">{plan.price}</div>
                  <div className="text-xs text-gray-600 mb-3">{plan.features}</div>
                  <button className="bg-[#ff5e14] text-white px-4 py-2 rounded hover:bg-[#e54d00]" onClick={() => handlePlanSelect(plan.name)}>Choose Plan</button>
                </div>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Register for {selectedPlan} Plan</h3>
            <input name="name" required className="w-full border rounded px-3 py-2" placeholder="Full Name" value={form.name} onChange={handleInputChange} />
            <input name="email" required className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={handleInputChange} />
            <input name="phone" required className="w-full border rounded px-3 py-2" placeholder="Phone Number" value={form.phone} onChange={handleInputChange} />
            <select name="sport" required className="w-full border rounded px-3 py-2" value={form.sport} onChange={handleInputChange}>
              <option value="">Preferred Sport/Gym Focus</option>
              <option value="Swimming pool">Swimming pool (Chennai)</option>
              <option value="Gym">Gym (Chennai)</option>
              <option value="Cricket">Cricket (Chennai/Hyderabad)</option>
              <option value="Football turf">Football turf (Chennai/Hyderabad)</option>
              <option value="Badminton">Badminton (Chennai/Hyderabad)</option>
              <option value="Tennis">Tennis (Chennai/Hyderabad)</option>
              <option value="Basketball">Basketball (Chennai/Hyderabad)</option>
            </select>
            <input name="startDate" type="date" required className="w-full border rounded px-3 py-2" value={form.startDate} onChange={handleInputChange} />
            <select name="payment" required className="w-full border rounded px-3 py-2" value={form.payment} onChange={handleInputChange}>
              <option value="">Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
            <button type="submit" className="w-full bg-[#ff5e14] text-white py-2 rounded hover:bg-[#e54d00]">Proceed to Payment</button>
          </form>
        )}
        {step === 3 && success && (
          <div className="text-center">
            <div className="text-3xl mb-4">🎉 You’re officially a Premium Member!</div>
            <div className="mb-2">Membership ID: <span className="font-bold">{membershipId}</span></div>
            <div className="mb-2">Start Date: <span className="font-bold">{form.startDate}</span></div>
            <div className="mb-6">End Date: <span className="font-bold">{endDate}</span></div>
            <div className="flex flex-col gap-2 items-center">
              <button className="bg-[#ff5e14] text-white px-4 py-2 rounded hover:bg-[#e54d00]">Download Membership Card (PDF)</button>
              <button className="border border-[#ff5e14] text-[#ff5e14] px-4 py-2 rounded hover:bg-[#ff5e14] hover:text-white" onClick={onClose}>Go to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumMembershipModal;
