import { gql } from "@apollo/client";

export const AUTH_ME_QUERY = gql`
    query AuthMe {
        Auth {
            status
            message
            user {
                _id
                name
                lastname
                email
            }
        }
    }
`;