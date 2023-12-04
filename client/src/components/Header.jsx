import React from 'react'
import Countdown from './Countdown'
import Snow from './Snow'

export default function Header() {
  return (
    <>
    <div className="santa-container">
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="star">
      </div>
      <div className="santa">
        <div className="hat">
          <div className="end">
          </div>
        </div>
        <div className="face">
          <div className="eyes">
            <div className="right-eye">
            </div>
            <div className="left-eye">
            </div>
          </div>
          <div className="mouth">
          </div>
          
        </div>
        <div className="body">
          <div className='arm'>

          </div>
          <div className="buttons">
          </div>
          <div className="buttons">
          </div>
          <div className="buttons">
          </div>
        </div>
        <div className="sack">
        </div>
      </div>
    </div>

    <h1 className='head'>Secret Santa</h1>
    <Countdown/>
    <Snow/>
    </>
  )
}
