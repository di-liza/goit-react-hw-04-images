import React, { useEffect } from 'react';
import { Backdrop } from './Modal.styled';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export default function Modal({
  activeCard: { largeImageURL, tags },
  closeModal,
}) {
  const handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return createPortal(
    <Backdrop onClick={handleBackdropClose}>
      <div className="modal">
        <img src={largeImageURL} alt={tags} className="modalImg" />
      </div>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  activeCard: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,

  closeModal: PropTypes.func.isRequired,
};
