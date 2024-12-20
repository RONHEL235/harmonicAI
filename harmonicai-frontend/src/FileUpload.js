import React, { useState } from 'react';

const FileUpload = () => {
  // State to hold the selected file and upload status messages
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Function to handle file selection inside the application.
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const onFileUpload = async () => {
    // If no file is selected, update status message and return
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    // Initialize form data and append the selected file to it
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make a POST request to the Flask backend to upload the file
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      //If the response is okay get the file as binary data 
      if (response.ok) {
        const blob = await response.blob();  // Get the file as binary data
        const downloadUrl = URL.createObjectURL(blob);

        // Create a temporary link to download the file
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = selectedFile.name.replace(/\.[^/.]+$/, ".mp3"); // Replace extension if converting to MP3
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setUploadStatus('File uploaded and downloaded successfully.');
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      // Handle any errors encountered during the upload
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  // Render the file upload UI (More work to be done on this)
  return (
    <div>
      <h2>File Upload to Flask Backend</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload and Convert
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
