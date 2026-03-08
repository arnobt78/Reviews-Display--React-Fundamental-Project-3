import { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

/**
 * Alternative implementation: same UI as App.jsx but uses the modulus (%)
 * operator for wrap-around. (index + 1) % length gives 0 after the last item;
 * (index - 1 + length) % length gives last index when going back from 0.
 */
const App = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  // Modulus wrap examples for length 4: 1%4=1, 2%4=2, 3%4=3, 4%4=0 (back to start)
  // 1 % 4 === 1
  // 2 % 4 === 2
  // 3 % 4 === 3
  // 4 % 4 === 0

  /** Next: (index+1) % length wraps last → 0. */
  const nextPerson = () => {
    setIndex((index) => {
      const newValue = (index + 1) % people.length;
      return newValue;
    });
  };

  /** Previous: (index-1+length) % length wraps 0 → last. */
  const prevPerson = () => {
    setIndex((index) => {
      const newValue = (index - 1 + people.length) % people.length;
      return newValue;
    });
  };

  /** Random review; ensure index stays in range with %. */
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    const newIndex = randomNumber % people.length;
    setIndex(newIndex);
  };

  return (
    <main>
      <article className='review'>
        <div className='img-container'>
          <img src={image} alt={name} className='person-img' />
          <span className='quote-icon'>
            <FaQuoteRight />
          </span>
        </div>
        <h4 className='author'>{name}</h4>
        <p className='job'>{job}</p>
        <p className='info'>{text}</p>
        <div className='btn-container'>
          <button className='prev-btn' onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className='next-btn' onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className='btn btn-hipster' onClick={randomPerson}>
          surprise me
        </button>
      </article>
    </main>
  );
};

export default App;
