from flask import Flask, request, send_file
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Process file here (e.g., convert to MIDI)
    processed_midi = process_to_midi(file_path)
    
    return send_file(processed_midi, as_attachment=True)

def process_to_midi(file_path):
    # Your logic to convert to MIDI goes here
    processed_midi_path = 'path_to_generated_midi.mid'
    return processed_midi_path

if __name__ == '__main__':
    app.run(debug=True, port=5000)
