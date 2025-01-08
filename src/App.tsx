import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function convertText(text: string): string {
  const antiCCPMap: { [key: string]: string } = {
    a: "а",
    c: "с",
    e: "е",
    i: "і",
    o: "о",
    x: "х",
    y: "у",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => antiCCPMap[char] || char)
    .join("");
}

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleConvert = () => {
    setOutput(convertText(input));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsAnimating(true);
      setShowCopied(true);
      setTimeout(() => {
        setIsAnimating(false);
        setShowCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-4 overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-200 select-none">
            Rivals Profanity Bypass
          </h1>

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
                  className={`relative p-3 bg-gray-700 rounded-md font-mono break-all cursor-pointer hover:bg-gray-600 transition-colors ${
                    isAnimating ? "copy-animate" : ""
                  } text-gray-200`}
                  title="Click to copy"
                >
                  <CSSTransition
                    in={showCopied}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700/95 backdrop-blur-sm rounded-md">
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-400 font-medium">
                          Copied!
                        </span>
                      </div>
                    </div>
                  </CSSTransition>
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer mt-4 text-gray-500">
        <span className="text-sm select-none">
          Made by Nic © {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default App;
