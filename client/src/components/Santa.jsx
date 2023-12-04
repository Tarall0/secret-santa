import { useState, useEffect } from 'react';
import confetti from "https://esm.run/canvas-confetti@1";
import { faUser, faAt, faEnvelope, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from './Loader';
import EmailMessage from './EmailMessage';

export default function Santa() {
  const [showSanta, setShowSanta] = useState(false);
  const [username, setUsername] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [temporaryUsername, setTemporaryUsername] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [numParticipants, setNumParticipants] = useState(0);
  const [groupName, setGroupName] = useState("Your Group's name ❄️");
  const [groupError, setGroupError] = useState(false);
  const [assignments, setAssignments] = useState(false);
  const [message, setMessage] = useState("");
  const [timestamp, setTimestamp] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
 
  //Show the main app 
  const handleShow = () => {
    if(!showSanta) setShowSanta(true)
  }

  // Function to validate an email address
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(isValid);
    return isValid;
  };
  

  // Function to send participant data to the server in order to send the e-mail
  const sendParticipantData = async () => {
    try {
      const allParticipants = [...participants];

      // Make a POST request to server
      const response = await fetch('https://santa-api-ztd2.onrender.com/add-participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants: allParticipants, organizer: username, date: timestamp, groupname: groupName }),
      });

      if (response.ok) {
        
        setTimeout(() => {
          setIsloading(false);
          setAssignments(true);
          setMessage("🎁 Secret Santas assigned!");
          setTimeout(() => {
            setMessage("");
          }, 5000);

          confetti({
            particleCount: 150,
            spread: 60
          });
          setEmailSent(true);

        }, 3000)
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
      if (newParticipantName.trim() !== '' && isValidEmail(participantEmail)) {
        const randomEmoji = getRandomEmoji();
        setParticipants([...participants, { 
          name: newParticipantName, 
          email: participantEmail, 
          emoji: randomEmoji }]);
        setNewParticipantName('');
        setParticipantEmail('');
        setNumParticipants(numParticipants + 1);
        setMessage(`🎉 ${newParticipantName}'s details have been added`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
      } else if (newParticipantName.trim() === '') {
        setMessage("❌ Participant's username cannot be empty.");
        setErrorName(true);

        setTimeout(() => {
          setMessage("");
        }, 5000);

        setTimeout(() => {
          setErrorName(false);
        }, 2000)

      }
      
      else {
        // Show error message for invalid email
        setMessage("❌ Please enter a valid email address.");
        setErrorEmail(true);

        setTimeout(() => {
          setMessage("");
        }, 5000);

        setTimeout(() => {
          setErrorEmail(false);
        }, 2000)
      }
  }

  // Generate random emoji
  const getRandomEmoji = () => {
    const emojis = ["🎁", "🎅", "❄️", "☃️", "🎄", "🕯️", "⛄", "🌟", "🦌", "🤶", "🧑‍🎄", "👼"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  const handleSanta = () => {

    if(groupName === "Your Group's name ❄️" || "") {
      setGroupError(true);
      setTimeout(() => {
        setGroupError(false)
      }, 5000);

      return
    }

    if (numParticipants >= 2) {
      // Send participant function to send to call the backened
      sendParticipantData();
      setIsloading(true);
    } else{
      setMessage('❌ Number of participants must be at least two for Secret Santa!');
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } 
  };

// Handle user's name and email (organizer)
const handleSubmitUsername = () => {
  if (temporaryUsername.trim() !== '' && isValidEmail(organizerEmail)) {
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
          setMessage("🎉 Your details have been added");
          setTimeout(() => {
            setMessage("");
          }, 5000);
      } 
   } else if (temporaryUsername == ""){
    setMessage("❌ Your username cannot be empty.");
    setErrorName(true);
    setTimeout(() => {
      setMessage("");
    }, 5000);
    setTimeout(() => {
      setErrorName(false);
    }, 2000)
   } else {
    // Show error message for invalid email
    setMessage("❌ Please enter a valid email address.");
    setErrorEmail(true);
    setTimeout(() => {
      setMessage("");
    }, 5000);

    setTimeout(() => {
      setErrorEmail(false);
    }, 2000)
  }
}



  return (
    <>
    {isLoading ?(
      <Loader/>
    ) : ( 
      <>

{!showSanta && ( <div className='intro-santa'>
    <p>
    This application allows users to organize Secret Santa events for their groups. You can insert <b>Your Group's name</b>, your <b>username</b> and your <b>e-mail</b>. You can then add all the participants. It assigns Secret Santas randomly.
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
      <>
        {emailSent && (
              <EmailMessage/>
            )}
    <div className={!assignments ?("main-grid") : ("single-grid")}>
      { username && (<div className='organizer-details'> <span>{username}</span></div>)}
      {!assignments &&(
      <div className='santa-box'>
        {groupError && (
          <div className='groupname-box'>
            Add a name of your Group
          </div>
        )}
        <div className='header'>
        <input
                type="text"
                placeholder="Enter your group's name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
        </div>
        <div className='input-container'>
          
        {!username &&(
        <>
          <h2>Your Details</h2>
          <p className='expl'>
                Enter your name and your email address
          </p>
        </>)}
         
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
                    className={errorName ? 'error' : ''}
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
                  className={errorEmail ? 'error' : ''}
                />
              </div>
              <div className='add-butt'>
                  <button onClick={handleSubmitUsername}>Submit</button>
              </div>
           </div>
          )}
        </div>
        {username && (
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
                  className={errorName ? 'error' : ''}
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
                      className={errorEmail ? 'error' : ''}
                    />
                </div>
                <div className='add-butt'>
                  <button onClick={handleAddParticipant}>Add Participant</button>
                </div>
              </div>
            </div>
        )}
      </div>)}

      <div className='users-box'>
          <h2>{groupName}</h2>
          <h3>({numParticipants}) Members</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.emoji} {participant.name} <span className='email'><FontAwesomeIcon icon={faEnvelope}/> {participant.email}</span></li>
            ))}
          </ul>
      </div>

      {assignments && (
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
    </div>
    </>)}

    {assignments &&(<div className='group-info'>
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
    )}
   
    </>
  )
}
