
import React from 'react';

const WalletScreen = () => {
    const currentBalance = 12.50;

    return (
        <div className="p-4 bg-gray-50 h-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Minha Carteira</h1>

            <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg mb-8 text-center">
                <p className="text-sm opacity-80">Saldo Atual</p>
                <p className="text-4xl font-bold">R$ {currentBalance.toFixed(2).replace('.', ',')}</p>
                <button className="mt-4 bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition-colors">
                    Adicionar Saldo
                </button>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Planos e Assinaturas</h2>

            <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg shadow-md border-2 border-green-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">RECOMENDADO</div>
                    <h3 className="font-bold text-lg text-green-800">Plano Estudante</h3>
                    <p className="text-sm text-gray-600 mb-2">Viagens gratuitas ilimitadas de até 45 min. Exclusivo para estudantes UFMA.</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-2xl font-bold text-green-700">Grátis</p>
                        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700">
                            Ativar
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-500">
                    <h3 className="font-bold text-lg text-purple-700">Plano Mensal</h3>
                    <p className="text-sm text-gray-600 mb-2">Viagens ilimitadas de até 30 min.</p>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-gray-800">R$ 39,90<span className="text-base font-normal">/mês</span></p>
                        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700">
                            Ativo
                        </button>
                    </div>
                </div>

                 <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-700">Passe Diário</h3>
                    <p className="text-sm text-gray-600 mb-2">4 viagens de até 45 min.</p>
                     <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-gray-800">R$ 2,90<span className="text-base font-normal">/dia</span></p>
                        <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">
                            Selecionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletScreen;
