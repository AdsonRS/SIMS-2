import React from 'react';

const mockTrips = [
  { id: '1', date: '25 Out', time: '14:30', duration: '15 min', distance: '2.1 km', cost: 'R$ 1,50', type: 'Normal' },
  { id: '2', date: '24 Out', time: '09:15', duration: '22 min', distance: '3.5 km', cost: 'R$ 2,20', type: 'Normal' },
  { id: '3', date: '23 Out', time: '18:45', duration: '8 min', distance: '1.2 km', cost: 'Grátis', type: 'Estudante' },
  { id: '4', date: '21 Out', time: '08:00', duration: '30 min', distance: '4.8 km', cost: 'R$ 3,00', type: 'Normal' },
];

const TripItem: React.FC<{ trip: typeof mockTrips[0], isLast: boolean }> = ({ trip, isLast }) => (
    <div className="flex gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-purple-600 rounded-full ring-4 ring-purple-100"></div>
            {!isLast && <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-800">{trip.date}</span>
                        <span className="text-xs text-gray-500">• {trip.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                             <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13.414 12z"/></svg>
                             {trip.duration}
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                             <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a2.25 2.25 0 00.286-.18c1.27-1.106 2.87-2.922 4.14-5.043C17.645 15.28 18 13.622 18 12a6 6 0 10-12 0c0 1.622.355 3.28 1.002 4.932 1.27 2.12 2.87 3.936 4.14 5.043.1.086.195.15.286.18zM12 9a3 3 0 100 6 3 3 0 000-6z"/></svg>
                             {trip.distance}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`font-bold ${trip.cost === 'Grátis' ? 'text-green-600' : 'text-purple-600'}`}>{trip.cost}</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">{trip.type}</p>
                </div>
            </div>
        </div>
    </div>
);


const TripsScreen = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Histórico</h2>
      
      <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg mb-6 flex justify-between items-center">
          <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Distância Total (Out)</p>
              <p className="text-3xl font-bold mt-1">11.6 <span className="text-lg text-gray-500 font-normal">km</span></p>
          </div>
           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19.071 4.929a9.936 9.936 0 0 0-7.07-2.938 9.994 9.994 0 0 0-8.182 4.172l1.536 1.284A8.001 8.001 0 0 1 12 4.009c2.14 0 4.152.834 5.664 2.348l-2.028 2.028H21.5V2.5l-2.429 2.429zM2.5 15.636H8.364l-2.028 2.028A7.945 7.945 0 0 1 4 11.992c0-2.316.985-4.396 2.56-5.895l-1.534-1.285A9.94 9.94 0 0 0 2 11.992c0 2.92.836 5.617 2.929 7.071L2.5 21.5v-5.864z"/></svg>
           </div>
      </div>

      <div className="mt-2">
        {mockTrips.map((trip, idx) => (
            <TripItem key={trip.id} trip={trip} isLast={idx === mockTrips.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default TripsScreen;