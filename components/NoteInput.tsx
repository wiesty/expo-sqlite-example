import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { insertNote } from '@/adapters/db';

interface NoteInputProps {
  onAddNote: () => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [note, setNote] = useState('');

  const handleAddNote = async () => {
    if (note.trim().length > 0) {
      await insertNote(note);
      setNote('');
      onAddNote();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Geben Sie eine Notiz ein"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Hinzufügen" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default NoteInput;
