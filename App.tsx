
import React, { useState } from 'react';
import { Screen } from './types.ts';
import Header from './components/Header.tsx';
import BottomNav from './components/BottomNav.tsx';
import MapScreen from './components/MapScreen.tsx';
import TripsScreen from './components/TripsScreen.tsx';
import WalletScreen from './components/WalletScreen.tsx';
import SettingsScreen from './components/SettingsScreen.tsx';
import QrScanner from './components/QrScanner.tsx';
import TripInProgressScreen from './components/TripInProgressScreen.tsx';
import { stationDataMap } from './data/stations.ts';
import ProfileScreen from './components/ProfileScreen.tsx';
import RankingScreen from './components/RankingScreen.tsx';

const App = () => {
  // Navigation State
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null); // 'wallet', 'trips', 'settings', 'ranking', 'profile'
  const [tripState, setTripState] = useState<'idle' | 'scanning' | 'active'>('idle');
  const [scannedStationId, setScannedStationId] = useState<string | null>(null);

  // Handlers
  const handleScanClick = () => setTripState('scanning');
  
  const handleScanSuccess = (stationId) => {
    setScannedStationId(stationId);
    setTripState('active');
  };

  const handleScanCancel = () => setTripState('idle');
  
  const handleEndTrip = () => {
    setScannedStationId(null);
    setTripState('idle');
  };

  const toggleOverlay = (screen) => {
    if (activeOverlay === screen) {
      setActiveOverlay(null); // Close if clicking same
    } else {
      setActiveOverlay(screen);
    }
  };

  const stationName = scannedStationId ? stationDataMap[scannedStationId] || "Estação Desconhecida" : "";

  // Main Render Logic
  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden flex flex-col">
      
      {/* 1. BACKGROUND LAYER: MAP (Always Visible) */}
      <div className="absolute inset-0 z-0">
        <MapScreen onStationClick={() => {}} />
      </div>

      {/* 2. HEADER LAYER (Floating) */}
      <div className={`absolute top-0 left-0 right-0 z-20 transition-transform duration-300 ${tripState !== 'idle' ? '-translate-y-full' : 'translate-y-0'}`}>
        <Header 
          onProfileClick={() => setActiveOverlay('profile')} 
          onRankingClick={() => setActiveOverlay('ranking')}
        />
      </div>

      {/* 3. CONTENT OVERLAYS (Slide Up) */}
      {/* Dimmer Background */}
      {activeOverlay && (
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity" 
          onClick={() => setActiveOverlay(null)}
        />
      )}

      {/* Sheet Container - Adjusted bottom padding for fixed nav */}
      <div 
        className={`absolute inset-x-0 bottom-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out flex flex-col max-h-[85vh] ${
          activeOverlay ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setActiveOverlay(null)}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer"></div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
          {activeOverlay === Screen.Wallet && <WalletScreen />}
          {activeOverlay === Screen.Trips && <TripsScreen />}
          {activeOverlay === Screen.Settings && <SettingsScreen />}
          {activeOverlay === 'profile' && <ProfileScreen onClose={() => setActiveOverlay(null)} />}
          {activeOverlay === 'ranking' && <RankingScreen />}
        </div>
      </div>

      {/* 4. FULL SCREEN MODES (Scanning / Trip) */}
      {tripState === 'scanning' && (
        <div className="absolute inset-0 z-50">
          <QrScanner onScanSuccess={handleScanSuccess} onCancel={handleScanCancel} />
        </div>
      )}

      {tripState === 'active' && (
        <div className="absolute inset-0 z-50 bg-white">
          <TripInProgressScreen stationName={stationName} onEndTrip={handleEndTrip} />
        </div>
      )}

      {/* 5. FIXED BOTTOM NAVIGATION (Classic Style) */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${tripState !== 'idle' ? 'translate-y-full' : 'translate-y-0'}`}>
        <BottomNav 
          activeScreen={activeOverlay || Screen.Map} 
          onNavigate={(screen) => {
             if (screen === Screen.Map) {
               setActiveOverlay(null);
             } else {
               toggleOverlay(screen);
             }
          }}
          onScan={handleScanClick}
        />
      </div>

    </div>
  );
};

export default App;
