// import { Dialog, DialogContent } from "@mui/material";

// const Modal = ({ title, content, openModal, setOpenModal, log }) => {
//   const comment = log.comment;

//   return (
//     <>
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogContent sx={{width: '280px', height: '350px'}}>
//         <input
//           placeholder={comment === null ? '한줄평을 작성해보세요' : ''}
//           />
//         </DialogContent>
//         <DialogContent>
//           {content}dfdf
//         </DialogContent>

//       </Dialog>
//     </>
//   );
// };

// export default Modal;


import { Dialog, DialogContent } from "@mui/material";
import { useState } from 'react';
import { styled } from 'styled-components';

const Modal = ({ title, content, openModal, setOpenModal, log }) => {
  const [inputValue, setInputValue] = useState(log.comment || '');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    // 여기서 inputValue 값을 사용하여 원하는 작업을 수행할 수 있음
    console.log(inputValue);
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent sx={{width: '280px', height: '350px'}}>
        <Input
          placeholder={log?.comment === null ? '한줄평을 작성해보세요' : ''}
          value={inputValue}
          onChange={handleInputChange}
        />
        </DialogContent>
        <DialogContent>
          {content}dfdf
          <button onClick={handleSave}>저장</button>
        </DialogContent>/
      </Dialog>
    </>
  );
};

const Input = styled.input`
width: 275px;
height: 140px;
flex-shrink: 0;
border-radius: 15px;
border: 2px solid var(--main-color);
background: var(--white);
color: #000;
font-family: var(--main-font;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 133.333% */
letter-spacing: 0.4px;
`;

export default Modal;