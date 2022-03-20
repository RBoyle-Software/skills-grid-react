import React from 'react';
import '../styles/Modal.css';


export default function Modal(props) {


  return (
    <div className="modal">
      <div
        className="modalBox"
        onClick={props.closeModal}
      >
      {props.modalMessage}
      </div>
    </div>
  )

}
