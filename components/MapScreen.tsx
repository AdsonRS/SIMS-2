
import React, { useState, useRef, useEffect } from 'react';

// Hardcoded stations
const stationsData = [
  {
    id: 1,
    name: 'Estação Biblioteca',
    availableBikes: 7,
    totalDocks: 8,
    position: { top: '25%', left: '72%' }, 
  },
  {
    id: 2,
    name: 'Estação RU',
    availableBikes: 3,
    totalDocks: 10,
    position: { top: '45%', left: '67%' },
  },
    {
    id: 3,
    name: 'Estação CCET',
    availableBikes: 5,
    totalDocks: 5,
    position: { top: '52%', left: '66%' },
  },
  {
    id: 4,
    name: 'Estação BICT',
    availableBikes: 4,
    totalDocks: 10,
    position: { top: '87%', left: '60%' },
  },
  {
    id: 5,
    name: 'Estação PF',
    availableBikes: 6,
    totalDocks: 10,
    position: { top: '63%', left: '47%' },
  },
];

// MAP BOUNDARIES (Decimal Degrees)
const MAP_BOUNDS = {
    north: -2.548333,
    south: -2.566388,
    west: -44.321944,
    east: -44.300555
};

const StationMarker: React.FC<{ station: typeof stationsData[0]; onClick: () => void; isSelected: boolean }> = ({ station, onClick, isSelected }) => (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
      style={{ top: station.position.top, left: station.position.left }}
      onPointerDown={(e) => { e.stopPropagation(); onClick(); }}
    >
        <div className={`absolute inset-0 bg-purple-500 rounded-full opacity-30 animate-ping ${isSelected ? 'block' : 'hidden'}`}></div>
        <div className={`relative flex flex-col items-center transition-transform duration-200 ${isSelected ? 'scale-125 z-20' : 'scale-100 z-10'}`}>
             {/* Reduced size from w-6 h-6 to w-5 h-5 */}
             <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 transition-colors ${isSelected ? 'bg-purple-600 border-white' : 'bg-white border-purple-500'}`}>
                <span className={`font-bold text-[9px] ${isSelected ? 'text-white' : 'text-purple-600'}`}>
                    {station.availableBikes}
                </span>
            </div>
            {/* Reduced stick size */}
            <div className="w-0.5 h-1.5 bg-purple-800/50 mt-0"></div>
            {/* Reduced shadow size */}
            <div className="w-1.5 h-0.5 bg-black/20 rounded-full blur-[1px]"></div>
        </div>
    </div>
);

const UserLocationMarker = ({ top, left }) => (
    <div 
        className="absolute w-6 h-6 z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ top, left }}
    >
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center">
             <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-white transform -translate-y-0.5"></div>
        </span>
    </div>
);

const MapScreen = ({ onStationClick }) => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [userPos, setUserPos] = useState<{topPct: number, leftPct: number} | null>(null);
  const [hasCenteredOnUser, setHasCenteredOnUser] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // Transform State - Zoom set to 3.0
  const [scale, setScale] = useState(3.0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Dimensions for Boundary Calculation
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  const mapImageUrl = 'https://i.imgur.com/VAqOcZ1.jpeg';

  // --- 1. GEOLOCATION LOGIC ---
  useEffect(() => {
    if (!navigator.geolocation) return;

    const success = (pos) => {
        const { latitude, longitude } = pos.coords;

        const latRange = MAP_BOUNDS.north - MAP_BOUNDS.south;
        const latDelta = MAP_BOUNDS.north - latitude;
        const topPct = (latDelta / latRange) * 100;

        const lngRange = MAP_BOUNDS.east - MAP_BOUNDS.west;
        const lngDelta = longitude - MAP_BOUNDS.west;
        const leftPct = (lngDelta / lngRange) * 100;

        setUserPos({ topPct, leftPct });
    };

    const error = (err) => console.warn(err);

    const id = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  // --- 2. BOUNDARY CLAMPING LOGIC ---
  const clampPosition = (x: number, y: number, currentScale: number) => {
    if (!containerRef.current || !contentRef.current) return { x, y };

    const containerW = containerRef.current.clientWidth;
    const containerH = containerRef.current.clientHeight; 
    
    const contentW = contentRef.current.offsetWidth * currentScale;
    const contentH = contentRef.current.offsetHeight * currentScale;

    // Calculate Min/Max X
    const minX = containerW - contentW;
    const maxX = 0;

    // Calculate Min/Max Y
    const minY = containerH - contentH;
    const maxY = 0;

    let newX = x;
    let newY = y;

    // Horizontal Clamping
    if (contentW > containerW) {
        newX = Math.min(maxX, Math.max(minX, x));
    } else {
        newX = (containerW - contentW) / 2;
    }

    // Vertical Clamping
    if (contentH > containerH) {
        newY = Math.min(maxY, Math.max(minY, y));
    } else {
        newY = (containerH - contentH) / 2;
    }

    return { x: newX, y: newY };
  };

  // --- 3. AUTO CENTER LOGIC ---
  useEffect(() => {
    // We can only calculate centering if the map image is loaded and dimensions are available
    if (!isMapLoaded || !containerRef.current || !contentRef.current) return;
    
    // If the user is currently interacting, do not force movement.
    if (isDragging) return;

    // If we have already successfully snapped to the user location, we stop auto-centering.
    // This allows the user to pan away freely after the initial find.
    if (hasCenteredOnUser) return;

    const containerW = containerRef.current.clientWidth;
    const containerH = containerRef.current.clientHeight;
    const contentW = contentRef.current.offsetWidth;
    const contentH = contentRef.current.offsetHeight;

    const targetScale = 3.0;
    
    // Default to center of map (50%, 50%)
    let targetPctTop = 50;
    let targetPctLeft = 50;
    let shouldLock = false;

    // If user position is available, use that instead and prepare to lock.
    if (userPos) {
        targetPctTop = userPos.topPct;
        targetPctLeft = userPos.leftPct;
        shouldLock = true;
    }

    const pointX = (targetPctLeft / 100) * contentW * targetScale;
    const pointY = (targetPctTop / 100) * contentH * targetScale;

    let targetX = (containerW / 2) - pointX;
    let targetY = (containerH / 2) - pointY;

    // Apply strict clamping
    const clamped = clampPosition(targetX, targetY, targetScale);
    
    setScale(targetScale);
    setPosition(clamped);

    // Only lock if we actually found the user. 
    // If we are just centering on 50/50 (loading state), we don't lock yet, 
    // so we can still snap to the user when the GPS signal arrives.
    if (shouldLock) {
        setHasCenteredOnUser(true);
    }
  }, [userPos, isMapLoaded, hasCenteredOnUser, isDragging]);

  // --- 4. GESTURE HANDLERS ---
  const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const rawX = e.clientX - dragStartRef.current.x;
      const rawY = e.clientY - dragStartRef.current.y;

      const clamped = clampPosition(rawX, rawY, scale);
      setPosition(clamped);
  };

  const handlePointerUp = () => {
      setIsDragging(false);
  };

  const handleZoom = (direction: 'in' | 'out') => {
      const newScale = direction === 'in' ? scale * 1.2 : scale / 1.2;
      const finalScale = Math.max(1, Math.min(newScale, 5));
      
      const clamped = clampPosition(position.x, position.y, finalScale);
      
      setScale(finalScale);
      setPosition(clamped);
  };

  return (
    <div 
        ref={containerRef}
        className="h-full w-full relative bg-gray-200 overflow-hidden touch-none" 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={() => setSelectedStation(null)}
    >
      {/* Draggable Content Wrapper */}
      <div 
        ref={contentRef}
        className="absolute top-0 left-0 origin-top-left will-change-transform"
        style={{ 
            width: '100%', 
            height: 'auto',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out' // Smooth centering
        }}
      >
          {/* THE MAP IMAGE */}
          <img 
            src={mapImageUrl} 
            alt="Mapa UFMA" 
            className="w-full h-auto block select-none"
            draggable={false}
            onLoad={() => setIsMapLoaded(true)}
          />

          {/* User Location Marker */}
          {userPos && (
             <UserLocationMarker 
                top={`${userPos.topPct}%`} 
                left={`${userPos.leftPct}%`} 
             />
          )}

          {/* Station Markers */}
          {stationsData.map(station => (
            <StationMarker 
                key={station.id} 
                station={station} 
                isSelected={selectedStation?.id === station.id}
                onClick={() => setSelectedStation(station)} 
            />
          ))}
      </div>
      
      {/* Overlay Gradient - Top Only */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10"></div>
      
      {/* Zoom Controls */}
      <div className="absolute top-24 right-4 flex flex-col space-y-2 z-20">
          <button onClick={(e) => { e.stopPropagation(); handleZoom('in'); }} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 font-bold active:bg-gray-100 border border-gray-100">+</button>
          <button onClick={(e) => { e.stopPropagation(); handleZoom('out'); }} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 font-bold active:bg-gray-100 border border-gray-100">-</button>
      </div>

      {/* Quick Action Card */}
      {selectedStation && (
        <div 
            className="absolute bottom-32 left-4 right-4 bg-white p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] z-30 flex justify-between items-center animate-slide-up border border-gray-100"
            onClick={(e) => e.stopPropagation()}
        >
          <div>
              <h3 className="font-bold text-lg text-gray-800">{selectedStation.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500 space-x-3">
                  <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> {selectedStation.availableBikes} Livres</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span> {selectedStation.totalDocks - selectedStation.availableBikes} Vagas</span>
              </div>
          </div>
          <button className="bg-purple-600 text-white p-3 rounded-full shadow-lg shadow-purple-200 active:scale-95 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
