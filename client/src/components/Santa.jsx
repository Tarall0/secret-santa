import { useState, useEffect } from 'react';
import confetti from "https://esm.run/canvas-confetti@1";

export default function Santa() {
  const [username, setUsername] = useState("");
  const [temporaryUsername, setTemporaryUsername] = useState("");
  const [participants, setParticipants] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [numParticipants, setNumParticipants] = useState(0);
  const [groupName, setGroupName] = useState("Your Group's name");
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [timestamp, setTimestamp] = useState('');

// Add Participant to the santa group
const handleAddParticipant = () => {
    if (newParticipantName.trim() !== '') {
      const randomEmoji = getRandomEmoji();
      setParticipants([...participants, { name: newParticipantName, emoji: randomEmoji }]);
      setNewParticipantName('');
      setNumParticipants(numParticipants + 1);
    }
  }
// Generate random emoji
  const getRandomEmoji = () => {
    const emojis = ["🎁", "🎅", "❄️", "☃️", "🎄", "🕯️", "⛄", "🌟", "🦌", "🤶", "🧑‍🎄", "👼"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

// On button click, handle santa
const handleSanta = () => {
  if (numParticipants % 2 === 0 && numParticipants >= 2) {
    setMessage("🎁 Secret Santas assigned!");
    const santasAssigned = assignSantas([...participants]);
    setAssignments(santasAssigned);
    confetti({
      particleCount: 150,
      spread: 60
   });
  } else {
    setMessage('❌ Number of participants must be at least two for Secret Santa!');
  }
};
// Handle user's name 
const handleSubmitUsername = () => {
    if (temporaryUsername.trim() !== '') {
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const formattedTimestamp = currentDate.toLocaleDateString('en-US', options);
      setTimestamp(formattedTimestamp);
      setUsername(temporaryUsername);
      setTemporaryUsername('');
      setNumParticipants(numParticipants + 1); 
      setParticipants([...participants, { name: temporaryUsername, emoji: getRandomEmoji() }]);
    }
}
// Assigning Santas with partecipants as parameter 
  const assignSantas = (participants) => {
    // Shuffle the participants array randomly
    const shuffledParticipants = participants.sort(() => Math.random() - 0.5);
    // Pair each participant with the next one 
    const santasAssigned = shuffledParticipants.map((participant, index) => ({
      participant,
      santa: shuffledParticipants[(index + 1) % shuffledParticipants.length],
      emoji: participant.emoji,
    }));
  
    return santasAssigned;
  }


  return (
    <>
      <div className='main-grid'>
      <div className='santa-box'>
        <div className='header'>
        <input
                type="text"
                placeholder="Enter your group's name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
        </div>
        {message && (<div className='show-message'> {message} </div>)}
        <div className='input-container'>
          <h2>Your name</h2>
          {username}
          {!username && (
            <div className='input'>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={temporaryUsername} 
                    onChange={(e) => setTemporaryUsername(e.target.value)}
                    />
                <button onClick={handleSubmitUsername}>Submit</button>
            </div>
          )}
        </div>
        {username && (
          <>
            <div className='input-container'>
              <h2>Add Participants</h2>
              <div className='input'>
                <input
                    type="text"
                    placeholder="Enter participant's name"
                    value={newParticipantName}
                    onChange={(e) => setNewParticipantName(e.target.value)}
                />
                <button onClick={handleAddParticipant}>Add</button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='users-box'>
          <h2>{groupName}</h2>
          <h3>({numParticipants}) Members</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.emoji} {participant.name}</li>
            ))}
          </ul>
      </div>
      </div>


    {assignments.length > 0 && (
      <div className='assignments-box'>
        <h2> Assignments</h2>
        <div className='grid'>
          <div className='assigns'>
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index}>
                  {`${assignment.emoji} ${assignment.participant.name} is ${assignment.santa.name}'s Secret Santa`}
                </li>
              ))}
            </ul>
          </div>
          <div className='group-info'>
            <h3>{groupName}</h3>
            <p>
              Partecipants: {numParticipants}
            </p>
            <p>
              Created at: {timestamp}
            </p>
            <p>
              Organizer: {username}
            </p>
          </div>
        </div>
      </div>
    )}
        <div className='button-santa'>
            
              {numParticipants >= 2 && (
                <>
                <div className="hat">
                      <div className="hat-end"></div>
                </div>
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
