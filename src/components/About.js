import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'


const About = () => {
    const a = useContext(NoteContext);
  return (
    <div className='container col-md-5 text-center border border-primary rounded p-3'>
      <h2 className='m-3'>iNotebook</h2>
      <p>
        iNotebook is a cloud-based note storing application designed to streamline your note-taking experience. With our intuitive interface and robust features, you can effortlessly organize your notes and access them from anywhere. Whether you're a student, professional, or anyone in need of a reliable note-taking solution, INotebook has you covered. Join our growing community today and take your note-taking to the next level!
      </p>
    </div>
  )
}

export default About
