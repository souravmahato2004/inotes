import { useContext, useState } from "react"
import NoteContext from "../context/notes/NotesContext"
export default function AddNote() {
    const contex=useContext(NoteContext);
    const {addNote}=contex;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})

    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <h1>Add a Note</h1>
        <form>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Note</button>
        </form>
    </div>
  )
}
