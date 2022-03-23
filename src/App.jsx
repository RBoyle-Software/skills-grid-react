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

  const { user, isLoading } = useAuth0();
  const location = useLocation();

  const [state, setState] = useState({
    skills: [],
    value: '',
    status: 'outstanding',
    selectedBox: {},
    appClass: '/'
  });


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
  }, [location, state.appClass]);


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


  const handleUnselect = (e) => {
    if (e.target.classList.value.includes('App')) {
      setState({ ...state, status: 'outstanding', selectedBox: {} })
    }
  }

  const handleStatus = (status) => {
    setState({ ...state, status: status })
  }

  const handleValue = (value) => {
    setState({ ...state, value: value})
  }


  if (isLoading) return (

    <div className={`App ${state.appClass}`} >

      <TopNav />

      <div className='board' >

        <div className='loading' >
          Loading ...
        </div>

      </div>

    </div>
  );


  return (
    <div
      className={`App ${state.appClass}`}
      onClick={(e) => handleUnselect(e)}
    >

      <TopNav />

      <Routes>
        <Route exact path="/" element={<LoginBoard />} />

        <Route
          exact path='main'
          element={
            <div>

              {user && <SkillsBoard
                skillsList={state.skills}
                clickFunction={handleBoxSelect}
              />}

              {user && <UserInterface
                state={state}
                setValue={handleValue}
                setStatus={handleStatus}
                submitFunction={handleSubmit}
              />}

              {!user && <div className="board">
                <div className='unauthorized' >
                  <p>You are not authorized!</p>
                </div>
              </div>}

            </div>
          }
        />

        <Route
          exact path='under-construction'
          element={<Construction />}
        />

        <Route
          path='*'
          element={<h1>There's nothing to see here!</h1>}
        />

      </Routes>

    </div>
  );

}
