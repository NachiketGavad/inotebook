import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AlertContext from '../context/AlertContext';

const AddNote = () => {
  const { notes, addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const {alert,alertCapitalize,showAlert} = useContext(AlertContext);
    
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(note);
    addNote(note.title, note.description, note.tag);
    setNote({id:"", title: "", description: "", tag: "" });
    showAlert("New Note Created Successfully","success");
  };
  return (
    <div>
      <div className="row border p-3 mx-2">
        {/* This is Home */}
        <h2 className="text-center"> Add Notes</h2>
        <form>
          {/* action="post" */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              minLength={3}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              minLength={5}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Note Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleClick}
            disabled={note.title.length < 3 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
