
import React from 'react';

const CloseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const ProfileScreen = ({ onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-sm p-6 relative transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar perfil"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            A
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Aluno Teste</h2>
          <p className="text-gray-600">aluno.teste@ufma.br</p>
          <p className="text-sm text-gray-500 mt-1">Matrícula: 202400123</p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 space-y-2">
           <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
            Minha Carteira
          </button>
           <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
            Histórico de Viagens
          </button>
           <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
            Configurações
          </button>
        </div>

         <div className="mt-4 border-t border-gray-200 pt-4">
           <button className="w-full bg-red-50 text-red-600 font-bold py-3 px-4 rounded-lg hover:bg-red-100 transition-colors">
            Sair
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;
