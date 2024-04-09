import { useContext, useState } from "react";
import NoteContext  from "./NoteContext";

import React from 'react'

const NoteState = (props) => {
    const state = {
        "name":"nachi",
        "class":"1"
    }
    const notesinitial = [
        {
          "_id": "661567et2eb72c3096462dffcbba9",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 13 user 1",
          "description": "skdjflfsf",
          "tag": "skfjk",
          "date": "2024-04-09T16:05:02.600Z",
          "__v": 0
        },
        {
          "_id": "6615673db72c30ad96462cafdbbad",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 143 usedr 1",
          "description": "skdjflffsf",
          "tag": "skfjk",
          "date": "2024-04-09T16:05:17.977Z",
          "__v": 0
        },
        {
          "_id": "66156745b72c3096462dfcfdbbaf",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 14a3 usedr 1",
          "description": "skddjflffsf",
          "tag": "skfjkf",
          "date": "2024-04-09T16:05:25.987Z",
          "__v": 0
        },,
        {
          "_id": "6615673db72c309fdsaf6462cbbad",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 143 usedr 1",
          "description": "skdjflffsf",
          "tag": "skfjk",
          "date": "2024-04-09T16:05:17.977Z",
          "__v": 0
        },
        {
          "_id": "66156745b72c309fda6462cbbaf",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 14a3 usedr 1",
          "description": "skddjflffsf",
          "tag": "skfjkf",
          "date": "2024-04-09T16:05:25.987Z",
          "__v": 0
        },
        {
          "_id": "6615675bb72c3fadf096462cbbbb",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": "note 14af3 usaedr 1",
          "description": "skddjflffsff",
          "tag": "skfjkfaf",
          "date": "2024-04-09T16:05:47.621Z",
          "__v": 0
        }
      ]

      const [notes,setNotes] = useState(notesinitial);

      // add note
      const addNote = (title,description,tag)=>{
        let note = {
          "_id": "6615675bb72c3fadf096462cbbbb",
          "user": "661438f98f2bf19ef6ebf81c",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-04-09T16:05:47.621Z",
          "__v": 0
        };
        // Notes.push(note);
        setNotes(notes.concat(note));
      }

    return (
        <NoteContext.Provider value={{notes,addNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

