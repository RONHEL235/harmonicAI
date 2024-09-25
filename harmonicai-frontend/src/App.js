import React from 'react';
import './App.css';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React File Upload with Flask</h1>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
