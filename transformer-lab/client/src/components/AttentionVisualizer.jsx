import React from 'react'
import { useState } from 'react'
import { Brain, Play, Info } from 'lucide-react'

const AttentionVisualizer = () => {
    const [inputText, setInputText] = useState('the cat sat on the mat');
    const [attentionMatrix, setAttentionMatrix] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    //Attention Calculation
    const calculateAttention = () => {
        setIsProcessing(true);

        //simulate processing delay
        setTimeout(() => {
            const tokens = inputText.toLowerCase().split(' ');
            const seqLen = tokens.length;

            const matrix = Array(seqLen).fill(0).map(() => 
            Array(seqLen).fill(0).map(() => Math.random())
        );

        //Normalize each row (softmax-like)
        const normalized = matrix.map(row => {
            const sum = row.reduce((a, b) => a + b, 0);
            return row.map(val => val / sum);
        });

        setAttentionMatrix(normalized);
        setIsProcessing(false);
        }, 500);
    };

    const getColor = (value) => {
        //convert attention weight to color (0 = white, 1 = blue)
        const intensity = Math.floor(value * 255);
        return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
    };

    const tokens = inputText.toLowerCase().split(' ');


  return (
  <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Brain className="w-10 h-10 text-blue-600" />
          Attention Mechanism Visualizer
        </h1>
        <p className="text-gray-600 text-lg">
          See how each word attends to every other word in the sequence
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              What is Self-Attention?
            </h3>
            <p className="text-blue-800 text-sm">
              Each word computes how much it should "attend to" (focus on) every other word.
              Darker blue = stronger attention. The matrix shows attention weights from row → column.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Enter Text (space-separated words):
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
          placeholder="the cat sat on the mat"
        />
        
        <button
          onClick={calculateAttention}
          disabled={isProcessing || !inputText.trim()}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Play className="w-5 h-5" />
          {isProcessing ? 'Processing...' : 'Calculate Attention'}
        </button>
      </div>

      {/* Attention Matrix Visualization */}
      {attentionMatrix && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Attention Matrix</h2>
          <p className="text-gray-600 mb-4">
            Rows = Query tokens (asking), Columns = Key tokens (being attended to)
          </p>

          <div className="overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-3 bg-gray-100 font-semibold">
                    Query ↓ / Key →
                  </th>
                  {tokens.map((token, i) => (
                    <th
                      key={i}
                      className="border-2 border-gray-300 p-3 bg-gray-100 font-semibold min-w-[80px]"
                    >
                      {token}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attentionMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="border-2 border-gray-300 p-3 bg-gray-100 font-semibold">
                      {tokens[i]}
                    </td>
                    {row.map((weight, j) => (
                      <td
                        key={j}
                        className="border-2 border-gray-300 p-3 text-center font-mono text-sm"
                        style={{ backgroundColor: getColor(weight) }}
                        title={`${tokens[i]} → ${tokens[j]}: ${weight.toFixed(3)}`}
                      >
                        {weight.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold">Attention Strength:</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 border" style={{ backgroundColor: getColor(0) }}></div>
              <span className="text-sm">Low (0.0)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 border" style={{ backgroundColor: getColor(0.5) }}></div>
              <span className="text-sm">Medium (0.5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 border" style={{ backgroundColor: getColor(1) }}></div>
              <span className="text-sm">High (1.0)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttentionVisualizer;