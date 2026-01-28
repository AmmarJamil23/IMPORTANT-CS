import { useState } from 'react';
import { calculateAttention } from '../services/api';

function AttentionVisualizer() {
  const [inputText, setInputText] = useState('the cat sat');
  const [tokens, setTokens] = useState([]);
  const [attentionMatrix, setAttentionMatrix] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getGrayscale = (value) => {
    const intensity = Math.floor((1 - value) * 255);
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

  const tokenizeAndCalculate = async () => {
    const words = inputText.trim().split(' ');
    setTokens(words);
    setIsLoading(true);
    
    try {
      const data = await calculateAttention(words);
      setAttentionMatrix(data.attentionMatrix);
      setShowMatrix(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to calculate attention');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black border border-white rounded-lg p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Attention Visualizer</h2>
      
      <input 
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full px-4 py-2 bg-black border-2 border-white rounded-lg text-white focus:border-gray-400 focus:outline-none"
        placeholder="Enter text..."
      />
      
      <button
        onClick={tokenizeAndCalculate}
        disabled={isLoading}
        className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 hover:text-black  disabled:bg-gray-400"
      >
        {isLoading ? 'Calculating...' : 'Calculate Attention'}
      </button>

      {tokens.length > 0 && (
        <div className="mt-4">
          <p className="text-white mb-2">Tokens:</p>
          <div className="flex gap-2 flex-wrap">
            {tokens.map((token, i) => (
              <span key={i} className="px-3 py-1 bg-white text-black rounded">
                {token}
              </span>
            ))}
          </div>
        </div>
      )}

      {showMatrix && tokens.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-white mb-3">Attention Matrix</h3>
          <div className="overflow-x-auto">
            <table className="border-collapse border border-white">
              <thead>
                <tr>
                  <th className="border border-white p-2 bg-black text-white"></th>
                  {tokens.map((token, i) => (
                    <th key={i} className="border border-white p-2 bg-black text-white">
                      {token}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attentionMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="border border-white p-2 bg-black text-white font-semibold">
                      {tokens[i]}
                    </td>
                    {row.map((value, j) => (
                      <td 
                        key={j} 
                        className="border border-white p-2 text-black text-center font-semibold"
                        style={{ backgroundColor: getGrayscale(value) }}
                      >
                        {value.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttentionVisualizer;