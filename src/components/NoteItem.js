import React,{useContext} from "react"
import NoteContext from "../context/notes/NoteContext";
import AlertContext from '../context/AlertContext';


const NoteItem = (props) => {
    const {deleteNote,editNote} = useContext(NoteContext);
    const {note,updateNote} = props;
    const {alert,alertCapitalize,showAlert} = useContext(AlertContext);
    
  return (
    <div className="col-md-3">
      <div className="card mx-2 my-2">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title mx-2">{note.title}</h5>
            <i className="fa fa-trash mb-2 mx-2" onClick={()=>{deleteNote(note._id)?showAlert('Deleted Successfully','success'):showAlert('Error in Deleting Note','danger')}}></i>
            <i className="fa fa-edit mb-2 mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
