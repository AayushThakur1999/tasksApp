import { useState, useEffect } from 'react';
import { databases } from '../appwrite/config';
import { Models } from 'appwrite';

type Note = Models.Document[]

const Notes = () => {
  const [notes, setNotes] = useState<Note>([]);

  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_NOTES,
      []
    )
    setNotes(response.documents);
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