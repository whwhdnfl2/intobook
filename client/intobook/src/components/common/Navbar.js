import react from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Navbar = () => {
    return ( 
        <StyledNavbar>
            <FontAwesomeIcon icon={faHome} />
            <FontAwesomeIcon icon={faBook}/>
            <FontAwesomeIcon icon={faChartSimple} />
        </StyledNavbar>
     );
}
 
export default Navbar;