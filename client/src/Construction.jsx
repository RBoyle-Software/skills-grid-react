import React from 'react';
import { Link } from 'react-router-dom';


export default function ConstructionPage() {


  const constructionArray = [
    { status: "acquired", value: 'Uh-oh!' },
    { status: "outstanding", value: '' },
    { status: "acquired", value: <Link to={"/"} >Return to the login page.</Link> },
    { status: "outstanding", value: '' },
    { status: "outstanding", value: '' },
    { status: "acquired", value: 'This feature is not yet available.' },
    { status: "outstanding", value: '' },
    { status: "outstanding", value: <a href="https://csx.codesmith.io/home" target="_blank" rel="noreferrer">Codesmith CSX</a> },
    { status: "acquired", value: <a href="https://github.com/RBoyle-Software/skills-grid-react/issues" target="_blank" rel="noreferrer">Contribute to the project.</a> },
    { status: "outstanding", value: '' },
    { status: "outstanding", value: <a href="https://javascript.info/" target="_blank" rel="noreferrer">The Modern JavaScript Tutorial</a> },
    { status: "outstanding", text: ''},
    { status: "outstanding", value: '' },
    { status: "outstanding", value: <a href="https://www.algoexpert.io/" target="_blank" rel="noreferrer">Algo Expert</a> },
    { status: "outstanding", value: '' },
    { status: "outstanding", value: <a href="https://eloquentjavascript.net/" target="_blank" rel="noreferrer">Eloquent JavaScript</a> },
  ];


  function colorToggle(e) {
    e.target.classList.toggle('outstanding');
    e.target.classList.toggle('acquired');
}


const constructionBoxes = constructionArray.map((box, index) => {
  return (
    <div
      key={`Box${index}`}
      className={`boxes ${box.status}`}
      onClick={(e) => colorToggle(e)}
    >
    {box.value}
    </div>
  )
});

return (
  <div className="board">
    {constructionBoxes}
  </div>
);

}
