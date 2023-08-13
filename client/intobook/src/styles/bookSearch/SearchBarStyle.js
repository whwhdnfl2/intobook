import { styled } from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

export const Title = styled.div`
  color: var(--main-green-color);
  font-family: var(--content-font);
  font-size: var(--font-size-h4);
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.5px;
  position: relative;
  line-height: 20px;
  white-space: nowrap;
  margin-left: 10px;
`;

export const SerchBarDiv = styled.div`
  min-width: 320px;
  height: 50px;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--white);
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;
  
export const BarcordeIcon = styled.img`
  width: 24px;
  height: 20px;
  left: 12px;
`;

export const SearchIcon = styled.img`
  width: 24px;
  height: 20px;
  right: 12px;
  cursor: pointer;
`;

export const Line = styled.div`
  height: 20px;
  border-left: solid 2px var(--gray);
  margin-left: 45px;
`;

export const SearchBarInput = styled.input`
  padding-left: 10px;
  width: 70%;
  height: 45px;
  background-color: none;
  border: 0;
  border-radius: 20px;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;

  &::placeholder {
    color: #00000080;
    font-family: var(--content-font);
    font-weight: 300;
    font-size: 13px;
    letter-spacing: -1px;
  }
`;