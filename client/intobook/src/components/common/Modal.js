import { Dialog, DialogContent } from "@mui/material";
import LogEdit from "../bookInfo/LogEdit";
import Tutorial from "./Tutorial";

const Modal = ({ openModal, setOpenModal, modalType }) => {
  const closeModal = () => {
    console.log(11)
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ style: { borderRadius: '20px' } }}>
        <DialogContent sx={{ width: '280px', height: '450px' }}>
          {modalType === 'Tutorial' && <Tutorial closeModal={closeModal} />}
          {modalType === 'LogEdit' && <LogEdit closeModal={closeModal} />}
        </DialogContent>
        <DialogContent>
          <button onClick={closeModal}>저장</button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;