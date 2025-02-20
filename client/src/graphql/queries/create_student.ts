import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($name: String!, $scholarnumber: String!, $email: String!) {
    createStudent(name: $name, scholarnumber: $scholarnumber, email: $email) {
      id
      name
      scholarnumber
    }
  }
`;



export const CREATE_TEACHER = gql`
  mutation CreateTeacher($name: String!, $email: String!) {
    createTeacher(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
