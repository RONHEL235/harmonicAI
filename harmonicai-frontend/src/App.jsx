import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [midiFile, setMidiFile] = useState(null);

  // Handle file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Send file to the backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // Send to backend
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        setMidiFile(url);  // Set MIDI file URL to play or download
      } else {
        alert('Error uploading the file.');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>HarmonicAI</h1>
      <p>First choose instrument then harmonify</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Harmonify</button>

      {midiFile && (
        <div>
          <h3>Processed MIDI File:</h3>
          <audio controls>
            <source src={midiFile} type="audio/midi" />
            Your browser does not support the audio element.
          </audio>
          <br />
          <a href={midiFile} download="harmonified.mid">Download MIDI</a>
        </div>
      )}
    </div>
  );
}

export default App;
