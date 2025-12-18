import React from 'react';

const CardPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
        <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="text-white" fill="currentColor" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
    </svg>
);

const WalletScreen = () => {
    const currentBalance = 12.50;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Minha Carteira</h2>

            {/* Main Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/30">
                <CardPattern />
                <div className="relative z-10">
                    <p className="text-sm font-medium text-purple-200 mb-1">Saldo Disponível</p>
                    <h3 className="text-4xl font-bold tracking-tight">R$ {currentBalance.toFixed(2).replace('.', ',')}</h3>
                    
                    <div className="mt-8 flex justify-between items-end">
                        <div>
                             <p className="text-xs text-purple-200">Titular</p>
                             <p className="font-semibold tracking-wide">ALUNO TESTE</p>
                        </div>
                        <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Card Logo" className="h-8" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95">
                     <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                     </div>
                     <span className="text-sm font-semibold text-gray-700">Recarregar</span>
                </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95">
                     <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                        </svg>
                     </div>
                     <span className="text-sm font-semibold text-gray-700">Planos</span>
                </button>
            </div>

            {/* Plans */}
            <h3 className="text-lg font-bold text-gray-800 pt-2">Seu Plano</h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
                <div>
                    <h4 className="font-bold text-green-800">Estudante UFMA</h4>
                    <p className="text-xs text-green-700 mt-1">Viagens grátis ilimitadas (45min)</p>
                </div>
                <div className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                    ATIVO
                </div>
            </div>
        </div>
    );
};

export default WalletScreen;