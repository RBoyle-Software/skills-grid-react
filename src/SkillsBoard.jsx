import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/SkillsBoard.css';


export default function SkillsBoard(props) {


  const { user } = useAuth0();

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

  if (user) return (
    <div className="board">
      {skillsList}
    </div>
  );

  return (
    <div className="board">
      <p>You are not authorized!</p>
    </div>
  );

}
