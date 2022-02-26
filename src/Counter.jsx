import React, { useState, useEffect, useRef } from 'react';
import './styles/Counter.css';

function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);


  useEffect(() => {
    document.title = `You clicked ${count1 + count2} times`;
  }, [count1, count2]);

  const prevCountRef1 = useRef(count1);
    useEffect(() => {
      prevCountRef1.current = count1;
    });
  const prevCount1 = prevCountRef1.current;

  const prevCountRef2 = useRef(count2);
    useEffect(() => {
      prevCountRef2.current = count2;
    });
  const prevCount2 = prevCountRef2.current;


  return (
    <div className="counter">
      <p>You clicked {count1} times</p>
      <p>The previous count was {prevCount1}</p>
      <button id="decrement" onClick={() => setCount1(count1 - 1)}>
        Subtract One 1
      </button>
      <button id="increment" onClick={() => setCount1(count1 + 1)}>
        Add One 1
      </button>
      <p>You clicked {count2} times</p>
      <p>The previous count was {prevCount2}</p>
      <button id="decrement" onClick={() => setCount2(count2 - 1)}>
        Subtract One 2
      </button>
      <button id="increment" onClick={() => setCount2(count2 + 1)}>
        Add One 2
      </button>
    </div>
  );
}


export default Counter;
