import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './styles/SkillsBoard.css'


const skillsEndpoint = '/user-skills';


function SkillsBoard() {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get(skillsEndpoint)
    .then(skills => setSkills(skills.data))
  }, []);

  const handleStatusToggle = (e) => {
    e.target.classList.toggle('outstanding');
    e.target.classList.toggle('acquired');
  }

  const skillsList = skills.map((skill, index) => {
    return (
      <div
        key={`Box #${index}`}
        className={`boxes ${skill.status}`}
        onClick={(e) => handleStatusToggle(e)}
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
