import { useState } from 'react'
import { type Note } from '../pages/Notes'
import db from '../appwrite/databases';

const SingleNote = ({ noteData }: { noteData: Note }) => {
  const [note, setNote] = useState<Note>(noteData);

  const handleUpdate = async () => {
    const completed = !note.completed;
    db.notes.update(note.$id, { completed });
    setNote({ ...note, completed: completed });
  }

  return (
    <div>
      <span onClick={handleUpdate}>
        {note.completed ? <s>{note.body}</s> : <>{note.body}</>}
      </span>
    </div>
  )
}

export default SingleNote;