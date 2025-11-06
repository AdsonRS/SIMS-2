
import React from 'react';
import ReportProblemFlow from './ReportProblemFlow.tsx';
import CampusAssistant from './CampusAssistant.tsx';

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

const SettingsScreen = () => {
  return (
    <div className="p-4 bg-gray-50 h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil e Configurações</h1>
      <UserProfileCard />

      <div className="space-y-6">
        <ReportProblemFlow />
        <CampusAssistant />
      </div>
    </div>
  );
};

export default SettingsScreen;
