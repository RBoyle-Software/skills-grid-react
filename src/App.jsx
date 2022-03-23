import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import LoginBoard from './LoginBoard';
import SkillsBoard from './SkillsBoard';
import Construction from './Construction';
import UserInterface from './UserInterface';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/App.css';


export default function App() {

  const [state, setState] = useState({
    skills: [],
    value: '',
    status: 'outstanding',
    selectedBox: {},
    appClass: '/main'
  });


  const { isLoading } = useAuth0();
  const location = useLocation();
  console.log('CLASS', state.appClass, location);


  useEffect(() => {
    getSkills();
  }, []);


  useEffect(() => {
    const appClasses = {
      '/': 'AppLogin',
      '/main': 'AppMain',
      '/under-construction': 'AppConstruction'
    }
    setState({ ...state, appClass: appClasses[location.pathname]})
  }, [location]);


  const getSkills = () => {
    fetch('/user-skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setState({ ...state, skills: data }))
    .catch(err => console.log(err.stack))
  }


  const handleStatus = (status) => {
    setState({ ...state, status: status })
  }


  const handleValue = (value) => {
    setState({ ...state, value: value})
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const newState = {
      index: state.selectedBox.index,
      status: state.status,
      value: state.value
    }

    fetch('/user-skills', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newState)
    })
    .then(res => console.log('Status: ', res.status))
    .catch(err => console.log(err.stack))

    const newSkills = Object.assign([ ...state.skills ], {
      [state.selectedBox.index]: { status: state.status, value: state.value }
    });

    setState({ ...state, skills: newSkills });
  }


  const handleBoxSelect = (e) => {
    const currentStatus = e.target.classList.value.includes('acquired') ? 'acquired' : 'outstanding';
    const selected = {
      status: currentStatus,
      index: e.target.id,
      value: e.target.innerText
    };

    setState({ ...state, selectedBox: selected, status: currentStatus });
  }


  if (isLoading) return (
    <div
      className={`App ${state.appClass}`}
    >
      <div
        className="board"
      >
      Loading...
      </div>
    </div>
  );

  return (
    <div
      className={`App ${state.appClass}`}
    >

      <TopNav />

      <Routes>
        <Route exact path="/" element={<LoginBoard />} />

        <Route
          exact path="main"
          element={<div>
            <SkillsBoard
              skillsList={state.skills}
              clickFunction={handleBoxSelect}
            />

            <UserInterface
              state={state}
              setValue={handleValue}
              setStatus={handleStatus}
              submitFunction={handleSubmit}
            />
          </div>}
        />

        <Route
          exact path="under-construction"
          element={<Construction />}
        />

        <Route
          path="*"
          element={<h1>There's nothing to see here!</h1>}
        />

      </Routes>

    </div>
  );

}
