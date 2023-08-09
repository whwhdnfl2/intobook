import { Link } from 'react-router-dom';
import { StyledNavbar } from './../../styles/navBar/navBar';


const Navbar = () => {
  return (
    <StyledNavbar>
      <Link to='/statistics'>
        <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.9409 38H2.05859V2" stroke="white" strokeWidth="2.89147" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.05859 30.125L18.9998 13.25L25.3527 20L34.8821 9.875" stroke="white" strokeWidth="2.89147" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </Link>
      <Link to="/">
        <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4699 38H9.70519C5.54681 38 2.17578 34.2782 2.17578 29.6872V16.6104C2.17578 13.7035 3.55105 11.0079 5.80268 9.50127L15.2144 3.20371C17.6131 1.59876 20.6208 1.59876 23.0195 3.20371L32.4312 9.50127C34.6829 11.0079 36.0581 13.7035 36.0581 16.6104V29.6872C36.0581 34.2782 32.687 38 28.5287 38H24.764M13.4699 38V29.6872C13.4699 26.2439 15.9981 23.4526 19.117 23.4526C22.2358 23.4526 24.764 26.2439 24.764 29.6872V38M13.4699 38H24.764" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </Link>
      <Link to="/bookshelves">
        <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.29492 34.0004V6.00005C2.29492 3.79088 4.19113 2 6.53022 2H34.9067C35.6085 2 36.1773 2.53727 36.1773 3.20001V29.4289" stroke="white" strokeWidth="2.89147" strokeLinecap="round" />
          <path d="M10.7656 2V18.0002L16.0597 14.8001L21.3539 18.0002V2" stroke="white" strokeWidth="2.89147" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5293 30H36.1764" stroke="white" strokeWidth="2.89147" strokeLinecap="round" />
          <path d="M6.5293 38H36.1764" stroke="white" strokeWidth="2.89147" strokeLinecap="round" />
          <path d="M6.53022 38.0001C4.19113 38.0001 2.29492 36.2093 2.29492 34C2.29492 31.7908 4.19113 30 6.53022 30" stroke="white" strokeWidth="2.89147" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


      </Link>
    </StyledNavbar>
  );
}

export default Navbar;