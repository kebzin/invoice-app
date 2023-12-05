import { StyledStatus, Circle } from "./StatusStyles";

const Status = ({ currStatus, ...props }) => {
  return (
    <StyledStatus $statusType={currStatus} {...props}>
      <Circle $statusType={currStatus} />
      {currStatus}
    </StyledStatus>
  );
};

export default Status;
