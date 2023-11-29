import { useState, useEffect } from 'react';
import confetti from "https://esm.run/canvas-confetti@1";
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Santa() {
  const [showSanta, setShowSanta] = useState(false);
  const [username, setUsername] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [temporaryUsername, setTemporaryUsername] = useState("");
  const [participants, setParticipants] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [numParticipants, setNumParticipants] = useState(0);
  const [groupName, setGroupName] = useState("Your Group's name");
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [timestamp, setTimestamp] = useState('');

  //Show the main app 
  const handleShow = () => {
    if(!showSanta) setShowSanta(true)
  }

  // Function to send participant data to the server in order to send the e-mail
  const sendParticipantData = async () => {
    try {
      const allParticipants = [...participants];

      // Make a POST request to server
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants: allParticipants, organizer: username, date: timestamp }),
      });

      if (response.ok) {
        setMessage("🎁 Secret Santas assigned and email sent to each participant!");

        setTimeout(() => {
          setMessage("");
        }, 5000);

        confetti({
          particleCount: 150,
          spread: 60
        });
      } else {
        setMessage("❌ Error, please try again.");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending participant data:', error);
    }
  };

  // Add Participant to the santa group
  const handleAddParticipant = () => {
      if (newParticipantName.trim() !== '') {
        const randomEmoji = getRandomEmoji();
        setParticipants([...participants, { 
          name: newParticipantName, 
          email: participantEmail, 
          emoji: randomEmoji }]);
        setNewParticipantName('');
        setParticipantEmail('');
        setNumParticipants(numParticipants + 1);
      }
  }

  // Generate random emoji
  const getRandomEmoji = () => {
    const emojis = ["🎁", "🎅", "❄️", "☃️", "🎄", "🕯️", "⛄", "🌟", "🦌", "🤶", "🧑‍🎄", "👼"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
  const handleSanta = () => {
    if (numParticipants >= 2) {
      const santasAssigned = assignSantas([...participants]);  
      setAssignments(santasAssigned);
      // Send participant function to send to call the backened
      sendParticipantData();
    } else{
      setMessage('❌ Number of participants must be at least two for Secret Santa!');
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } 
  };

// Handle user's name and email (organizer)
const handleSubmitUsername = () => {
  if (temporaryUsername.trim() !== '') {
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const formattedTimestamp = currentDate.toLocaleDateString('en-US', options);
      setTimestamp(formattedTimestamp);

      // Check if the organizer is already in the list
      const organizerExists = participants.some(participant => participant.name === temporaryUsername);
      if (!organizerExists) {
          setUsername(temporaryUsername);
          setTemporaryUsername('');
          setNumParticipants(numParticipants + 1);

          // Add the organizer only if they don't exist in the list
          setParticipants(prevParticipants => [
              ...prevParticipants,
              {
                  name: temporaryUsername,
                  email: organizerEmail,
                  emoji: getRandomEmoji()
              }
          ]);
      }
   }
}

// Assigning Santas with partecipants as parameter 
const assignSantas = (participants) => {
  // Shuffle the participants array randomly
  const shuffledParticipants = participants.sort(() => Math.random() - 0.5);
  // Pair each participant with the next one and ensure the last participant is paired with the first one so all partecipants have a santa assigned
  const santasAssigned = shuffledParticipants.map((participant, index) => ({
      participant,
      santa: shuffledParticipants[(index + 1) % shuffledParticipants.length],
      emoji: participant.emoji,
  }));

  return santasAssigned;
};



  return (
    <>
   {!showSanta && ( <div className='intro-santa'>
    <p>
    This application allows users to organize Secret Santa events for their groups. Please insert <b>Your Group's name</b> and your name, and then add all the participants.  It assigns Secret Santas randomly
    </p>

    <div className='button-santa'>
            
          
              <>
              <button onClick={handleShow}>Start Santa
                  <span className='snow'></span>
                  <span className='snow'></span>
                  <span className='snow'></span>
              </button>
              </>
      
      </div>
    </div>)}
    {message && (<div className='show-message'> {message} </div>)}
    {showSanta &&(
    <div className={!assignments.length > 0 ?("main-grid") : ("single-grid")}>
      {!assignments.length > 0 &&(<div className='santa-box'>
        <div className='header'>
        <input
                type="text"
                placeholder="Enter your group's name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
        </div>
        <div className='input-container'>
          <h2>Your Details</h2>
        {!username &&(<p className='expl'>
              Enter your name and your email address
          </p>)}
         { username && (<p className='expl'> {username} - {organizerEmail}</p>)}
          {!username && (
             <div className='input'>
                <div className='input-box'>
                  <label>
                    <FontAwesomeIcon icon={faUser}/>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={temporaryUsername}
                    onChange={(e) => setTemporaryUsername(e.target.value)}
                  />
                </div>
             <div className='input-box'>
                <label>
                  <FontAwesomeIcon icon={faAt}/>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={organizerEmail}
                  onChange={(e) => setOrganizerEmail(e.target.value)}
                />
              </div>
              <div className='submit-butt'>
                  <button onClick={handleSubmitUsername}>Submit</button>
              </div>
           </div>
          )}
        </div>
        {username && (
          <>
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
                  <button onClick={handleAddParticipant}>Add User</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>)}

      <div className='users-box'>
          <h2>{groupName}</h2>
          <h3>({numParticipants}) Members</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.emoji} {participant.name} <span className='email'>{participant.email}</span></li>
            ))}
          </ul>
      </div>

      {assignments.length > 0 && (
      <div className='assignments-box'>
        <h2> Assignments</h2>
     
          <div className='assigns'>
            <ul>
              {participants.map((participant, index) => (
                <li key={index}>
                  {`${participant.emoji} ${participant.name} has been assigned`}
                </li>
              ))}
            </ul>
          </div>
      </div>
    )}
    </div>)}

    {assignments.length > 0 &&(<div className='group-info'>
            <span className='date'>
             {timestamp}
            </span>
            <p>
              Organizer: {username}
            </p>
        </div>)}

        <div className='button-santa'>
            
              {numParticipants >= 1 && (
                <>
                <button onClick={handleSanta}>Assign Santas
                    <span className='snow'></span>
                    <span className='snow'></span>
                    <span className='snow'></span>
                </button>
                </>
              )}
        </div>
    </>
  )
}
