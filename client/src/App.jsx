import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import MyAccount from './MyAccount';
import LoginBoard from './LoginBoard';
import SkillsBoard from './SkillsBoard';
import Construction from './Construction';
import UserInterface from './UserInterface';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/App.css';


export default function App() {


  const { user, isLoading, isAuthenticated } = useAuth0();
  const location = useLocation();
  console.log(location.pathname);
  console.log(user);


  const [state, setState] = useState({
    appClass: '/',
    selectedBox: {},
    skills: [],
    status: 'outstanding',
    value: ''
  });


  const getSkills = () => {
    fetch('https://skills-grid-react.herokuapp.com/user-skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setState({ ...state, skills: data }))
    .catch(err => console.error(err.stack))
    console.log('Skills retrieved from database!')
  }

  useEffect(() => {
    getSkills()
  }, []);


  useEffect(() => {
    const appClasses = {
      '/login': 'AppLogin',
      '/main': 'AppMain',
      '/my-account': 'AppLogin',
      '/under-construction': 'AppConstruction'
    }
    setState({ ...state, appClass: appClasses[location.pathname]})
  }, [location.pathname]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newState = {
      index: state.selectedBox.index,
      status: state.status,
      value: state.value
    }

    fetch('https://skills-grid-react.herokuapp.com/user-skills', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newState)
    })
    .then(res => {
      if (res.status === 200) console.log('Database updated successfully!')
    })
    .catch(err => console.log(err.stack))

    const newSkills = Object.assign([ ...state.skills ], {
      [state.selectedBox.index]: { status: state.status, value: state.value }
    });

    setState({ ...state, skills: newSkills });
  }


  const handleBoxSelect = (e) => {
    const classList = e.target.classList.value;
    const currentStatus = classList.includes('acquired') ? 'acquired' : 'outstanding';
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


  if (user) return (

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
        <Route exact path='login' element={<LoginBoard />} />

        <Route
          exact path='main'
          element={
            <div>

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
          exact path='my-account'
          element={<MyAccount />}
        />

        <Route
          path='*'
          element={<h1>There's nothing to see here!</h1>}
        />

      </Routes>

    </div>
  );

}
