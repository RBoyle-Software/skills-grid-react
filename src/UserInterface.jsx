import React from 'react';
import './styles/form.css';


function UserInterface() {
  return (
    <div id="form-area">
      <div id="box-value"></div>

      <form id="user-input">
        <label>
          Set Topic:
          <input type="text" id="text-input" maxlength="40" placeholder="Enter text" />
        </label>

        <div id="status-container">
          <input type="radio" name="radio" class="radio" id="outstanding" checked="checked" />
          <label class="status-label" for="outstanding">Outstanding</label>
          <input type="radio" name="radio" class="radio" id="acquired" />
          <label class="status-label" for="acquired">Acquired</label>
        </div>

        <input type="submit" id="submit-button" value="Update Box" />
      </form>
    </div>

  )
}


export default UserInterface;
