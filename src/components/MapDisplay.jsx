import React from 'react';

const MapDisplay = ({ location }) => {
  // V reálnej aplikácii by si tu inicializoval Google Maps API alebo Mapy.cz API
  // a zobrazil mapu s markerom na `location.lat`, `location.lng`.
  // Potrebuješ API kľúče a príslušné knižnice (napr. @react-google-maps/api).

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 h-64 flex flex-col items-center justify-center text-center border border-gray-600">
       <p className="text-lg font-semibold mb-2">Mapa lokality</p>
       <p className="text-sm text-light-gray">Zobrazuje lokalitu: <span className="font-bold text-pure-white">{location.name}</span></p>
       <p className="text-xs text-light-gray mt-2">(Zemepisná šírka: {location.lat.toFixed(4)}, Zemepisná dĺžka: {location.lng.toFixed(4)})</p>
       <div className="mt-4 mb-2 bg-primary-dark/50 p-2 rounded w-full max-w-xs">
         <p className="text-xs text-primary-red/80">V plnej verzii tu bude interaktívna mapa</p>
         <button className="mt-2 text-xs bg-primary-red/20 hover:bg-primary-red text-white px-3 py-1 rounded transition-colors duration-300">
           Zobraziť celú mapu
         </button>
       </div>
       <p className="text-xs text-light-gray italic">Túto lokalitu navštívilo už 128 ľudí</p>
    </div>
  );
};

export default MapDisplay; 