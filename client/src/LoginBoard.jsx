import React from 'react';
import LoginButton from './components/LoginButton';
import './styles/SkillsBoard.css';


export default function LoginBoard() {


  const loginArray = [
    {class: "acquired", text: "Oh, hello." },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "acquired", text: "Welcome to the Interview Skills Grid!" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "acquired", text: <a href="http://localhost:3100/login" alt="login">Authenticate</a> },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "outstanding" },
    {class: "acquired" }
  ];

  function colorToggle(e) {
      e.target.classList.toggle('outstanding');
      e.target.classList.toggle('acquired');
  }


  const loginBoxes = loginArray.map((box, index) => {
    return (
      <div
        key={`Box${index}`}
        className={`boxes ${box.class}`}
        onClick={(e) => colorToggle(e)}
      >
      {box.text}
      </div>
    )
  });

  return (
    <div className="board">
      {loginBoxes}
    </div>
  );

}
