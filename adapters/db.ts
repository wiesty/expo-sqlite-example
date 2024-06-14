import * as SQLite from 'expo-sqlite';

export type Note = {
  id: number;
  text: string;
};


// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';

// const dbPath = `${FileSystem.documentDirectory}notes/notes.db`;

// await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}notes`, { intermediates: true });


// const db = await SQLite.openDatabaseAsync(dbPath);





// Datenbank öffnen 
const db = SQLite.openDatabaseAsync('notes.db');

export const createTable = async () => {
  try {
    await (await db).execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
      );
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table', error);
  }
};

export const insertNote = async (text: string) => {
  try {
    const result = await (await db).runAsync('INSERT INTO notes (text) VALUES (?);', text);
    console.log('Note inserted successfully', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting note', error);
  }
};

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const notes = await (await db).getAllAsync<Note>('SELECT * FROM notes;');
    return notes;
  } catch (error) {
    console.error('Error fetching notes', error);
    return [];
  }
};

export const deleteNote = async (id: number) => {
  try {
    await (await db).runAsync('DELETE FROM notes WHERE id = ?;', id);
    console.log('Note deleted successfully');
  } catch (error) {
    console.error('Error deleting note', error);
  }
};
