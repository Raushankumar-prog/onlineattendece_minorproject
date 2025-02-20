import { gql } from "@apollo/client";

export const CREATE_SUBJECT = gql`
      
mutation Mutation($name: String!, $subjectcode: String!) {
  createSubject(name: $name, subjectcode: $subjectcode) {
    id
    name
  }
}     

`;