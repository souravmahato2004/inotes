import { useContext, useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NotesContext";
import Noteitem from "./Noteitem";
export default function Notes() {
    const context= useContext(NoteContext);
    const {notes,getNotes,editNote}=context;
    useEffect(()=>{
        getNotes()
    },[])
    const ref=useRef(null)
    const refClose=useRef(null)
    
    const updateNote=(currnote)=>{
        ref.current.click();
        setNote({id:currnote._id,etitle:currnote.title,edescription:currnote.description, etag:currnote.tag});
    }
    
    const [enote,setNote]=useState({id:"", etitle:"",edescription:"",etag:""})

    const handleSubmit=(e)=>{
        e.preventDefault();
        editNote(enote.id,enote.etitle,enote.edescription,enote.etag);
        refClose.current.click();

    }
    const handleChange=(e)=>{
        setNote({...enote,[e.target.name]:e.target.value});
    }

    return (
        <>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={enote.etitle} className="form-control" id="etitle" name="etitle" onChange={handleChange} />
                </div>
                <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" value={enote.edescription} className="form-control" id="edescription" name="edescription" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text"value={enote.etag} className="form-control" id="etag" name="etag" onChange={handleChange}/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={enote.edescription.length<5 || enote.etitle.length<5} className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <div className="container">
            <h1>You Notes</h1>
            <div className="row">{notes.map((note)=>{
                return(<Noteitem key={note._id} updatenote={updateNote} note={note}/>)
            })}</div>
        </div>
        </>
    )
}
