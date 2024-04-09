import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Home = () => {
  const Notes = useContext(NoteContext);
  return (
    <div>
      <div className="container my-3 md-3 lg-3">
        {/* This is Home */}
        <h2> Add Notes</h2>
        <form>
          {/* action="post" */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {
            Notes.map((note)=>{
              return <NoteItem key={note._id} title={note.title}  description={note.description}/>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
