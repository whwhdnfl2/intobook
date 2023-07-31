import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 30px;
  margin-left: 30px;
  background-color: var(--white);
  border-radius: 25px;
  height: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 715px;
  `;

const Navbar = () => {
    return ( 
        <StyledNavbar>
            <FontAwesomeIcon icon={faHome} />
            <Link to="/bookshelves">
              <FontAwesomeIcon icon={faBook}/>
            </Link>
            <Link to="/statistics">
              <FontAwesomeIcon icon={faChartSimple} />
            </Link>
        </StyledNavbar>
     );
}
 
export default Navbar;