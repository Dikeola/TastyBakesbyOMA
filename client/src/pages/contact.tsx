import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactCustomOrder() {
  const [image, setImage] = useState('');
  const [customizations, setCustomizations] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const img = params.get('img');
    if (img) setImage(img);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    alert('Custom order submitted!');
  };

  return (
    <div className="min-h-screen bg-bakery-off-white flex items-center justify-center py-16">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <h1 className="font-playfair text-3xl font-bold text-bakery-brown mb-6 text-center">Custom Order Request</h1>
        {image && (
          <div className="flex justify-center mb-6">
            <img src={image} alt="Selected product" className="w-40 h-40 object-cover rounded-xl shadow" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-bakery-brown font-semibold mb-1">Customizations</label>
            <Textarea
              value={customizations}
              onChange={e => setCustomizations(e.target.value)}
              placeholder="Describe your customizations (flavor, color, message, etc.)"
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-bakery-brown font-semibold mb-1">Preferred Delivery Date</label>
            <Input
              type="date"
              value={deliveryDate}
              onChange={e => setDeliveryDate(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-bakery-brown font-semibold mb-1">Preferred Contact Method</label>
            <select
              value={contactMethod}
              onChange={e => setContactMethod(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div>
            <label className="block text-bakery-brown font-semibold mb-1">
              {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <Input
              type={contactMethod === 'email' ? 'email' : 'tel'}
              value={contactValue}
              onChange={e => setContactValue(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-bakery-chocolate hover:bg-bakery-brown text-white py-3 text-lg font-semibold mt-4">
            Submit Custom Order
          </Button>
        </form>
      </div>
    </div>
  );
} 