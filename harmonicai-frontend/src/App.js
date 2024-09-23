import React, { useState } from "react";
import * as Tone from "tone";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [midiUrl, setMidiUrl] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleHarmonify = async () => {
    if (!selectedFile) return alert("Please upload a file first!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("YOUR_BACKEND_URL", {
        method: "POST",
        body: formData,
      });
      const result = await response.json(); // Assuming backend returns MIDI URL
      setMidiUrl(result.midiUrl);
      playMidi(result.midiUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const playMidi = async (url) => {
    const midi = await fetch(url).then((res) => res.arrayBuffer());
    const midiData = new Tone.Midi(midi);

    midiData.tracks.forEach((track) => {
      const synth = new Tone.Synth().toDestination();
      track.notes.forEach((note) => {
        synth.triggerAttackRelease(note.name, note.duration, note.time);
      });
    });
    Tone.Transport.start();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>HarmonicAI</h1>
        <div className="instrument-buttons">
          <button>Guitar</button>
          <button>Piano</button>
          <button>Drums</button>
          <button>Keyboard</button>
          <button>Violin</button>
          <button>Trumpet</button>
        </div>
        <input type="file" onChange={handleFileUpload} />
        <button className="harmonify-btn" onClick={handleHarmonify}>
          Harmonify
        </button>
        {midiUrl && (
          <a href={midiUrl} download>
            Download MIDI
          </a>
        )}
      </div>
      <div className="footer">
        <p>Made with harmony and love.</p>
        <button className="logout-btn">Log out</button>
      </div>
    </div>
  );
}

export default App;
