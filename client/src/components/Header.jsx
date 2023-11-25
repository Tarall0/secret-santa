import React from 'react'
import Countdown from './Countdown'
import Snow from './Snow'

export default function Header() {
  return (
    <>
    <div className="santa">
        <div className="circles"></div>
    <div className="snow"></div>
    <div className="hat">
        <div className="hat-end"></div>
    </div>
    <div className="face">
    <div className="eyes"></div>
    <div className="mouth"></div>
    </div>
    <div className="dirty-overflow">
    <div className="body"></div>
        </div>
    </div>

    <h1 className='head'>Secret Santa</h1>
    <Countdown/>
    <Snow/>
    </>
  )
}
