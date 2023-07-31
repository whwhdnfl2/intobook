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
  margin: 0 30px 10px 30px;
  background-color: var(--white);
  border-radius: 25px;
  height: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 20px;
  width: 300px;
`;

const Navbar = () => {
    return ( 
        <StyledNavbar>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} />
          </Link>
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