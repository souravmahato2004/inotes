import { useContext } from "react"
import NoteContext from "../context/notes/NotesContext";
import Notes from "./Notes";
import AddNote from "./AddNote";
export default function Home() {
  const contex=useContext(NoteContext);
  const {notes,setNotes}=contex;
  return (
    <>
    <div className="container">
      <AddNote/>
      <Notes/>
    </div>
    </>
  )
}
