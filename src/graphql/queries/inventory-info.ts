import { gql } from "@apollo/client";

export default gql`
  query IventoryItem {
    galleries {
      baseSign {
        id
        name
        type
      }
    }
    items {
      effect
      id
      level
      name
      value
    }
  }
`;
