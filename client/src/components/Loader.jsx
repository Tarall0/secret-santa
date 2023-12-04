import { useState, useEffect } from 'react';

const Loader = () => {
  const loadingTexts = ['Assigning Santas 🎅', 'Checking Naughty List 🪨', 'Wrapping Presents 🎁', 'Choosing the ribbons and bows 🎀', 'Spreading Holiday Cheer ✨'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='loader-container'>
        <div className='loader'>
          <div className='bar'>
          </div>
        </div>
        {loadingTexts.map((text, index) => (
          <p key={index} className={currentTextIndex === index ? 'fade-in-out' : ''}>
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default Loader;
