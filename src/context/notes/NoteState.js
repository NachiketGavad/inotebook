import { useContext, useState } from "react";
import NoteContext from "./NoteContext";

import React from "react";

const NoteState = (props) => {
  const notesinitial = [];

  const host = process.env.REACT_APP_HOST;

  const [notes, setNotes] = useState(notesinitial);

  //fetch all notes
  const fetchAllNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/GetNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth_token":
          localStorage.getItem('token')
      },
      body: JSON.stringify(), // body data type must match "Content-Type" header
    });
    const jsonbody = await response.json();
    // console.log(jsonbody);
    if(jsonbody.success){
      setNotes(jsonbody.notes);
    }
  };

  // add note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/CreateNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth_token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const jsonbody = await response.json();

    let note = jsonbody;
    // console.log(note);
    if (note) setNotes(notes.concat(note));
  };

  // delete note
  const deleteNote = async (_id) => {
    // api call
    const response = await fetch(`${host}/api/notes/DeleteNote/${_id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth_token":
          localStorage.getItem('token')
      },
      body: JSON.stringify(), // body data type must match "Content-Type" header
    });
    const jsonbody = await response.json();
    // console.log(jsonbody);

    // client side
    let cur = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(cur);
    return jsonbody.success;
  };

  // Edit note
  const editNote = async (_id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/UpdateNote/${_id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth_token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const jsonbody = await response.json();
    // console.log(jsonbody);

    // edit logic in client
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id == _id) {
        element._id = _id;
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes,setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
