import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;

  backdrop-filter: blur(10px);
  background-color: rgba(1, 1, 10, 0.61);

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 600px;
  }
  .modalImg {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
