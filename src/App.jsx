import React, { useState, useEffect } from 'react';
import UserInterface from './UserInterface';
import SkillsBoard from './SkillsBoard';
import TopNav from './TopNav';
import axios from 'axios';
import './styles/App.css';



export default function App() {

  const [skills, setSkills] = useState([]);
  const [selectedBox, setSelectedBox] = useState({});
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');
  console.log('APP STATE', selectedBox);

  const getSkills = () => {
    axios.get('/user-skills')
    .then(res => setSkills(res.data))
    .catch(err => console.log(err.stack))
  }

  useEffect(() => {
    getSkills();
  }, []);

  const handleBoxSelect = (e) => {
    const currentStatus = e.target.classList.value.includes('acquired') ? 'acquired' : 'outstanding';

    const selected = {
      status: currentStatus,
      index: e.target.id,
      value: e.target.innerText,
    };

    setSelectedBox(selected);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/user-skills', {
      index: selectedBox.index,
      status: status,
      value: value
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err.stack))
    getSkills();
  }

  return (
    <div className="App">
      <TopNav />
      
      <SkillsBoard
        skillsList={skills}
        clickFunction={handleBoxSelect}
      />

      <UserInterface
        status={status}
        setStatus={setStatus}
        selected={selectedBox}
        setValue={setValue}
        submitFunction={handleSubmit}
      />
    </div>
  );

}
