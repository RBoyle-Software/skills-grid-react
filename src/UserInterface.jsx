import React from 'react';
import './styles/Interface.css';


export default function UserInterface(props) {

  return (
    <form id="form-area">

      <div id="box-value" >
        {(props.selected.index && 'Box #')}
        {props.selected.index}
        {'\n'}
        {props.selected.value}
      </div>

      <div id="user-input">

        <label>
          Set Topic:
          <input
            type="text"
            id="text-input"
            maxLength="40"
            placeholder="Enter text"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </label>

        <div id="status-container">

          <input 
            type="radio"
            id="outstanding"
            checked={props.status === 'outstanding'}
            onChange={() => props.setStatus('outstanding')}
          />
          <label className="status-label" htmlFor="outstanding">Outstanding</label>

          <input
            type="radio"
            id="acquired"
            checked={props.status === 'acquired'}
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
