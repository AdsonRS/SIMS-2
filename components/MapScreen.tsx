
import React, { useState } from 'react';

const stationsData = [
  {
    id: 1,
    name: 'Estação Biblioteca',
    availableBikes: 7,
    totalDocks: 8,
    position: { top: '10%', left: '75%' },
  },
  {
    id: 2,
    name: 'Estação RU',
    availableBikes: 3,
    totalDocks: 10,
    position: { top: '30%', left: '65%' },
  },
    {
    id: 3,
    name: 'Estação CCET',
    availableBikes: 5,
    totalDocks: 5,
    position: { top: '45%', left: '60%' },
  },
  {
    id: 4,
    name: 'Estação BICT',
    availableBikes: 4,
    totalDocks: 10,
    position: { top: '82%', left: '62%' },
  },
  {
    id: 5,
    name: 'Estação PF',
    availableBikes: 6,
    totalDocks: 10,
    position: { top: '52%', left: '22%' },
  },
];

const BikeIcon = ({ className }) => (
 <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM5 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0ZM19 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Zm-11-2.04a5.5 5.5 0 0 1 10.95.94L18.7 17.5h2.15l-1.95-3.51A4.5 4.5 0 0 0 15.5 11H8.83l-2.4-4.8A2 2 0 0 0 4.6 5H2V3h2.6a4 4 0 0 1 3.8 2.8l1.4 2.8H15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5h-1.54l-2.9 5.8a1.5 1.5 0 0 0 1.34 2.2h9.2a1.5 1.5 0 0 0 1.4-2.1L19.3 12.8A5.5 5.5 0 0 1 8 14.46Z"/>
  </svg>
);

// FIX: Explicitly type StationMarker as a React Functional Component to correctly handle the 'key' prop.
const StationMarker: React.FC<{ station: typeof stationsData[0]; onClick: () => void; }> = ({ station, onClick }) => (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ top: station.position.top, left: station.position.left }}
      onClick={onClick}
    >
        <div className="relative flex flex-col items-center">
            <div className="bg-white p-2 rounded-lg shadow-lg text-center min-w-[120px]">
                <p className="font-bold text-sm text-gray-800">{station.name}</p>
                <p className="text-xs text-gray-600">{station.availableBikes}/{station.totalDocks} disp.</p>
            </div>
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg mt-2 border-2 border-white">
                <BikeIcon className="w-6 h-6 text-white"/>
            </div>
        </div>
    </div>
);


const MapScreen = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  
  const mapImageUrl = 'https://i.imgur.com/mQ8RDu0.jpeg?q=80&w=1280&auto=format&fit=crop';

  return (
    <div className="h-full w-full relative">
      <img src={mapImageUrl} alt="Mapa do Campus" className="absolute top-0 left-0 w-full h-full object-cover" />
      
      {stationsData.map(station => (
        <StationMarker 
            key={station.id} 
            station={station} 
            onClick={() => setSelectedStation(station)} 
        />
      ))}

      {selectedStation && (
        <div 
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-11/12 bg-white p-4 rounded-lg shadow-xl z-20"
          onClick={() => setSelectedStation(null)}
        >
          <h3 className="font-bold text-lg">{selectedStation.name}</h3>
          <p className="text-gray-600">Bicicletas disponíveis: {selectedStation.availableBikes}/{selectedStation.totalDocks}</p>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
