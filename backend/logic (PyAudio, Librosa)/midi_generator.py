from mido import MidiFile, MidiTrack, Message

def generate_midi(pitch_values):
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)
    for pitch in pitch_values:
        midi_note = librosa.hz_to_midi(pitch)
        track.append(Message('note_on', note=int(midi_note), velocity=64, time=32))
    midi.save('output_melody.mid')
    return 'output_melody.mid'
