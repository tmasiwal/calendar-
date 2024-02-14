import React from "react";
import "./Modal.css"; // Import CSS file for modal styling

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{event.title}</h2>
        <p>
          <samp>Start time ==></samp>
          {event.start.toString()} <samp>End time ==></samp>
          {event.end.toString()}
        </p>
        {/* Add any other event details or content here */}
      </div>
    </div>
  );
};

export default Modal;
