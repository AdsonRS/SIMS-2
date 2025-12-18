import React from 'react';

const ProfileScreen = ({ onClose }) => {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Perfil</h2>
      </div>

      <div className="flex items-center space-x-4 mb-8">
         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
            </div>
         </div>
         <div>
             <h3 className="font-bold text-xl">Aluno Teste</h3>
             <p className="text-gray-500 text-sm">Matrícula: 202400123</p>
             <div className="mt-2 inline-flex bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-md font-medium border border-green-200">
                Regular
             </div>
         </div>
      </div>

      <div className="space-y-1">
         {[
             { label: 'Editar Dados', icon: '✏️' },
             { label: 'Notificações', icon: '🔔' },
             { label: 'Segurança', icon: '🔒' },
             { label: 'Ajuda e Suporte', icon: '❓' }
         ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
         ))}
      </div>

      <button className="w-full mt-8 bg-red-50 text-red-600 font-bold py-4 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
        Sair da Conta
      </button>
    </div>
  );
};

export default ProfileScreen;