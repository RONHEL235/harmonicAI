from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Figure out how to fix this 
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    
    # Save file temporarily
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Process the file with pydub (example: convert to mp3)
    audio = AudioSegment.from_file(file_path)
    output_path = file_path.replace('.wav', '.mp3')  # Example for WAV to MP3 conversion
    audio.export(output_path, format='mp3')

    # Send the processed file back
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
