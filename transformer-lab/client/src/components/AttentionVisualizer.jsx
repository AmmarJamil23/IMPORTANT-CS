import { useState } from "react";

function AttentionVisualizer() {
  const [inputText, setInputText] = useState('the cat sat');
  const [tokens, setTokens] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);

  const tokenizeText = () => {
    const words = inputText.trim().split(' ');
    setTokens(words);
    setShowMatrix(true);
  }


  return (
    <div className="bg-black border border-white rounded-lg  p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Attention Visualizer
      </h2>

      <input
       type="text"
       value={inputText}
       onChange={(e) => setInputText(e.target.value)}
       className="w-full px-4 py-2 bg-black border-2 border-white rounded-lg text-white focus:border-gray-400  focus:outline-none"
       placeholder="Enter text..."
        />

        <button
        onClick={tokenizeText}
        className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 hover:text-black"
        >
          Tokenize
        </button>

        {tokens.length > 0 && (
          <div className="mt-4">
            <p className="text-white mb-2">
              Tokens
            </p>

            <div className="flex gap-2 flex-wrap">
              {tokens.map((token, i) => (
                <span key={i}
                className="px-3 py-1 bg-white text-black rounded"
                >
                  {token}
                </span>
              ))}

            </div>

          </div>
        )}

        

    </div>
  )
}

export default AttentionVisualizer;