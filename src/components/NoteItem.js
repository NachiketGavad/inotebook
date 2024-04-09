import React from "react";

const NoteItem = (props) => {
  return (
    <div className="col-md-3">
      <div className="card mx-2 my-2">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
          {props.description}
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
