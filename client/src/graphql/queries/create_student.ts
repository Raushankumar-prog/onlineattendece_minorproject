import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($name: String!, $scholarnumber: String!, $email: String!, $semester: String!, $branch: String!, $password: String, $googleId: String) {
  createStudent(name: $name, scholarnumber: $scholarnumber, email: $email, semester: $semester, branch: $branch, password: $password, googleId: $googleId) {
    id
    name
    email
  }
}
`;



export const CREATE_TEACHER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String, $googleId: String) {
  createTeacher(name: $name, email: $email, password: $password, googleId: $googleId) {
    id
  }
}
`;
