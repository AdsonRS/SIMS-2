
import React from 'react';

const rankingData = [
  { id: 1, name: "Ana Silva", distance: "42.5 km", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ana", medal: "🥇" },
  { id: 2, name: "Carlos Edu", distance: "38.2 km", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos", medal: "🥈" },
  { id: 3, name: "Beatriz M.", distance: "35.0 km", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bea", medal: "🥉" },
  { id: 4, name: "João Pedro", distance: "29.8 km", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Joao", medal: null },
  { id: 5, name: "Mariana L.", distance: "22.1 km", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mari", medal: null },
];

// FIX: Added React.FC type to RankingItem to resolve the 'key' prop error in lists by inheriting from standard React component props.
const RankingItem: React.FC<{ user: any; rank: number }> = ({ user, rank }) => {
  const isTop3 = rank <= 3;
  
  return (
    <div className={`flex items-center p-4 rounded-xl mb-3 border ${isTop3 ? 'bg-white border-purple-100 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
      {/* Rank / Medal */}
      <div className="w-10 flex justify-center font-bold text-lg">
        {user.medal ? <span className="text-2xl">{user.medal}</span> : <span className="text-gray-400">#{rank}</span>}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-purple-200 to-indigo-200 mx-3">
         <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full bg-white" />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className={`font-bold ${isTop3 ? 'text-gray-800' : 'text-gray-600'}`}>{user.name}</h4>
        <p className="text-xs text-gray-400 uppercase font-medium">Ciclista UFMA</p>
      </div>

      {/* Distance */}
      <div className="text-right">
        <p className="font-bold text-purple-600 text-lg">{user.distance}</p>
        <p className="text-[10px] text-gray-400 uppercase">Na semana</p>
      </div>
    </div>
  );
};

const RankingScreen = () => {
  return (
    <div className="h-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Ranking Semanal</h2>
        <p className="text-gray-500 text-sm">Quem pedalou mais essa semana?</p>
      </div>

      <div className="pb-4">
        {rankingData.map((user, index) => (
          <RankingItem key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
      
      <div className="bg-purple-50 p-4 rounded-xl text-center mt-2">
         <p className="text-purple-700 text-sm font-medium">Continue pedalando para subir no ranking!</p>
      </div>
    </div>
  );
};

export default RankingScreen;
