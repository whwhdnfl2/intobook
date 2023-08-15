import { Box, Dialog, DialogContent } from "@mui/material";
import { DeleteLog } from './../bookInfo';
import { BookmarkInfo, CompleteReadingInfo } from './../home';
import { Tutorial, ReadingBooks } from "./";
import { styled } from 'styled-components';

const Modal = ({ openModal, setOpenModal, modalType, height = '430px', handleMethod }) => {
  const closeModal = () => {
    setOpenModal(false);

    if (modalType === 'completeBook') {
      localStorage.setItem('hasCloseCompleteBookModal', 'true');
    }
  };

  return (
    <Box>
      <Dialog open={openModal} onClose={closeModal} PaperProps={{ style: { borderRadius: '20px', margin: 'auto' } }}>
        <DialogContents sx={{ width: '280px', height: `${height}`, padding: '20px' }}>
          {modalType === 'Tutorial' && <Tutorial closeModal={closeModal} />}
          {modalType === 'readingBook' && <ReadingBooks closeModal={closeModal} />}
          {modalType === 'bookmarkInfo' && <BookmarkInfo closeModal={closeModal} />}
          {modalType === 'completeBook' && <CompleteReadingInfo closeModal={closeModal} />}
          {modalType === 'deleteLog' && <DeleteLog closeModal={closeModal} onDelete={handleMethod} />}
        </DialogContents>
      </Dialog>
    </Box>
  );
};

const DialogContents = styled(DialogContent)`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default Modal;