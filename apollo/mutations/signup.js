import { gql } from "@apollo/client";



export const SIGN_UP_MUTATION = gql`
    mutation Mutation($user: UserInput!) {
    SignUp(user: $user) {
            status
            message
            user {
                _id
                name
                lastname
                email
                password
            }
        }
    }
`;