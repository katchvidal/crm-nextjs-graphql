import { gql } from '@apollo/client'


export const SIGN_IN_QUERY = gql`
    query Query($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
            status
            message
            token
            user {
            _id
            name
            lastname
            email
            createAT
            role
            active
            }
        }
    }
`;