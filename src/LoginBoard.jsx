import React from 'react';
import './styles/SkillsBoard.css';


export default function LoginBoard() {


  function colorToggle(e) {
      e.target.classList.toggle('outstanding');
      e.target.classList.toggle('acquired');
  }

  const loginArray = [];
  for (let i = 0; i < 16; i++) {
    loginArray.push({ status: 'outstanding', value: '' });
    if (i % 5 === 0 || i === 7) {
      loginArray[i].status = 'acquired';
    }
  }

  const loginBoxes = loginArray.map((box, index) => {
    return (
      <div
        key={`Box${index}`}
        className={`boxes ${box.status}`}
        onClick={(e) => colorToggle(e)}
      >
      </div>
    )
  });

  return (
    <div className="board">
      {loginBoxes}
    </div>
  );

}
