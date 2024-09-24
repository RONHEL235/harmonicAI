import React, { useState } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    setAudioURL(url);
  };

  return (
    <div>
      <h1>Upload and Process Audio</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
};

export default App;
