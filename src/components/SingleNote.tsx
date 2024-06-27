import { useState } from 'react'
import { type Note } from '../pages/Notes'
import db from '../appwrite/databases';
import DeleteIcon from '../assets/DeleteIcon';
import { NoteFormProps } from './NoteForm';

const SingleNote = ({ setNotes, noteData }: { setNotes: NoteFormProps, noteData: Note }) => {
  const [note, setNote] = useState<Note>(noteData);

  /* 
    handleUpdate() and handleDelete() are made 'async' just to remind us that this function  
    contains asynchronous functionality. If we want we can remove 'async' here and still our 
    code will run the same way it's working right now because we are not using anything here 
    like await or something else which might require function to be async
  */
  const handleUpdate = async () => {
    const completed = !note.completed;
    db.notes.update(note.$id, { completed });
    setNote({ ...note, completed: completed });
  }

  const handleDelete = async () => {
    db.notes.delete(note.$id);
    setNotes(prevNotes => prevNotes.filter((item) => item.$id !== note.$id));
  }

  return (
    <div>
      <span onClick={handleUpdate}>
        {note.completed ? <s>{note.body}</s> : <>{note.body}</>}
      </span>
      <div onClick={handleDelete}>
        <DeleteIcon />
      </div>
    </div>
  )
}

export default SingleNote;