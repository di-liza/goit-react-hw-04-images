import React, { useEffect, useCallback } from 'react';
import { Backdrop } from './Modal.styled';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export default function Modal({ activeCard, closeModal, showModal }) {
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
// export default class OLDModal extends Component {
//   static propTypes = {
//     activeCard: PropTypes.shape({
//       tags: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     }).isRequired,

//     closeModal: PropTypes.func.isRequired,
//   };
//   // Закрытие модалки по клику на Escape
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   // Закрытие модалки по клику на Backdrop
//   handleBackdropClose = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };
//   // Рендер
//   render() {
//     return createPortal(
//       <Backdrop onClick={this.handleBackdropClose}>
//         <div className="modal">
//           <img
//             src={this.props.activeCard.largeImageURL}
//             alt={this.props.activeCard.tags}
//             className="modalImg"
//           />
//         </div>
//       </Backdrop>,
//       modalRoot
//     );
//   }
// }
