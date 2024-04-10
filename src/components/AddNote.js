import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const AddNote = () => {
  const {notes,addNote} = useContext(NoteContext);

  const [note,setNote] = useState({title:"",description:"",tag:""})

  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value});
    // console.log(note);
  }

  const handleClick = (e)=>{
    e.preventDefault();
    // console.log(note);
    addNote(note.title,note.description,note.tag);
  }
  return (
    <div>
      <div className="container my-3 md-3 lg-3">
        {/* This is Home */}
        <h2> Add Notes</h2>
        <form>
          {/* action="post" */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input type="text" className="form-control" id="title" name="title"   onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Note Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag"  onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
