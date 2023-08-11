import styled from 'styled-components';
import HelpIcon from '@mui/icons-material/Help';

export const StyledUpperNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 0.5rem;
  gap: 0.5rem;
`;

export const CenteredLogo = styled.div`
  align-items: center;
  font-size: var(--font-h1);
  margin-left: 1.2rem;
  flex-grow: 1;
`;

export const HiddenHelpIcon = styled(HelpIcon)`
  visibility: hidden;
`;