import { useState, useEffect } from 'react';
import db from '../appwrite/databases'
import { Query, type Models } from 'appwrite';
import NoteForm from '../components/NoteForm';

export interface Note extends Models.Document {
  body: string;
  completed: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    const response = await db.notes.list([Query.orderDesc('$createdAt')]);
    const validNotes = response.documents.filter((doc): doc is Note =>
      typeof doc.body === 'string' && typeof doc.completed === 'boolean'
    );
    setNotes(validNotes);
  }
  return (
    <div className='mt-6 text-center text-2xl'>
      <NoteForm setNotes={setNotes} />
      <div>
        {notes.map(note => {
          return (
            <div key={note.$id}>
              {note.body}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Notes