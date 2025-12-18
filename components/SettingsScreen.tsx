
import React from 'react';
import ReportProblemFlow from './ReportProblemFlow.tsx';

const UserProfileCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
        A
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">Aluno Teste</h2>
        <p className="text-gray-600">aluno.teste@ufma.br</p>
        <p className="text-sm text-gray-500">Matrícula: 202400123</p>
      </div>
    </div>
  </div>
);

const ContactSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg text-gray-700 mb-4">Fale Conosco</h3>
        <p className="text-gray-600 text-sm mb-4">
            Precisa de ajuda com o aplicativo ou com as estações? Entre em contato com nosso suporte.
        </p>
        
        <div className="space-y-3">
            <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-sm">suporte.sims@ufma.br</span>
            </div>
            <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-sm">(98) 3272-8000</span>
            </div>
             <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-sm">Cidade Universitária, São Luís - MA</span>
            </div>
        </div>

        <button className="w-full mt-6 bg-gray-100 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Abrir Chamado
        </button>
    </div>
);

const SettingsScreen = () => {
  return (
    <div className="p-4 bg-gray-50 h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil e Configurações</h1>
      <UserProfileCard />

      <div className="space-y-6">
        <ReportProblemFlow />
        <ContactSection />
      </div>
    </div>
  );
};

export default SettingsScreen;
