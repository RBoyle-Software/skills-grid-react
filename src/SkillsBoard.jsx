import React, { useState, useEffect } from 'react';
import './styles/SkillsBoard.css';
import axios from 'axios';


export default function SkillsBoard() {

  const skillsEndpoint = '/user-skills';
  const [skills, setSkills] = useState([]);
  const [selectedBox, setSelectedBox] = useState({});
  console.log('SELECTED', selectedBox);

  useEffect(() => {
    axios.get(skillsEndpoint)
    .then(skills => setSkills(skills.data))
  }, []);

  const handleBoxSelect = (e) => {
    const currentStatus = e.target.classList.value.includes('acquired') ? 'acquired' : 'outstanding';
    const selected = {
      status: currentStatus,
      index: e.target.id,
      value: e.target.innerText
    };
    setSelectedBox(selected);
  }

  const skillsList = skills.map((skill, index) => {
    return (
      <div
        id={index}
        key={`Box #${index}`}
        className={`boxes ${skill.status}`}
        onClick={(e) => handleBoxSelect(e)}
      >
        {skill.value}
      </div>
    );
  })

  return (
    <div className="board">
      {skillsList}
    </div>
  );

}
