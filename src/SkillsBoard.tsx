import React from 'react';
import './styles/SkillsBoard.css'

function SkillsBoard() {

  interface UserSkill {
    status: string;
    value: string;
  }

  const tempSkills: UserSkill[] = [];
  tempSkills.length = 16;
  tempSkills.fill({ status: 'outstanding', value: 'OUTSTANDING' }, 0, 16);
  tempSkills[3] = { status: 'acquired', value: 'ACQUIRED' };
  console.log(tempSkills);

  return (
    <div className="board">
      {tempSkills.map((skill, index) => {
        const element = <div
          className={`boxes ${skill.status}`}
          key={index}
          >
          <a href="google.com" target="_blank">{skill.value}</a>
        </div>
        return element;
      })}
    </div>
  )
}


export default SkillsBoard;