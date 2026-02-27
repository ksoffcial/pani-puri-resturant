import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  PhoneCall, 
  Utensils, 
  ArrowRight 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mx-4 md:mx-10 border-slate-100 text-slate-600">
      {/* Upper Footer: Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Section 1: Brand Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-xl">
                <Utensils className="text-white w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                SHUBHAM <span className="text-orange-500">PANI PURI</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed">
              "Fresh & Tasty Pani Puri Every Day" <br />
              Bringing the authentic street flavors of Purnia with a touch of hygiene and love.
            </p>
            <div className="flex gap-3 pt-2">
              <button className="btn btn-circle btn-sm btn-ghost bg-slate-50 hover:bg-orange-100 hover:text-orange-600 transition-all">
                <Instagram size={18} />
              </button>
              <button className="btn btn-circle btn-sm btn-ghost bg-slate-50 hover:bg-blue-100 hover:text-blue-600 transition-all">
                <Facebook size={18} />
              </button>
              <button className="btn btn-circle btn-sm btn-ghost bg-slate-50 hover:bg-green-100 hover:text-green-600 transition-all">
                <PhoneCall size={18} />
              </button>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" /> Visit Us
            </h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-slate-800">Food Park, Shop No. 24</p>
              <p>Girja Chowk, Purnia</p>
              <p>Bihar – 854301, India</p>
              <a href="#" className="inline-flex items-center gap-1 text-orange-500 font-medium mt-2 hover:underline">
                Open in Maps <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Section 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Phone size={16} className="text-orange-500" /> Contact
            </h3>
            <div className="space-y-2">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Owner</p>
                <p className="text-slate-800 font-bold">Rajesh Kumar</p>
              </div>
              <a href="tel:+919279229493" className="block text-lg font-black text-slate-800 hover:text-orange-500 transition-colors">
                +91 9279229493
              </a>
            </div>
          </div>

          {/* Section 4: Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Clock size={16} className="text-orange-500" /> Opening Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-1">
                <span className="font-medium">Mon – Sat</span>
                <span className="text-slate-800">10:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between text-orange-600 font-bold">
                <span>Sunday</span>
                <span>11:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 py-6 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 text-center md:text-left">
            © {currentYear} <span className="text-slate-800">Shubham Pani Puri</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;