import { useContext } from "react";
import NoteContext from "../context/notes/NotesContext";

export default function Noteitem(props) {
  const {note, updatenote}=props;
  const context= useContext(NoteContext);
  const {deleteNote, editNote}=context;
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <div className="d-flex"> 
            <div className="fs-4"><i className="ri-delete-bin-fill" onClick={()=>{deleteNote(note._id)}}></i></div>
            <div className="mx-2 fs-4"><i className="ri-edit-box-fill" onClick={()=>{updatenote(note)}}></i></div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
