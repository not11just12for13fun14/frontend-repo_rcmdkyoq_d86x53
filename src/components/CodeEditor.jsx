import { useEffect, useRef, useState } from 'react';

// Lightweight textarea-based editor to avoid extra deps
export default function CodeEditor({ language = 'python', template = '', onRun }) {
  const [code, setCode] = useState(template || defaultTemplates[language] || '');
  const [stdin, setStdin] = useState('');
  const [running, setRunning] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    setCode(template || defaultTemplates[language] || '');
  }, [language, template]);

  const simulateRun = () => {
    // Simple local simulation so the UI works without a backend
    const lines = code.split('\n').length;
    const chars = code.length;
    const preview = code.slice(0, 120);
    return `Simulated run (no backend configured)\nLanguage: ${language}\nLines: ${lines}, Chars: ${chars}\nInput: ${stdin ? '\n' + stdin : '(none)'}\n---\nPreview:\n${preview}${code.length > 120 ? '...': ''}`;
  };

  const runCode = async () => {
    setRunning(true);
    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      if (!base) {
        outputRef.current.value = simulateRun();
        return;
      }
      const res = await fetch(`${base}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, stdin }),
      });
      const data = await res.json();
      outputRef.current.value = data.output || data.error || '';
    } catch (e) {
      outputRef.current.value = String(e);
    } finally {
      setRunning(false);
    }
  };

  return (
    <section id="playground" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Coding Playground</h2>
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={() => {}}
            className="hidden" // locked for now to provided language
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={runCode} disabled={running} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50">
            {running ? 'Running…' : 'Run'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Code</label>
          <textarea
            className="w-full h-64 font-mono text-sm rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <label className="text-sm text-gray-600">Stdin</label>
          <textarea
            className="w-full h-20 font-mono text-sm rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Output</label>
          <textarea
            ref={outputRef}
            readOnly
            className="w-full h-[376px] font-mono text-sm rounded-md border p-3 bg-gray-50"
          />
        </div>
      </div>
    </section>
  );
}

const defaultTemplates = {
  python: `# Write a function to solve the problem\n\nprint('Hello from Python')`,
  javascript: `// Write a function to solve the problem\n\nconsole.log('Hello from JS')`,
};
