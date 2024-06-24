import { useState, useEffect } from 'react';
import db from '../appwrite/databases'
import { type Models } from 'appwrite';

interface Note extends Models.Document {
  body: string;
  completed: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    /* 
      We use type assertion here because we are certain that 
      response.documents contains body and completed properties 
    */
    setNotes(response.documents as Note[]);
  }
  return (
    <div className='mt-6 text-center text-2xl'>
      {notes.map(note => {
        return (
          <div key={note.$id}>
            {note.body}
          </div>
        )
      })}
    </div>
  )
}

export default Notes