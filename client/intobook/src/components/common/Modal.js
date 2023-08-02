import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ title, content, openModal, setOpenModal }) => {
  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          {title}
        </DialogContent>
        <DialogContent>
          {content}
        </DialogContent>

      </Dialog>
    </>
  );
};

export default Modal;