import React from 'react';
import { Rocket } from 'lucide-react';
import { AppGenerator } from './components/AppGenerator';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Unlimited AI Code Generator</h1>
              <p className="text-xs text-gray-400">Generate unlimited apps with unlimited models</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8">
        <AppGenerator />
      </div>
    </div>
  );
}

export default App;