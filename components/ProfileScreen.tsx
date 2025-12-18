
import React, { useState } from 'react';

// --- SVGs Icons ---
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
);

const SirenIcon = () => (
    <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01"></path></svg>
);

const TheftIcon = () => (
    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);

const WrenchIcon = () => (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

// --- Sub-Screen: Help & Support ---
const HelpSupportView = ({ onBack }) => {
    const [sosActive, setSosActive] = useState(false);
    const [theftReported, setTheftReported] = useState(false);

    const handleSOS = () => {
        setSosActive(true);
        // Simulate call
        setTimeout(() => {
            setSosActive(false);
            alert("A Segurança Institucional da UFMA foi notificada e está enviando uma viatura para sua localização.");
        }, 3000);
    };

    const handleTheft = () => {
        const confirm = window.confirm("Confirmar alerta de furto? Isso bloqueará a bicicleta e alertará as portarias.");
        if (confirm) {
            setTheftReported(true);
            setTimeout(() => setTheftReported(false), 4000);
        }
    };

    return (
        <div className="h-full flex flex-col animate-slide-up bg-gray-50">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full mr-2">
                    <BackIcon />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Central de Ajuda</h2>
            </div>

            {/* 1. SOS Emergency */}
            <div className="mb-8">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                         <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.516L20.297 19H3.703L12 5.516zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                    </div>
                    
                    <h3 className="text-red-800 font-bold text-lg mb-4 z-10">PEDIDO DE SOCORRO</h3>
                    
                    <button 
                        onClick={handleSOS}
                        disabled={sosActive}
                        className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all z-10 ${sosActive ? 'bg-red-700 scale-95' : 'bg-gradient-to-br from-red-500 to-red-600 hover:scale-105 active:scale-95'}`}
                    >
                        {sosActive ? (
                            <span className="text-white font-bold animate-pulse">ENVIANDO...</span>
                        ) : (
                            <div className="flex flex-col items-center">
                                <SirenIcon />
                                <span className="text-white font-bold mt-1">SOS</span>
                            </div>
                        )}
                    </button>
                    <p className="text-xs text-red-400 mt-4 max-w-[200px] z-10">
                        Aciona a segurança do campus e compartilha sua localização em tempo real.
                    </p>
                </div>
            </div>

            <div className="space-y-4 flex-1">
                {/* 2. Report Theft */}
                <button 
                    onClick={handleTheft}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 flex items-center justify-between hover:bg-orange-50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-white transition-colors">
                            <TheftIcon />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-800">Reportar Roubo</h4>
                            <p className="text-xs text-gray-500">Bicicleta furtada ou desaparecida</p>
                        </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                
                {theftReported && (
                     <div className="bg-orange-600 text-white text-xs p-3 rounded-lg text-center animate-bounce">
                        Alerta enviado! As portarias foram notificadas.
                     </div>
                )}

                {/* 3. Report Damage */}
                <button 
                    className="w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500 flex items-center justify-between hover:bg-purple-50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-white transition-colors">
                            <WrenchIcon />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-800">Reportar Danos</h4>
                            <p className="text-xs text-gray-500">Problemas mecânicos ou estruturais</p>
                        </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                 {/* 4. Support Chat */}
                 <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-800">Chat com Suporte</h4>
                            <p className="text-xs text-gray-500">Atendimento 08h às 18h</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}

// --- Main Profile Screen ---
const ProfileScreen = ({ onClose }) => {
  const [view, setView] = useState('menu'); // 'menu' | 'help'

  if (view === 'help') {
      return <HelpSupportView onBack={() => setView('menu')} />;
  }

  return (
    <div className="h-full animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Perfil</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
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
             { id: 'edit', label: 'Editar Dados', icon: '✏️' },
             { id: 'notif', label: 'Notificações', icon: '🔔' },
             { id: 'security', label: 'Segurança', icon: '🔒' },
         ].map((item) => (
            <button key={item.id} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
         ))}

         {/* Specialized Help Button */}
         <button 
            onClick={() => setView('help')}
            className="w-full flex items-center justify-between p-4 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors"
        >
            <div className="flex items-center gap-3">
                <span className="text-xl">🚑</span>
                <span className="font-medium text-purple-700">Ajuda e Suporte</span>
            </div>
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
         </button>
      </div>

      <button className="w-full mt-8 bg-red-50 text-red-600 font-bold py-4 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
        Sair da Conta
      </button>
    </div>
  );
};

export default ProfileScreen;
