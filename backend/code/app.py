from flask import Flask, request, jsonify
from audio_processing import process_audio
from midi_generator import generate_midi

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_melody():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    processed_data = process_audio(audio_file)
    midi_file = generate_midi(processed_data)
    
    return jsonify({"message": "MIDI generated successfully", "midi": midi_file})

if __name__ == '__main__':
    app.run(debug=True)