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
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: var(--white);
  border-radius: 50%;
  
`

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