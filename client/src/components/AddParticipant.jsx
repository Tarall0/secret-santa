import React from 'react'

export default function AddParticipant() {
  return (
        <div className='input-container'>
              <h2>Add Participants</h2>
              <p className='expl'>Enter the partecipants, you will need to add an e-mail address of the user, in order for the Secret Santa to be sent to them.</p>
              <div className='input'>
                <div className='input-box'>
                  <label>
                    <FontAwesomeIcon icon={faUser}/>
                  </label>
                <input
                  type="text"
                  placeholder="Enter participant's name"
                  value={newParticipantName}
                  onChange={(e) => setNewParticipantName(e.target.value)}
                />
                </div>
                <div className='input-box'>
                  <label>
                    <FontAwesomeIcon icon={faAt}/>
                  </label>
                  <input
                      type="email"
                      placeholder="Enter participant's email"
                      value={participantEmail}
                      onChange={(e) => setParticipantEmail(e.target.value)}
                    />
                </div>
                <div className='add-butt'>
                  <button onClick={handleAddParticipant}>Add Participant</button>
                </div>
              </div>
        </div>
  )
}
