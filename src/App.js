import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [durationMs, setDurationMs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function callApi() {
    setIsLoading(true);
    setError('');
    setData('');
    setDurationMs(null);

    const startedAt = performance.now();
    try {
      const response = await fetch('/api/managedHttpTrigger');
      const text = await response.text();

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}${text ? `: ${text}` : ''}`);
      }

      setData(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      const finishedAt = performance.now();
      setDurationMs(Math.round((finishedAt - startedAt) * 10) / 10);
      setIsLoading(false);
    }
  }

  const value = 'World';
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-lg border border-slate-200 px-8 py-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Hello {value}
        </h1>

        <div className="mt-6">
          <button
            type="button"
            onClick={callApi}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isLoading ? 'Calling API…' : 'Call API'}
          </button>

          <div className="mt-4 text-left">
            {durationMs !== null && (
              <div className="text-sm text-slate-500">Time taken: {durationMs} ms</div>
            )}

            {error && (
              <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </div>
            )}

            {data && (
              <pre className="mt-2 overflow-auto rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                {data}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
