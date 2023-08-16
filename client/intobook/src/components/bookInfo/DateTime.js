import React, { useEffect, useRef } from "react";
import Wheel from "./Wheel";
import '../../styles/EditDateTimeStyle.css'
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { SelectedStartTimeAtom, SelectedEndTimeAtom, TargetTimeAtom } from '../../recoil/book/BookAtom';

const DateTime = ({ onSave, targetType }) => {
  const [selectedStartTime, setSelectedStartTime] = useRecoilState(SelectedStartTimeAtom);
  const [selectedEndTime, setSelectedEndTime] = useRecoilState(SelectedEndTimeAtom);
  const [targetTime, setTargetTime] = useRecoilState(TargetTimeAtom);

  const hours = targetType === 'start' ? selectedStartTime.hours : selectedEndTime.hours;
  const minutes = targetType === 'start' ? selectedStartTime.minutes : selectedEndTime.minutes;

  const containerRef = useRef(null);

  useEffect(() => {
    if (targetType === 'start') {
      setTargetTime({
        hours: selectedStartTime.hours,
        minutes: selectedStartTime.minutes
      });
    } else if (targetType === 'end') {
      setTargetTime({
        hours: selectedEndTime.hours,
        minutes: selectedEndTime.minutes
      });
    }
  }, [selectedStartTime.hours, selectedStartTime.minutes, selectedEndTime.hours, selectedEndTime.minutes, targetType, setTargetTime])

  const saveHandler = () => {
    if (targetType === 'start') {
      setSelectedStartTime({
        hours: targetTime.hours,
        minutes: targetTime.minutes
      });
    } else if (targetType === 'end') {
      setSelectedEndTime({
        hours: targetTime.hours,
        minutes: targetTime.minutes
      });
    }
    onSave(true);
  };

  return (
    <div ref={containerRef}>
      <TimeEditContainer>
        <WheelContainer>
          <Wheel initIdx={hours} length={24} width={23} loop={false} target={'hours'} type={targetType} />
        </WheelContainer>
        <WheelContainer>
          <Wheel initIdx={minutes} length={60} width={23} loop={false} target={'minutes'} perspective="left" type={targetType} />
        </WheelContainer>
      </TimeEditContainer>
      <Button onClick={saveHandler}>변경하기</Button>

    </div>
  );
};

const TimeEditContainer = styled.div`
  width: 260px;
  height: 130px;
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

const Button = styled.button`
  width: 83px;
  height: 22px;
  border: none;
  border-radius: 100px;
  background: var(--main-color);
  margin-top: 12px;
  cursor: pointer;
  
  color: var(--white);
  // text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.4px;
  float: right;
`;

export default DateTime;