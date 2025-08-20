import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NotesContext";
import Noteitem from "./Noteitem";
export default function Notes() {
    const context= useContext(NoteContext);
    const {notes,getNotes}=context;
    useEffect(()=>{
        getNotes()
    },[])
    return (
        <>
        <div className="container">
            <h1>You Notes</h1>
            <div className="row">{notes.map((note)=>{
                return(<Noteitem key={note._id} note={note}/>)
            })}</div>
        </div>
        </>
    )
}
