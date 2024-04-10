import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <div className="col-md-8 mx-auto">
      <AddNote/>
      <hr/>
      <Notes/>
    </div>
  );
};

export default Home;
