import { gql } from "@apollo/client";

export const GET_SUBJECT = gql`
query Subject {
  subjects {
    name
    id
   
  }
}
`;
