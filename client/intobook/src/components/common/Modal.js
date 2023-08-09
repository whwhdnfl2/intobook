import { Dialog, DialogContent } from "@mui/material";
import { Tutorial, ReadingBooks } from "./";
import { styled } from 'styled-components';

const Modal = ({ openModal, setOpenModal, modalType, height='430px' }) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ style: { borderRadius: '20px' } }}>
        <DialogContents sx={{ width: '280px', height: `${height}`, padding: '20px' }}>
            {modalType === 'Tutorial' && <Tutorial closeModal={closeModal} />}
            {modalType === 'readingBook' && <ReadingBooks closeModal={closeModal} />}
        </DialogContents>
      </Dialog>
    </>
  );
};

const DialogContents = styled(DialogContent)`
  // padding-right: 17px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default Modal;