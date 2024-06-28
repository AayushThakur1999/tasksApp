import { useState, useEffect } from 'react';
import db from '../appwrite/databases'
import { Query, type Models } from 'appwrite';
import NoteForm from '../components/NoteForm';
import SingleNote from '../components/SingleNote';
import ThemeOption from '../components/ThemeOption';

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
    <>
      <div>
        <h1 className='text-4xl font-bold my-6'>✍🏻My Todo List</h1>
      </div>

      <div className="flex gap-3">
        <ThemeOption theme='dark' />
        <ThemeOption theme='light' />
        <ThemeOption theme='purple' />
      </div>
      <NoteForm setNotes={setNotes} />

      <div>
        {notes.map(note => {
          return (
            <SingleNote key={note.$id} setNotes={setNotes} noteData={note} />
          )
        })}
      </div>
    </>
  )
}

export default Notes