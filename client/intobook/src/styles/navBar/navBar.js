import { styled } from 'styled-components';

export const StyledNavbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0 20px 20px 20px;
    background-color: var(--main-color);
    border-radius: 50px;
    height: 65px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0px;
    width: 320px;
`;