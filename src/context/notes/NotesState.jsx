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
    const note=await response.json();
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
    console.log(json);
    const newNote=notes.filter((note)=>{return note._id!=id});
    setNotes(newNote);
  }
  const editNote=async(id,title,description,tag)=>{
    const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ODc0NWQyZTRiM2JhZTdiNmIzYjU5In0sImlhdCI6MTc1NDk5NjM3Mn0.EWPAOwy_Oio-3N0gbGyeTlQzZJbbk-jt9XNp0rAhxyw'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    console.log(json);

    const newNote=JSON.parse(JSON.stringify(notes));
    for(let index=0;index<notes.length;index++){
      const ele=notes[index];
      if(ele._id==id){
        newNote[index].title=title;
        newNote[index].description=description;
        newNote[index].tag=tag;
        break;
      }
    }
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{notes,getNotes, deleteNote, editNote, addNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
