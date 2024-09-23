import librosa

def process_audio(audio_file):
    y, sr = librosa.load(audio_file, sr=22050)
    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr)
    pitch_values = [p for p in pitches if p > 0]  # Simplified
    return pitch_values