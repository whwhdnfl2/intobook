import styled from 'styled-components';
import HelpIcon from '@mui/icons-material/Help';

export const StyledUpperNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 0.5rem;
`;

export const CenteredLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  flex-grow: 1;
`;

export const HiddenHelpIcon = styled(HelpIcon)`
  visibility: hidden;
`;