import React from 'react';
import styled from "styled-components";

const BookSearchToggle = (props) => {
  const {
    spanText1,
    line6,
  } = props;


  return (
    <div>
      <Booksearch1>
        <OverlapGroup>
        <Text1>
          <span className="inter-normal-black-20px">{spanText1}</span>
        </Text1>
        <Line6 src={line6} alt="Line 6" />
        </OverlapGroup>
      </Booksearch1>
    </div>
  );
};

const Booksearch1 = styled.div`
  height: 244px;
  display: flex;
  align-items: flex-start;
  min-width: 364px;
`;

const OverlapGroup = styled.div`
  width: 362px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 13px 0;
  align-items: center;
  min-height: 244px;
  background-color: var(--white);
  border-radius: 20px;
`;

const Text1 = styled.div`
  font-family: var(--content-font);
  font-weight: 400;
  font-size: 20ox;
  width: 362px;
  min-height: 24px;
  margin-right: 0.01px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

const Line6 = styled.img`
  width: 362px;
  height: 1px;
  margin-top: 20px;
  margin-left: 0;
`;

export default BookSearchToggle;