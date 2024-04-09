import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'


const About = () => {
    const a = useContext(NoteContext);
  return (
    <div>
    This is About {a.name} of class {a.class}
    </div>
  )
}

export default About
