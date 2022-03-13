import React, { useState, useEffect, useRef } from 'react';
import './styles/SkillsBoard.css'


function SkillsBoard() {

  const [skills, setSkills] = useState([]);
  const [isAcquired, setIsAcquired] = useState('');
  const statusRef = useRef('');

  useEffect(() => {
    fetch('http://localhost:3100/user-skills')
    .then(response => response.json())
    .then(data => setSkills(data))
  }, []);

  function handleStatusToggle (el) {
    console.log(el);
    el.classList.toggle('acquired');
    el.classList.toggle('outstanding');
  }


  const skillsList = skills.map((skill, index) => {
    return (
      <div
        key={`Box #${index}`}
        className={`boxes ${skill.status}`}
        onClick={(target) => handleStatusToggle(target)}
      >
        {skill.value}
      </div>
    )
  })


  return (
    <div className="board">
      {skillsList}
    </div>
  )
}

export default SkillsBoard;
