import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faGithub } from '@fortawesome/free-brands-svg-icons'


export default function Navbar() {
  return (
    <nav>
      <a href='https://github.com/Tarall0/secret-santa'>
        <div className='button-github'>
             <FontAwesomeIcon icon={faGithub}/>GitHub
        </div>
      </a>
    </nav>
  )
}
