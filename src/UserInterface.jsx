import React from 'react';
import './styles/form.css';


export default function UserInterface() {


  return (
    <div id="form-area">
      <div id="box-value"></div>

      <form id="user-input">
        <label>
          Set Topic:
          <input type="text" id="text-input" maxLength="40" placeholder="Enter text" />
        </label>

        <div id="status-container">
          <input type="radio" name="radio" className="radio" id="outstanding" defaultChecked="checked" />
          <label className="status-label" htmlFor="outstanding">Outstanding</label>
          <input type="radio" name="radio" className="radio" id="acquired" />
          <label className="status-label" htmlFor="acquired">Acquired</label>
        </div>

        <input
          type="submit"
          id="submit-button"
          value="Update Box"
        />
      </form>

    </div>
  )

}
