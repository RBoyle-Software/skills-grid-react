import React, { useState, useEffect } from 'react';
import tempSkills from './tempSkills'
import './styles/SkillsBoard.css'


function SkillsBoard() {

  const [skills, setSkills] = useState(null);

  try {
    useEffect(() => {
      fetch('localhost:3000/skills-grid')
      .then(response => response.json())
      .then(data => console.log(data))
    }, [])

  } catch(error) {
    console.error('ERROR', error);
  }


  return (
    <div className="board">

      {tempSkills.map((skill, index) => {
        const element = <div
          key={index}
          className={`boxes ${skill.status}`}
          >
          <a href="google.com" target="_blank">{skill.value}</a>
        </div>
        return element;
      })}

    </div>
  )
}

export default SkillsBoard;
