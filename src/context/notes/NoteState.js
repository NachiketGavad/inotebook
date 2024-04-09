import { useContext } from "react";
import NoteContext  from "./NoteContext";

import React from 'react'

const NoteState = (props) => {
    const state = {
        "name":"nachi",
        "class":"1"
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

