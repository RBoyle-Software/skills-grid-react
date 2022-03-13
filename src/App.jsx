import React from 'react';
import TopNav from './TopNav';
import SkillsBoard from './SkillsBoard';
import UserInterface from './UserInterface';
import './styles/App.css';


export default function App() {

  return (
    <div className="App">
      <TopNav />
      <SkillsBoard />
      <UserInterface />
    </div>
  );

}
