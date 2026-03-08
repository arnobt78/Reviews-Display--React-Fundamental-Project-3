import { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

/**
 * Main app: shows one review at a time. Index state (0-based) controls which
 * person from the people array is displayed. Navigation wraps at both ends.
 */
const App = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  /** Keeps index in [0, people.length - 1]. Wraps past end to 0, past start to last. */
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  /** Move to the next review; wrap to first after the last. */
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  /** Move to the previous review; wrap to last when before the first. */
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  /** Show a random review; if same as current, pick next index then wrap. */
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
  };

  return (
    <main>
      {/* Single review card: avatar, quote icon, name, job, quote text, prev/next and random buttons */}
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
