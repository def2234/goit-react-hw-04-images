import { DivBackdrop, DivModal } from './Modal-styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export function Modal({ image, closeModal }) {
  useEffect(() => {
    const onClickDiv = ({ target }) => {
      if (target.nodeName === 'DIV') {
        closeModal();
      }
    };
    document.addEventListener('click', onClickDiv);
    return () => {
      document.removeEventListener('click', onClickDiv);
    };
  }, [closeModal]);

  useEffect(() => {
    const onClickKeyDown = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onClickKeyDown);
    return () => {
      document.removeEventListener('keydown', onClickKeyDown);
    };
  }, [closeModal]);

  return (
    <DivBackdrop>
      <DivModal>
        <img src={image} alt="" />
      </DivModal>
    </DivBackdrop>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
