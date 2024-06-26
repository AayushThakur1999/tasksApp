import db from '../appwrite/databases';
import { type Note } from '../pages/Notes';

export type NoteFormProps = React.Dispatch<React.SetStateAction<Note[]>>;

const NoteForm = ({ setNotes }: { setNotes: NoteFormProps }) => {
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form)
    const noteBody = formData.get('body') as string;

    if (noteBody === '') return

    try {
      const payload = { body: noteBody, completed: false }

      const newNote = await db.notes.create(payload)
      setNotes(prevNotes => [...prevNotes, newNote as Note])

      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleAdd} className='my-9'>
      <input
        type="text"
        name="body"
        placeholder="💭 What's on the agenda?"
        className='todo-input'
      />
    </form>
  )
}

export default NoteForm