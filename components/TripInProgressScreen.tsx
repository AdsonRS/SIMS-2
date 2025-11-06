
import React, { useState, useEffect } from 'react';

const TripInProgressScreen = ({ stationName, onEndTrip }) => {
  const [phase, setPhase] = useState('unlocking');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (phase === 'unlocking') {
      const timer1 = setTimeout(() => setPhase('unlocked'), 2000); // Simulate unlocking delay
      return () => clearTimeout(timer1);
    }
    if (phase === 'unlocked') {
      const timer2 = setTimeout(() => setPhase('in_progress'), 1500); // Show success message
      return () => clearTimeout(timer2);
    }
    if (phase === 'in_progress') {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secondsValue = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsValue}`;
  };

  const handleEndTrip = () => {
      setPhase('ended');
      setTimeout(() => {
          onEndTrip();
      }, 2000); // Show "ended" message for 2 seconds before returning to map
  };

  const renderContent = () => {
    switch (phase) {
      case 'unlocking':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">Desbloqueando...</h2>
            <p className="text-gray-600">Aguarde um momento.</p>
          </div>
        );
      case 'unlocked':
        return (
           <div className="text-center">
            <svg className="w-24 h-24 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 className="text-2xl font-bold text-green-600">Bicicleta Desbloqueada!</h2>
            <p className="text-gray-600">Retire na estação: {stationName}</p>
          </div>
        )
      case 'in_progress':
        return (
          <div className="text-center w-full max-w-xs">
            <h2 className="text-xl font-bold text-gray-800">Viagem em Andamento</h2>
            <p className="text-6xl font-mono font-bold text-purple-600 my-8 bg-purple-50 p-4 rounded-lg">{formatTime(seconds)}</p>
            <p className="text-sm text-gray-500 mb-8">Estação de partida: {stationName}</p>
            <button
              onClick={handleEndTrip}
              className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              Encerrar Viagem
            </button>
          </div>
        );
      case 'ended':
        return (
             <div className="text-center">
                <svg className="w-24 h-24 text-purple-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <h2 className="text-2xl font-bold text-purple-700">Bicicleta Recebida!</h2>
                <p className="text-gray-600">Obrigado por usar o SIMS UFMA.</p>
            </div>
        )
      default:
        return null;
    }
  }

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-4">
      {renderContent()}
    </div>
  );
};

export default TripInProgressScreen;
