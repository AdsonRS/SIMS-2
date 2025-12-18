
import React, { useState, useEffect, useRef } from 'react';
import { getCampusInfo, findPointsOfInterest } from '../services/geminiService.ts';

interface Message {
  type: 'user' | 'bot';
  text: string;
  sources?: any[];
}

const AssistantMode = {
  Chat: 0,
};

const BotIcon = ({ className }) => (
    <div className={`rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${className}`}>
        ✨
    </div>
);

const UserIcon = ({ className }) => (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold ${className}`}>
        Eu
    </div>
);

const CampusAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
      { type: 'bot', text: 'Olá! Sou seu assistente do campus. Pergunte sobre eventos, locais ou onde comer!' }
  ]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setQuery('');
    setIsLoading(true);

    try {
      // Hybrid logic: If query mentions "onde" or "fica", use POI, else generic info
      let responseText = '';
      let sources = [];
      
      if (userMsg.toLowerCase().includes('onde') || userMsg.toLowerCase().includes('local')) {
           const result = await findPointsOfInterest(userMsg, null); // passing null location for now or could use navigator
           responseText = result.text;
           sources = result.places;
      } else {
           const result = await getCampusInfo(userMsg);
           responseText = result.text;
           sources = result.sources;
      }

      setMessages(prev => [...prev, { type: 'bot', text: responseText, sources }]);

    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Desculpe, tive um problema ao processar isso.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-t-xl overflow-hidden">
      <div className="bg-white p-4 shadow-sm z-10 sticky top-0 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="font-bold text-lg text-gray-800">Campus Co-Pilot</h3>
            <p className="text-xs text-purple-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {/* FIX: Updated label to reflect the use of Gemini 3 series for general chat. */}
                Gemini 3 Ativado
            </p>
          </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && <BotIcon className="w-8 h-8 mr-2 shrink-0 self-end mb-1" />}
                
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.type === 'user' 
                    ? 'bg-purple-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    
                    {/* Render Sources/Chips if available */}
                    {msg.sources && msg.sources.length > 0 && (
                         <div className="mt-3 flex flex-wrap gap-2">
                            {msg.sources.map((source, idx) => {
                                 const chunk = source.web || source.maps;
                                 if (!chunk?.uri) return null;
                                 return (
                                     <a 
                                        key={idx} 
                                        href={chunk.uri} 
                                        target="_blank" 
                                        rel="noopener"
                                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-md border border-purple-100 transition-colors truncate max-w-full block"
                                     >
                                        🔗 {chunk.title || 'Ver fonte'}
                                     </a>
                                 )
                            })}
                         </div>
                    )}
                </div>

                {msg.type === 'user' && <UserIcon className="w-8 h-8 ml-2 shrink-0 self-end mb-1" />}
            </div>
        ))}
        {isLoading && (
             <div className="flex justify-start">
                <BotIcon className="w-8 h-8 mr-2 shrink-0" />
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
             </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pergunte sobre o campus..."
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-purple-600 text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:shadow-none transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </button>
        </form>
      </div>
    </div>
  );
};

export default CampusAssistant;
