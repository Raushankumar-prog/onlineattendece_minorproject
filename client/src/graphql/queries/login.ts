import { gql } from "@apollo/client";

export const loginstudent = gql`
 mutation LoginStudent($email: String!, $password: String, $googleId: String) {
  loginStudent(email: $email, password: $password, googleId: $googleId) {
    token
    student {
      id
    }
  }
}
`;


export const loginteaher= gql`
  mutation LoginTeacher($email: String!, $password: String, $googleId: String) {
  loginTeacher(email: $email, password: $password, googleId: $googleId) {
    token
    student {
      id
    }
  }
}
`;