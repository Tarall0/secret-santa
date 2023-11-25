import {useState, useEffect} from 'react'

export default function Countdown() {

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
      });
    const [timeRemaining, setTimeRemaining] = useState(0);

      // Calculate days hours until Christmas
    useEffect(() => {
        const interval = setInterval(() => {
          const today = new Date();
          const christmasDate = new Date(today.getFullYear(), 11, 25); 
  
          if (today > christmasDate) {
            christmasDate.setFullYear(today.getFullYear() + 1);
          }
  
          const newTimeRemaining = christmasDate - today;
          setTimeRemaining(newTimeRemaining);
  
          const days = Math.floor(newTimeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((newTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
          setCountdown({ days, hours });
  
          if (newTimeRemaining <= 0) {
            clearInterval(interval);
          }
        }, 1000);
  
      return () => clearInterval(interval);
    }, []);


  return (
    <div className='countdown-box'>
            <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-number">{countdown.days} days </span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number"> {countdown.hours} hours </span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-span"> left until Christmas</span>
                </div>
            </div>
          </div>
  )
}
