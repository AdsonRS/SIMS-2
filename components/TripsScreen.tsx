
import React from 'react';

const mockTrips = [
  { id: '1', date: '25 de Out, 2024', duration: '15 min', distance: '2.1 km', cost: 'R$ 1,50' },
  { id: '2', date: '24 de Out, 2024', duration: '22 min', distance: '3.5 km', cost: 'R$ 2,20' },
  { id: '3', date: '23 de Out, 2024', duration: '8 min', distance: '1.2 km', cost: 'R$ 0,80' },
  { id: '4', date: '21 de Out, 2024', duration: '30 min', distance: '4.8 km', cost: 'R$ 3,00' },
];

// FIX: Explicitly type TripCard as a React Functional Component to correctly handle the 'key' prop.
const TripCard: React.FC<{ trip: typeof mockTrips[0] }> = ({ trip }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-gray-800">{trip.date}</p>
            <p className="text-lg font-bold text-purple-600">{trip.cost}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
            <span>Duração: {trip.duration}</span>
            <span>Distância: {trip.distance}</span>
        </div>
    </div>
);


const TripsScreen = () => {
  const totalSpent = mockTrips.reduce((sum, trip) => {
    const costValue = parseFloat(trip.cost.replace('R$ ', '').replace(',', '.'));
    return sum + (isNaN(costValue) ? 0 : costValue);
  }, 0);

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
          <p className="text-sm text-gray-600">Gasto nos últimos 30 dias</p>
          <p className="text-3xl font-bold text-purple-600">R$ {totalSpent.toFixed(2).replace('.', ',')}</p>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Viagens</h1>
      <div className="space-y-4">
        {mockTrips.length > 0 ? (
          mockTrips.map(trip => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <p className="text-center text-gray-500 mt-8">Nenhuma viagem registrada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default TripsScreen;
