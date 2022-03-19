import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import UserInterface from './UserInterface';
import SkillsBoard from './SkillsBoard';
import LoginBoard from './LoginBoard';
import Construction from './Construction';
import TopNav, { gradients } from './TopNav';
import axios from 'axios';
import './styles/App.css';


export default function App() {


  const [appBackground, setAppBackground] = useState(gradients.loginScreen);
  const [selectedBox, setSelectedBox] = useState({});
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');
  // const location = useLocation();


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
      value: e.target.innerText
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
    .then(res => console.log(res.statusText))
    .catch(err => console.log(err.stack))

    getSkills();
  }


  return (
    <div
      className="App"
      style={{backgroundImage: `${appBackground}`}}
    >

      <TopNav
        backgroundSetter={setAppBackground}
      />

      <Routes>
        <Route exact path="/" element={<LoginBoard />} />

        <Route
          exact path="main"
          element={<>
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
          </>}
        />

        <Route
          exact path="under-construction"
          element={<Construction />}
        />

      </Routes>

    </div>
  );

}
