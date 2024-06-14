import React from 'react';
import { FlatList, Text, StyleSheet, View, Button } from 'react-native';
import { Note, deleteNote } from '@/adapters/db';

interface NoteListProps {
  notes: Note[];
  onDeleteNote: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    onDeleteNote();
  };

  return (
    <FlatList
      data={notes}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.text}</Text>
          <Button title="Löschen" onPress={() => handleDeleteNote(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NoteList;
