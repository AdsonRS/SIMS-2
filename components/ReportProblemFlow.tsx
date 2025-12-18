
import React, { useState, useRef } from 'react';

const ReportProblemFlow = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!image || !description) {
      setError('Por favor, adicione uma imagem e uma descrição.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResult('');

    // Simulate a network request for a manual report submission
    setTimeout(() => {
      setIsLoading(false);
      setResult('Relatório enviado com sucesso! Nossa equipe de manutenção irá verificar o problema em breve.');
      // Reset form after success
      setImage(null);
      setPreview(null);
      setDescription('');
    }, 1500);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg text-gray-700 mb-2">Reportar um Problema</h3>
      <p className="text-sm text-gray-600 mb-4">Viu algo de errado com uma bicicleta? Nos avise!</p>
      
      <div className="space-y-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 hover:bg-gray-200 hover:border-gray-400 transition-colors"
        >
          {preview ? (
            <img src={preview} alt="Pré-visualização" className="max-h-40 mx-auto rounded-md shadow-sm"/>
          ) : (
            <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Clique para carregar uma foto</span>
            </div>
          )}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o problema (ex: pneu furado na roda traseira)"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !image || !description}
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
        >
          {isLoading ? 'Enviando...' : 'Enviar Relatório'}
        </button>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        {result && (
            <div className="bg-green-50 border border-green-100 text-green-700 p-3 rounded-lg text-sm font-medium animate-pulse">
                {result}
            </div>
        )}
      </div>
    </div>
  );
};

export default ReportProblemFlow;
