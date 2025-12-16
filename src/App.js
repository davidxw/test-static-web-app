import React from 'react';

function App() {
  const value = 'World';
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-lg border border-slate-200 px-8 py-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Hello {value}
        </h1>
        <p className="mt-3 text-slate-600 text-lg">
          It's great to be here.
        </p>
      </div>
    </div>
  );
}

export default App;
