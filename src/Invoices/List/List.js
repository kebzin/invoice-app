import { useTheme } from "styled-components";
import Status from "../../Components/shared/Status/Status";

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
const List = ({ id, createdAt, clientName, status, total }) => {
  // const { windowWidth } = useGlobalContex();
  // const isDesktop = windowWidth >= 768;

  const { colors } = useTheme();
  //const isDesktop = windowWidth >= 768;

  return (
    <>
      <StyledList>
        <Item>
          <Link>
            <Uid>
              <Hashtag>#</Hashtag>
              {/* you can passe the id of the invoice */}
              {id}
            </Uid>
            <CreatedAt>{createdAt}</CreatedAt>
            <ClientName>{clientName}</ClientName>
            <TotalPrice>GMD {total}</TotalPrice>
            <Status currStatus={status} $grid />
            {/* <Arrow
            name={'arrow-right'}
            size={10}
            color={colors.purple}
             /> */}
          </Link>
        </Item>
      </StyledList>
    </>
  );
};

export default List;
