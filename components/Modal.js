import React from 'react';

const Modal = ({ children, open }) => {
  if (!open) {
    return null;
  }

  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', width: 100, height: 200, padding: 32 }}>
        {children}
      </div>
    </div>
  )
}

export default Modal;