import { Dialog, DialogContent } from "@mui/material";
import LogEdit from "../bookInfo/LogEdit";
import Tutorial from "./Tutorial";

const Modal = ({ openModal, setOpenModal, modalType }) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ style: { borderRadius: '20px' } }}>
        <DialogContent sx={{ width: '280px', height: '430px' }}>
          {modalType === 'Tutorial' && <Tutorial closeModal={closeModal} />}
          {modalType === 'LogEdit' && <LogEdit closeModal={closeModal} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;