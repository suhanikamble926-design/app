export interface GenerateRequest {
  prompt: string;
  framework: string;
  model: string;
}

export interface GenerateResponse {
  code: string;
  preview?: string;
  error?: string;
  metadata?: {
    linesOfCode: number;
    filesGenerated: number;
    estimatedLoadTime: string;
    techStack: string[];
  };
}

const modernCodeTemplates = {
  react: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Modern React App
          </h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <p className="text-gray-600 dark:text-gray-300">Your generated app with modern features!</p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;`,
  nextjs: `import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Next.js App | AI Generated</title>
        <meta name="description" content="Modern Next.js application" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-8">
            Welcome to Next.js 14
          </h1>
          <p className="text-xl text-center text-gray-600">
            Built with the latest features and optimizations
          </p>
        </div>
      </main>
    </>
  );
}
`,

  vue: `<template>
  <div id="app">
    <header>
      <h1>Generated Vue App</h1>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
    </header>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>`,

  angular: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div>
      <header>
        <h1>Generated Angular App</h1>
        <p>Count: {{count}}</p>
        <button (click)="increment()">Increment</button>
      </header>
    </div>
  \`
})
export class AppComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
}`
};

export const generateApp = async (request: GenerateRequest): Promise<GenerateResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // Simulate occasional errors for testing
  if (Math.random() < 0.1) {
    throw new Error('AI service temporarily unavailable');
  }
  
  const baseCode = modernCodeTemplates[request.framework as keyof typeof modernCodeTemplates] || modernCodeTemplates.react;
  
  // In a real implementation, this would call actual AI APIs
  // For now, we'll return a modified template based on the prompt
  const enhancedCode = enhanceCodeWithPrompt(baseCode, request.prompt, request.framework);
  
  return {
    code: enhancedCode,
    preview: `data:text/html;base64,${btoa(generatePreviewHTML(enhancedCode, request.framework))}`,
    metadata: {
      linesOfCode: enhancedCode.split('\n').length,
      filesGenerated: Math.floor(Math.random() * 8) + 3,
      estimatedLoadTime: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
      techStack: getTechStack(request.framework, request.prompt)
    }
  };
};

function enhanceCodeWithPrompt(baseCode: string, prompt: string, framework: string): string {
  // Simple prompt-based code enhancement
  // In reality, this would use AI APIs to generate custom code
  
  let enhancedCode = baseCode;
  
  // Add features based on prompt keywords
  if (prompt.toLowerCase().includes('todo')) {
    enhancedCode = enhancedCode.replace(
      'Count: {count}',
      'Todo Items: {todos.length}'
    ).replace(
      'const [count, setCount] = useState(0);',
      'const [todos, setTodos] = useState([]);'
    );
  }
  
  if (prompt.toLowerCase().includes('dark mode')) {
    enhancedCode = enhancedCode.replace(
      'const [count, setCount] = useState(0);',
      'const [count, setCount] = useState(0);\n  const [darkMode, setDarkMode] = useState(false);'
    );
  }
  
  // Add comment with prompt for context
  enhancedCode = `// Generated based on prompt: "${prompt}"\n// Framework: ${framework}\n\n${enhancedCode}`;
  
  return enhancedCode;
}

function getTechStack(framework: string, prompt: string): string[] {
  const baseStack = [framework, 'TypeScript', 'Tailwind CSS'];

  if (prompt.toLowerCase().includes('auth')) baseStack.push('Auth');
  if (prompt.toLowerCase().includes('database') || prompt.toLowerCase().includes('data')) baseStack.push('Supabase');
  if (prompt.toLowerCase().includes('api')) baseStack.push('REST API');
  if (prompt.toLowerCase().includes('animation')) baseStack.push('Framer Motion');
  if (prompt.toLowerCase().includes('chart') || prompt.toLowerCase().includes('graph')) baseStack.push('Recharts');

  return baseStack;
}

function generatePreviewHTML(code: string, framework: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .preview-container {
          max-width: 1200px;
          margin: 40px auto;
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .code-preview {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: #10b981;
          color: white;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="mb-6">
          <span class="badge">AI Generated</span>
          <span class="badge" style="background: #3b82f6;">${framework.toUpperCase()}</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Your ${framework} Application</h2>
        <p class="text-gray-600 mb-6">Production-ready code generated with latest patterns and best practices</p>
        <div class="code-preview">
          <pre>${code.substring(0, 400).replace(/</g, '&lt;').replace(/>/g, '&gt;')}...</pre>
        </div>
    </div>
</body>
</html>`;
}