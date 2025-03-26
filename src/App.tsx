import React, { useState, useRef } from "react"; // Added useRef
import { CSSTransition } from "react-transition-group";

// Simple Checkmark SVG component
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

function convertText(text: string): string {
  const antiCCPMap: { [key: string]: string } = {
    a: "а", // Cyrillic 'a'
    c: "с", // Cyrillic 's'
    e: "е", // Cyrillic 'e'
    i: "і", // Cyrillic 'i'
    o: "о", // Cyrillic 'o'
    x: "х", // Cyrillic 'kh'
    y: "у", // Cyrillic 'u'
    // Add more replacements if needed
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
  const [showCopied, setShowCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null); // Ref for the output div

  const handleConvert = () => {
    setOutput(convertText(input));
  };

  const handleCopyToClipboard = async () => {
    if (!output) return; // Don't copy if output is empty

    try {
      await navigator.clipboard.writeText(output);
      setShowCopied(true);
      // Use timeout to hide the "Copied!" message
      setTimeout(() => {
        setShowCopied(false);
      }, 1500); // Increased duration for visibility
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optionally show an error message to the user
    }
  };

  return (
    // Main container - Center content vertically and horizontally
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      {/* Card container */}
      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-slate-100 select-none"> {/* Reduced bottom margin */}
          Rivals Profanity Bypass
        </h1>

        {/* Instructions */}
        <p className="text-center text-slate-400 text-sm mb-6 select-none">
          Type your text, click 'Convert Text', then click the result to copy.
        </p>

        {/* Input Section */}
        <div className="mb-5">
          <label
            htmlFor="inputText"
            className="block text-sm font-medium text-slate-300 mb-2 select-none"
          >
            Enter Text
          </label>
          <textarea
            id="inputText"
            className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-700 text-slate-100 placeholder-slate-400 transition duration-150 ease-in-out"
            rows={4}
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            placeholder="Type or paste your text here..."
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition duration-150 ease-in-out select-none shadow-md hover:shadow-lg"
        >
          Convert Text
        </button>

        {/* Output Section - Only shown when there is output */}
        {output && (
          <div className="mt-6">
            <label
              htmlFor="outputText"
              className="block text-sm font-medium text-slate-300 mb-2 select-none"
            >
              Converted Text (Click to Copy)
            </label>
            <div
              id="outputText"
              ref={outputRef} // Assign ref
              onClick={handleCopyToClipboard}
              className="relative p-4 bg-slate-700 border border-slate-600 rounded-lg font-mono break-all cursor-pointer hover:bg-slate-600/70 transition-colors duration-150 ease-in-out text-slate-100 select-none min-h-[5rem]" // Added min-height
              title="Click to copy"
            >
              {/* Copied Feedback Overlay */}
              <CSSTransition
                in={showCopied}
                timeout={300} // Match transition duration
                classNames="copied-feedback" // Use custom class names
                unmountOnExit
                nodeRef={outputRef} // Use nodeRef for better compatibility
              >
                <div className="absolute inset-0 flex items-center justify-center bg-slate-700/90 backdrop-blur-sm rounded-lg pointer-events-none">
                  <div className="flex items-center space-x-2 text-indigo-300">
                    <CheckIcon className="h-6 w-6 animate-pulse" /> {/* Added animation */}
                    <span className="font-semibold">Copied!</span>
                  </div>
                </div>
              </CSSTransition>
              {/* Display Output Text */}
              {output}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-slate-500 text-sm select-none">
        Made by Nic © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
