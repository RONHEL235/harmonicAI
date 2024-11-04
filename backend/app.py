from flask import Flask, request, send_file
from flask_cors import CORS
import os
from pydub import AudioSegment
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Allow requests only from your frontend (localhost:3001)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Define allowed file extensions
ALLOWED_EXTENSIONS = {'wav', 'mp3'}

# Function to check if the file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    if not allowed_file(file.filename):
        return 'Unsupported file extension', 400

    # Create uploads directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    # Save file temporarily
    filename = secure_filename(file.filename)
    file_path = os.path.join('uploads', filename)
    file.save(file_path)

    try:
        # Process the file with pydub (example: convert to mp3)
        audio = AudioSegment.from_file(file_path)
        output_path = os.path.join('uploads', f"{os.path.splitext(filename)[0]}.mp3")
        audio.export(output_path, format='mp3')

        # Send the processed file back
        return send_file(output_path, as_attachment=True)

    except Exception as e:
        return str(e), 500

    finally:
        # Clean up temporary files
        if os.path.exists(file_path):
            os.remove(file_path)
        if os.path.exists(output_path):
            os.remove(output_path)

if __name__ == '__main__':
    app.run(debug=True)
