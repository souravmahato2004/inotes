import { useState } from 'react'
import NoteContext from './NotesContext'

export default function NotesState(props) {
  const initialNotes=[
  {
    "_id": "68a21a8260d74021d7b6f9d0",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav",
    "description": "i am describing myself",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  },
  {
    "_id": "68a21a8260d74021d7b6f9d1",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav Mahato",
    "description": "i am describing myself in my project",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  },
  {
    "_id": "68a21a8260d74021d7b6f9d2",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav Mahato",
    "description": "i am describing myself in my project",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  },
  {
    "_id": "68a21a8260d74021d7b6f9d3",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav Mahato",
    "description": "i am describing myself in my project",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  },
  {
    "_id": "68a21a8260d74021d7b6f9d4",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav Mahato",
    "description": "i am describing myself in my project",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  },
  {
    "_id": "68a21a8260d74021d7b6f9d5",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": "my name is Sourav Mahato",
    "description": "i am describing myself in my project",
    "tag": "personal",
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
  }]

  const [notes,setNotes]=useState(initialNotes);

  const addNote=(title, description, tag)=>{
    const note={
    "_id": "68a21a8260d74021d7b6f9d6",
    "user": "6898745d2e4b3bae7b6b3b59",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-08-17T18:08:02.219Z",
    "__v": 0
    }
    setNotes(notes.concat(note));
  }
  const deleteNote=()=>{

  }
  const editNote=()=>{

  }

  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
