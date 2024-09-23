from flask import Flask, request, send_file
from audio_processing import process_audio
from midi_generator import generate_midi

app = Flask(__name__)

@app.route('/harmonize', methods=['POST'])
def harmonize():
    if 'audio' not in request.files:
        return {"error": "No file uploaded"}, 400
    audio_file = request.files['audio']
    pitch_data = process_audio(audio_file)
    midi_file = generate_midi(pitch_data)
    return send_file(midi_file, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
