import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-light-gray">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo a info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-pure-white">
              FPV<span className="text-primary-red">Zóna</span>
            </Link>
            <p className="mt-4 text-sm">
              Najlepšie FPV dronové a cyklistické zábery z celého Slovenska. Objavte krásy našej krajiny z úplne novej perspektívy.
            </p>
          </div>
          
          {/* Navigácia */}
          <div>
            <h3 className="text-pure-white font-semibold text-lg mb-4">Rýchla navigácia</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-red transition duration-300">Domov</Link></li>
              <li><Link to="/about" className="hover:text-primary-red transition duration-300">O nás</Link></li>
              <li><Link to="/category/fpv" className="hover:text-primary-red transition duration-300">FPV Drony</Link></li>
              <li><Link to="/category/bike" className="hover:text-primary-red transition duration-300">Cyklotrasy</Link></li>
              <li><Link to="/contact" className="hover:text-primary-red transition duration-300">Kontaktujte nás</Link></li>
            </ul>
          </div>
          
          {/* Kontakt */}
          <div>
            <h3 className="text-pure-white font-semibold text-lg mb-4">Kde nás nájdete</h3>
            <ul className="space-y-2">
              <li>Email: info@fpvzona.sk</li>
              <li>Tel: +421 900 123 456</li>
              <li>Bratislava, Slovensko</li>
              <li className="mt-4">
                <Link to="/contact" className="text-primary-red hover:underline transition duration-300">
                  Napíšte nám →
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Sociálne siete */}
          <div>
            <h3 className="text-pure-white font-semibold text-lg mb-4">Sledujte naše dobrodružstvá</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-light-gray hover:text-primary-red transition duration-300">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-primary-red transition duration-300">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-primary-red transition duration-300">
                <FaYoutube className="text-2xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-primary-red transition duration-300">
                <FaTiktok className="text-2xl" />
              </a>
            </div>
            <p className="mt-4 text-sm">
              Pridajte sa k našej komunite nadšencov a zdieľajte vaše vlastné zážitky!
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FPVZóna. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 