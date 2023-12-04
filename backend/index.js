const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const sendEmail = async (to, subject, body) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'email',
                pass: 'passwordl'
            }

        })

        const email = {
            from,
            to, 
            subject,
            html: body
          };
      
          const info = await transporter.sendMail(email);
          console.log('Email sent')

    }catch(erorr){
        console.log(erorr);
    }
    
};

/** Middlewares  */
app.use(express.json());
app.use(cors());


// Helper function to get assigned Santa
const getAssignedSanta = (participantName, participants) => {
  // Create a copy of the participants array
  const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
  // Get available Santas that have not been assigned yet
  const availableSantas = shuffledParticipants.filter(p => p.name !== participantName && !p.assigned);
  // Iterate over available Santas and find the assigned Santa
  for (let i = 0; i < availableSantas.length; i++) {
    const assignedSanta = availableSantas[(i + 1) % availableSantas.length];
    // Mark the assigned Santa as "assigned" to prevent reassignment
    assignedSanta.assigned = true;
    return assignedSanta;
  }
  // If no assigned Santa is found, return null
  return null;
};

app.post('/add-participants', (req, res) => {
    try {
      const { participants } = req.body;
      const {organizer, date, groupname} = req.body;
          
      // Iterate through participants and send emails
      participants.forEach(({ name, email }) => {
        const assignedSanta = getAssignedSanta(name, participants);
  
        if (assignedSanta) {
          const subject = 'Secret Santa Assignment';
          const body = `<h2 style="background: #d42834; color: #ffffff !important; padding: 1em; text-align: center; width: calc(100% - 2em); margin: 2em auto;"> 🎁 Secret Santa </h2>
          <h1 style="text-align: center; width: 100%">❄️ 🎄🎅</h1>
          <h2 style="text-align: center; width: 100%"> ${groupname}</h2>
          <div style="max-width: 520px; margin: 1em">
            <div style="background-color: #EEEEEE; padding: 1em; border-radius: 1em; width: calc(100% - 2em); border: 3px dotted #d42834;">
                <h3>Dear ${name},</h3>
                <p> Your Secret Santa is <b>${assignedSanta.name}</b>.</p>
                <p style="padding: 1em; width: calc(100% - 2em); text-align: right; font-size: small;">- Secret Santa</p>
            </div>
            <p style="font-size: small;">Organized by ${organizer} ${date}</p>
            <p> Make sure to contact the organizer for further details. Please note that the assignments should remain a secret.</p>
            <h4 style="text-align: center; width: 100%;">Happy Holidays!</h4>
            
          </div>
          <br>
          <br>
          <br>
          <p style="text-align: center; width: 100%">
                <a href="https://tarallotest.it/secret-santa" target="_blank" style="color: #d42834; text-decoration: none; font-weight: 600;">Secret Santa App</a>
                <br>
                <span style="font-size: small;">Organize your own Secret Santa group</span>
          </p>`;
  
          // Send email (using your sendEmail function)
          sendEmail(email, subject, body);
          //console.log("Email sent to"+name+" to "+email+" - Assigned santa:" +assignedSanta.name)
        } else {
          console.error(`Error assigning Santa for participant: ${name}`);
        }
      });
  
      console.log('Participant data received, sending e-mails');
      res.json({ success: true });
    } catch (error) {
      console.error('Error in add-participants endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.get('/', (req, res) => {
  res.send('Server is currently working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    sendEmail
};
  
