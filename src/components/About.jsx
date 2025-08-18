import react,{ useContext } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function About() {
  const a= useContext(NoteContext);
  return (
    <div>this is using {a.name}</div>
  )
}
