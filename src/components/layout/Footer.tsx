
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Care Hospital</h3>
                <p className="text-blue-200 text-sm">Excellence in Healthcare</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's leading healthcare provider. With modern technology and compassionate care, 
              we prioritize your health and wellbeing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-200">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Services
              </Link>
              <Link to="/doctors" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Doctors
              </Link>
              <Link to="/appointments" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Appointments
              </Link>
              <Link to="/portal" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Patient Portal
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-300 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-200">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-gray-300 text-sm">Emergency: 102</div>
                  <div className="text-gray-300 text-sm">+91 11 2345 6789</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">info@carehospital.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Sector 12, New Delhi - 110001</span>
              </div>
            </div>
          </div>

          {/* Hours & Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-200">Operating Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div className="text-sm">
                  <p className="text-gray-300">Emergency: 24/7</p>
                  <p className="text-gray-300">OPD: 9AM - 8PM</p>
                  <p className="text-gray-300">Lab: 7AM - 10PM</p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-blue-200 mb-2">Accepted Insurance</h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>CGHS • ECHS • ESI</div>
                  <div>Cashless Treatment Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition-colors">
                <Youtube className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © 2024 Care Hospital. All rights reserved. | 
              <span className="mx-2">NABH Accredited</span> | 
              <span className="mx-2">ISO 9001:2015 Certified</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
