import { Box, Dialog, DialogContent } from "@mui/material";
import { BookmarkInfo, CompleteReadingInfo } from './../home';
import { Tutorial, ReadingBooks } from "./";
import { styled } from 'styled-components';

const Modal = ({ openModal, setOpenModal, modalType, height = '430px' }) => {
  const closeModal = () => {
    setOpenModal(false);

    if (modalType === 'completeBook') {
      localStorage.setItem('hasCloseCompleteBookModal', 'true');
    }
  };

  return (
    <Box>
      <Dialog open={openModal} onClose={closeModal} PaperProps={{ style: { borderRadius: '20px', marginLeft: '13px' } }}>
        <DialogContents sx={{ width: '280px', height: `${height}`, padding: '20px' }}>
          {modalType === 'Tutorial' && <Tutorial closeModal={closeModal} />}
          {modalType === 'readingBook' && <ReadingBooks closeModal={closeModal} />}
          {modalType === 'bookmarkInfo' && <BookmarkInfo closeModal={closeModal} />}
          {modalType === 'completeBook' && <CompleteReadingInfo closeModal={closeModal} />}
        </DialogContents>
      </Dialog>
    </Box>
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