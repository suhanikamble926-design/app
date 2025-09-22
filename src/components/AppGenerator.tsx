import React, { useState } from 'react';
import { Zap, Code, Download, Eye, Settings, Loader2 } from 'lucide-react';
import { generateApp as generateAppAPI } from '../api/generate';

interface GeneratedApp {
  id: string;
  name: string;
  description: string;
  code: string;
  framework: string;
  status: 'generating' | 'completed' | 'error';
  preview?: string;
}

export const AppGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedApps, setGeneratedApps] = useState<GeneratedApp[]>([]);
  const [error, setError] = useState<string | null>(null);

  const frameworks = [
    { id: 'react', name: 'React + TypeScript', icon: '⚛️' },
    { id: 'vue', name: 'Vue.js', icon: '🟢' },
    { id: 'angular', name: 'Angular', icon: '🔺' },
    { id: 'nextjs', name: 'Next.js', icon: '▲' },
    { id: 'svelte', name: 'Svelte', icon: '🧡' },
    { id: 'vanilla', name: 'Vanilla JS', icon: '📜' }
  ];

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4 Turbo', description: 'Most advanced reasoning' },
    { id: 'claude-3', name: 'Claude 3 Opus', description: 'Best for complex code' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Fast and efficient' }
  ];

  const generateApp = async () => {
    if (!prompt.trim()) {
      setError('Please provide a description of the app you want to create');
      return;
    }

    setIsGenerating(true);
    setError(null);

    const newApp: GeneratedApp = {
      id: Date.now().toString(),
      name: `Generated App ${generatedApps.length + 1}`,
      description: prompt,
      code: '',
      framework: selectedFramework,
      status: 'generating'
    };

    setGeneratedApps(prev => [newApp, ...prev]);

    try {
      // Use client-side generation function
      const result = await generateAppAPI({
        prompt,
        framework: selectedFramework,
        model: selectedModel
      });
      
      // Update the app with generated code
      setGeneratedApps(prev => 
        prev.map(app => 
          app.id === newApp.id 
            ? { ...app, code: result.code, status: 'completed', preview: result.preview }
            : app
        )
      );

    } catch (err) {
      console.error('Generation failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate app');
      
      // Update app status to error
      setGeneratedApps(prev => 
        prev.map(app => 
          app.id === newApp.id 
            ? { ...app, status: 'error' }
            : app
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCode = (app: GeneratedApp) => {
    const blob = new Blob([app.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.name.toLowerCase().replace(/\s+/g, '-')}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Generation Interface */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">AI App Generator</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your app
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a todo app with drag and drop functionality, dark mode toggle, and local storage persistence..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>

          {/* Framework Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Framework
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => setSelectedFramework(framework.id)}
                  disabled={isGenerating}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedFramework === framework.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{framework.icon}</span>
                    <span className="font-medium text-sm">{framework.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Model Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isGenerating}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {aiModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.description}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateApp}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating App...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate App</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Apps */}
      {generatedApps.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Generated Apps</h3>
          
          {generatedApps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{app.name}</h4>
                  <p className="text-gray-600 mt-1">{app.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Framework: {frameworks.find(f => f.id === app.framework)?.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'completed' ? 'bg-green-100 text-green-800' :
                      app.status === 'generating' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status === 'generating' ? 'Generating...' : 
                       app.status === 'completed' ? 'Ready' : 'Error'}
                    </span>
                  </div>
                </div>

                {app.status === 'completed' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadCode(app)}
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                )}
              </div>

              {app.status === 'generating' && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI is generating your app...</span>
                </div>
              )}

              {app.status === 'completed' && app.code && (
                <div className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Generated Code Preview</span>
                      <Code className="w-4 h-4 text-gray-500" />
                    </div>
                    <pre className="text-xs text-gray-600 overflow-x-auto max-h-32">
                      {app.code.substring(0, 500)}...
                    </pre>
                  </div>
                </div>
              )}

              {app.status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800">Failed to generate app. Please try again.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};