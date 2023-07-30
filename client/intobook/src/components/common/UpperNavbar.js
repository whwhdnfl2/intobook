import react from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const StyledUpperNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const UpperNavbar = () => {
    return ( 

        <StyledUpperNavbar>
            <div className='empty-space'>
            </div>

            <div className='logo'>
                BOOK!
            </div>

            <div className='menu-icons'>
              <FontAwesomeIcon icon={faCircleQuestion} />
              <FontAwesomeIcon icon={faBell}/>
              <FontAwesomeIcon icon={faBars} />
            </div>
        </StyledUpperNavbar>
     );
}
 
export default UpperNavbar;