import React from 'react';
import './styles/Interface.css';


export default function UserInterface(props) {

  const boxIndex = props.state.selectedBox.index;
  const boxValue = props.state.selectedBox.value;

  return (
    <form id="form-area">

      <div id="box-value" >
        {boxIndex && 'Box #'}
        {boxIndex && parseInt(boxIndex) + 1 }
        {'\n'}
        {boxValue}
      </div>

      <div id="user-input">

        <label>
          Set Topic:
          <input
            type="text"
            id="text-input"
            maxLength="40"
            placeholder="Enter text"
            value={props.state.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </label>

        <div id="status-container">

          <input 
            type="radio"
            id="outstanding"
            checked={props.state.status === 'outstanding'}
            onChange={() => props.setStatus('outstanding')}
          />
          <label className="status-label" htmlFor="outstanding">Outstanding</label>

          <input
            type="radio"
            id="acquired"
            checked={props.state.status === 'acquired'}
            onChange={() => props.setStatus('acquired')}
          />
          <label className="status-label" htmlFor="acquired">Acquired</label>

        </div>

        <input
          type="submit"
          id="submit-button"
          value="Update Box"
          onClick={props.submitFunction}
        />
      </div>

    </form>
  )

}
