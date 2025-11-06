
import React, { useState, useRef } from 'react';
import { analyzeBikeDamage } from '../services/geminiService.ts';

const ReportProblemFlow = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
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
    try {
      const analysisResult = await analyzeBikeDamage(image, description);
      setResult(`Problema detectado: ${analysisResult}`);
    } catch (err) {
      setError('Falha ao analisar a imagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg text-gray-700 mb-2">Reportar um Problema</h3>
      <p className="text-sm text-gray-600 mb-4">Viu algo de errado com uma bicicleta? Nos avise!</p>
      
      <div className="space-y-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 hover:bg-gray-200 hover:border-gray-400"
        >
          {preview ? (
            <img src={preview} alt="Pré-visualização" className="max-h-40 mx-auto rounded-md"/>
          ) : (
            <span>Clique para carregar uma foto</span>
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
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !image || !description}
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analisando...' : 'Enviar Relatório'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {result && <p className="text-green-600 font-semibold">{result}</p>}
      </div>
    </div>
  );
};

export default ReportProblemFlow;
