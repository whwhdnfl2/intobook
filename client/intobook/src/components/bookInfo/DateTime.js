import React, { useEffect } from "react";
import Wheel from "./Wheel";
import '../../styles/EditDateTimeStyle.css'
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { SelectedStartTimeAtom, SelectedEndTimeAtom } from '../../recoil/book/BookAtom';


const DateTime = ({ onSave, targetType }) => {
  const [selectedStartTime, setSelectedStartTime] = useRecoilState(SelectedStartTimeAtom);
  const [selectedEndTime, setSelectedEndTime] = useRecoilState(SelectedEndTimeAtom);

  const hours = targetType === 'start' ? selectedStartTime.hours : selectedEndTime.hours;
  const minutes = targetType === 'start' ? selectedStartTime.minutes : selectedEndTime.minutes;

  // const [selectedTime, setSelectedTime] = useRecoilState(SelectedTimeAtom);
  // const hours = parseInt(initialValue.split(':')[0], 10);
  // const minutes = parseInt(initialValue.split(':')[1], 10);


  // console.log(selectedTime.hours, selectedTime.minutes, '확인')


  // const saveHandler = () => {
  //   onSave(selectedTime.hours, selectedTime.minutes); // 전달된 시간값을 onSave 함수로 전달
  // };


  return (
    <div>
      <TimeEditContainer>
        <WheelContainer>
          <Wheel initIdx={hours} length={24} width={23} loop={false} target={'hours'}  type={targetType} />
        </WheelContainer>
        <WheelContainer>
          <Wheel initIdx={minutes} length={60} width={23} loop={false} target={'minutes'} perspective="left" type={targetType} />
        </WheelContainer>
      </TimeEditContainer>
      {/* <button onClick={saveHandler}>저장</button> */}
    </div>
  );
};

const TimeEditContainer = styled.div`
  width: 260px;
  height: 142px;
  border-radius: 15px;
  flex-shrink: 0;
  background: var(--white);
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const WheelContainer = styled.div`
  width: 70px;
  height: 140px;
`;

export default DateTime;