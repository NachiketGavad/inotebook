import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const {notes,addNote} = useContext(NoteContext);
  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
