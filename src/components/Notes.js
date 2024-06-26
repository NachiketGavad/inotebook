import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AlertContext from '../context/AlertContext';
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const { notes,setNotes, fetchAllNotes, editNote } = useContext(NoteContext);
  const { alert, alertCapitalize, showAlert } = useContext(AlertContext);
  const history = useNavigate();

  useEffect(() => {
    //Runs when notes list changes
    // console.log(notes);
    if (localStorage.getItem('token')) {
      fetchAllNotes();
    } else {
      setNotes([]);
      history("/login");
    }
    // console.log(notes);
  }, []);

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    // console.log(ref.current)
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    // console.log(refClose.current)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    showAlert("Note Updated Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">

      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary  d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                {/* action="post" */}
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    minLength={3}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Note Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Note Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-warning" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center">Your Notes</h2>
      <div className="row">
        {(notes.length === 0) && 'No Notes to Display'}
        {
          notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
