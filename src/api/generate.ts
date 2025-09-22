// Mock API endpoint for app generation
// In a real implementation, this would be a backend service

export interface GenerateRequest {
  prompt: string;
  framework: string;
  model: string;
}

export interface GenerateResponse {
  code: string;
  preview?: string;
  error?: string;
}

// Simulated code templates for different frameworks
const codeTemplates = {
  react: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generated React App</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </header>
    </div>
  );
}

export default App;`,
  
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
  
  // Get base template for framework
  const baseCode = codeTemplates[request.framework as keyof typeof codeTemplates] || codeTemplates.react;
  
  // In a real implementation, this would call actual AI APIs
  // For now, we'll return a modified template based on the prompt
  const enhancedCode = enhanceCodeWithPrompt(baseCode, request.prompt, request.framework);
  
  return {
    code: enhancedCode,
    preview: `data:text/html;base64,${btoa(generatePreviewHTML(enhancedCode, request.framework))}`
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

function generatePreviewHTML(code: string, framework: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .preview-container { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="preview-container">
        <h2>Preview - ${framework} App</h2>
        <p>This is a preview of your generated ${framework} application.</p>
        <pre><code>${code.substring(0, 200)}...</code></pre>
    </div>
</body>
</html>`;
}