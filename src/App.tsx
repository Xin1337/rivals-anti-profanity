import React, { useState } from 'react';

function convertText(text: string): string {
  const antiCCPMap: { [key: string]: string } = {
    'a': 'а',
    'c': 'с',
    'e': 'е',
    'i': 'і',
    'o': 'о',
    'x': 'х',
    'y': 'у',
  };

  return text.toLowerCase().split('').map(char => 
    antiCCPMap[char] || char
  ).join('');
}

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleConvert = () => {
    setOutput(convertText(input));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-4 overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-200 select-none">Rivals Anti-CCP Converter</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 select-none">
                Enter Text
              </label>
              <textarea
                className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-gray-700 bg-gray-700 text-white"
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your text here..."
              />
            </div>

            <button
              onClick={handleConvert}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors select-none"
            >
              Convert
            </button>

            {output && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2 select-none">
                  Result
                </label>
                <div 
                  onClick={handleCopyToClipboard}
                  className={`p-3 bg-gray-700 rounded-md font-mono break-all cursor-pointer hover:bg-gray-600 transition-colors ${isAnimating ? 'copy-animate' : ''} text-gray-200`}
                  title="Click to copy"
                >
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer mt-4 text-gray-500">
        <span className="text-sm select-none">Made by Nic © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

export default App;