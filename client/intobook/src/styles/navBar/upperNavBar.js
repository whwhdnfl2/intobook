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
`;

export const CenteredLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-grow: 1;
`;

export const HiddenHelpIcon = styled(HelpIcon)`
  visibility: hidden;
`;