import { BookWrapper, StatusWrapper, StyledBox } from "../../styles/home/StyledBox";
import CurrentBookStatus from "./CurrentBookStatus";
import ReadingBook from "./ReadingBook";

const ReadingBookComponent = () => {
  return (
    <StyledBox>
      <BookWrapper><ReadingBook/></BookWrapper>
      <StatusWrapper><CurrentBookStatus /></StatusWrapper>
    </StyledBox>
  );
};

export default ReadingBookComponent;