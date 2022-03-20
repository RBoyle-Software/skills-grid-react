import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Modal from './components/Modal';
import LoginBoard from './LoginBoard';
import SkillsBoard from './SkillsBoard';
import Construction from './Construction';
import UserInterface from './UserInterface';
import TopNav, { gradients } from './TopNav';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './styles/App.css';


export default function App() {


  const [modalMessage, setModalMessage] = useState('Please select a box to continue. Click to dismiss.');
  const [appBackground, setAppBackground] = useState('');
  const [selectedBox, setSelectedBox] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');
  const { isLoading } = useAuth0();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth0();

  // isAuthenticated && console.log(user);
  console.log(location);


  useEffect(() => {
    getSkills();
  }, []);

  useEffect(() => {
    setAppBackground(gradients[location.pathname]);
  }, [location])


  const getSkills = () => {
    axios.get('/user-skills')
    .then(res => setSkills(res.data))
    .catch(err => console.log(err.stack))
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

    const newSkills = [...skills];
    newSkills[selectedBox.index] = { status: status, value: value };
    setSkills(newSkills);
  }


  const handleBoxSelect = (e) => {
    const currentStatus = e.target.classList.value.includes('acquired') ? 'acquired' : 'outstanding';
    const selected = {
      status: currentStatus,
      index: e.target.id,
      value: e.target.innerText
    };

    setSelectedBox(selected);
  }

  const closeModal = (e) => {
    console.log(e);
    setShowModal(false);
  }



  if (isLoading) return <div
      style={{height: "100%", backgroundImage: `${appBackground}`}}
      className="loading"
    >
    Loading...
    </div>

  return (
    <div
      className="App"
      style={{backgroundImage: `${appBackground}`}}
    >

      {location.pathname === '/main' && showModal && <Modal
        closeModal={closeModal}
        modalMessage={modalMessage}
      />}

      <TopNav />

      <Routes>
        <Route exact path="/" element={<LoginBoard />} />

        <Route
          exact path="main"
          element={<div>
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
          </div>}
        />

        <Route
          exact path="under-construction"
          element={<Construction />}
        />

        <Route
          path="*"
          element={<h1>There's nothing to see here.</h1>}
        />

      </Routes>

    </div>
  );

}
