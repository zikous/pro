import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      dateJoined
      isActive
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
      payload
      refreshExpiresIn
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      success
      message
      user {
        id
        email
        dateJoined
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      payload
      refreshExpiresIn
    }
  }
`;

export const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const REVOKE_TOKEN_MUTATION = gql`
  mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;
