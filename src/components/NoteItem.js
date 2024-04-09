import React from "react";

const NoteItem = (props) => {
  return (
    <div className="col-md-3">
      <div className="card mx-2 my-2">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title mx-2">{props.title}</h5>
            <i className="fa fa-trash mb-2 mx-2"></i>
            <i className="fa fa-edit mb-2 mx-2"></i>
          </div>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
