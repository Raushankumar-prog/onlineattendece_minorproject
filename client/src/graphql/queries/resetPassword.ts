


import { gql } from "@apollo/client";

export const RESET_STUDENT_PASSWORD = gql`
mutation Mutation($email: String!, $newPassword: String!) {
  resetStudentPassword(email: $email, newPassword: $newPassword)
}

`;


export const RESET_TEACHER_PASSWORD = gql`
mutation ResetTeacherPassword($email: String!, $newPassword: String!) {
  resetTeacherPassword(email: $email, newPassword: $newPassword)
}
`;