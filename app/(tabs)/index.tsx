import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createTable, fetchNotes, Note } from '@/adapters/db';
import NoteInput from '@/components/NoteInput';
import NoteList from '@/components/NoteList';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      await createTable();
      loadNotes();
    };
    initializeDatabase();
  }, []);

  const loadNotes = async () => {
    const notes = await fetchNotes();
    setNotes(notes);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Notizen</Text>
        <NoteInput onAddNote={loadNotes} />
        <NoteList notes={notes} onDeleteNote={loadNotes} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
