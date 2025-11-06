
import React, { useState, useEffect, useCallback } from 'react';
import { getCampusInfo, findPointsOfInterest } from '../services/geminiService.ts';

const AssistantMode = {
  Info: 0,
  POI: 1,
};

const CampusAssistant = () => {
  const [mode, setMode] = useState(AssistantMode.Info);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          setLocationError(null);
        },
        () => {
          setLocationError('Permissão de localização negada. A busca por POIs pode ser menos precisa.');
        }
      );
    } else {
      setLocationError('Geolocalização não é suportada por este navegador.');
    }
  }, []);

  useEffect(() => {
    if (mode === AssistantMode.POI) {
      getLocation();
    }
  }, [mode, getLocation]);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    try {
      if (mode === AssistantMode.Info) {
        const result = await getCampusInfo(query);
        setResponse({ text: result.text, sources: result.sources });
      } else {
        const result = await findPointsOfInterest(query, location);
        setResponse({ text: result.text, sources: result.places });
      }
    } catch (error) {
      setResponse({ text: 'Ocorreu um erro ao processar sua solicitação.', sources: [] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg text-gray-700 mb-2">Assistente do Campus</h3>
      <div className="flex border border-gray-200 rounded-md mb-4">
        <button
          onClick={() => setMode(AssistantMode.Info)}
          className={`w-1/2 py-2 text-sm font-medium rounded-l-md ${mode === AssistantMode.Info ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Notícias e Eventos
        </button>
        <button
          onClick={() => setMode(AssistantMode.POI)}
          className={`w-1/2 py-2 text-sm font-medium rounded-r-md ${mode === AssistantMode.POI ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Pontos de Interesse
        </button>
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === AssistantMode.Info ? "Ex: Eventos acadêmicos essa semana" : "Ex: Onde tomar um café perto do CCET?"}
          className="w-full p-2 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 text-white font-bold py-1.5 px-4 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
        >
          {isLoading ? '...' : 'Buscar'}
        </button>
      </div>

      {locationError && mode === AssistantMode.POI && <p className="text-xs text-yellow-600 mt-2">{locationError}</p>}

      {response && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-gray-800 whitespace-pre-wrap">{response.text}</p>
          {response.sources && response.sources.length > 0 && (
            <div className="mt-4 pt-2 border-t">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Fontes:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {response.sources.map((source, index) => {
                  const chunk = source.web || source.maps;
                  return (
                     chunk && chunk.uri ? (
                      <li key={index}>
                        <a href={chunk.uri} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                          {chunk.title || chunk.uri}
                        </a>
                      </li>
                    ) : null
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampusAssistant;
