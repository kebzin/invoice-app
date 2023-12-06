import Status from "../../Components/shared/Status/Status";
import Rightarrow from "../../assets/images/icons8-right-30.png";
import {
  ClientName,
  Hashtag,
  Item,
  Link,
  CreatedAt,
  StyledList,
  TotalPrice,
  Uid,
} from "./ListStyles";
import { useContext } from "react";
import { AppContexProvider } from "../../Provider/GlobalContex";
const List = ({ createdAt, clientName, status, total, index }) => {
  // const { windowWidth } = useGlobalContex();
  const { windowWidth } = useContext(AppContexProvider);
  const isDesktop = windowWidth >= 768;

  return (
    <>
      <StyledList>
        <Item>
          <Link to={`/invoice/${index} `}>
            <Uid>
              <Hashtag>#</Hashtag>
              {/* you can passe the id of the invoice */}
              {index}
            </Uid>
            <CreatedAt>{createdAt}</CreatedAt>
            <ClientName>{clientName}</ClientName>
            <TotalPrice> {total}</TotalPrice>

            <Status currStatus={status} $grid />
            {isDesktop && (
              <img
                src={Rightarrow}
                style={{ marginLeft: 10 }}
                alt="right icon"
              />
            )}
          </Link>
        </Item>
      </StyledList>
    </>
  );
};

export default List;
