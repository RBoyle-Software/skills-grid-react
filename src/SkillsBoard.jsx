import React from 'react';
import './styles/SkillsBoard.css';


export default function SkillsBoard(props) {

  const skillsList = props.skillsList.map((skill, index) => {
    return (
      <div
        id={index}
        key={`Box #${index}`}
        className={`boxes ${skill.status}`}
        onClick={(e) => props.clickFunction(e)}
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
