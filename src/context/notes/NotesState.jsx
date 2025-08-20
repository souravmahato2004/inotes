import { useState } from 'react'
import NoteContext from './NotesContext'

export default function NotesState(props) {
  const host='http://localhost:5000';
  const initialNotes=[]

  const [notes,setNotes]=useState(initialNotes);

  const addNote=async(title,description,tag)=>{
    const response= await fetch(`${host}/api/notes/addnote`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ODc0NWQyZTRiM2JhZTdiNmIzYjU5In0sImlhdCI6MTc1NDk5NjM3Mn0.EWPAOwy_Oio-3N0gbGyeTlQzZJbbk-jt9XNp0rAhxyw'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    const note={
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": title,
    "description": description,
    "tag": tag,
    "_id": "68a628c8aaa497ec6c5ec2b4",
    "date": "2025-08-20T19:58:00.080Z",
    "__v": 0
  }
    setNotes(notes.concat(note));
  }

  const getNotes=async()=>{
    const response= await fetch(`${host}/api/notes/fetchnotes`,{
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ODc0NWQyZTRiM2JhZTdiNmIzYjU5In0sImlhdCI6MTc1NDk5NjM3Mn0.EWPAOwy_Oio-3N0gbGyeTlQzZJbbk-jt9XNp0rAhxyw'
      }
    });
    const json=await response.json();
    setNotes(json);
  }
  const deleteNote=async (id)=>{
    const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ODc0NWQyZTRiM2JhZTdiNmIzYjU5In0sImlhdCI6MTc1NDk5NjM3Mn0.EWPAOwy_Oio-3N0gbGyeTlQzZJbbk-jt9XNp0rAhxyw'
      }
    });
    const json=await response.json();
    setNotes(json);
    const newNote=notes.filter((note)=>{return note._id!=id});
    setNotes(newNote);
  }
  const editNote=async(id,title,description,tag)=>{
    const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ODc0NWQyZTRiM2JhZTdiNmIzYjU5In0sImlhdCI6MTc1NDk5NjM3Mn0.EWPAOwy_Oio-3N0gbGyeTlQzZJbbk-jt9XNp0rAhxyw'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=response.json();

    for(let index=0;index<notes.length;index++){
      const ele=notes[index];
      if(ele._id==id){
        ele.title=title;
        ele.description=description;
        ele.tag=tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{notes,getNotes, deleteNote, editNote, addNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
