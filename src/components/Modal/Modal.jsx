import React, { useEffect, useCallback } from 'react';
import { Backdrop } from './Modal.styled';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export default function Modal({ activeCard, closeModal }) {
  const handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );
  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return createPortal(
    <Backdrop onClick={handleBackdropClose}>
      <div className="modal">
        <img
          src={activeCard.largeImageURL}
          alt={activeCard.tags}
          className="modalImg"
        />
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
