import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddUserInput = {
  avatarNumber: Scalars['Int'];
  group: Color;
  name: Scalars['String'];
};

export enum Color {
  Green = 'GREEN',
  Red = 'RED'
}

export type Mutation = {
  __typename?: 'Mutation';
  userAdd: User;
};


export type MutationUserAddArgs = {
  userInput: AddUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarNumber: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  expPoint: Scalars['Int'];
  group: Color;
  id: Scalars['String'];
  level: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserAddMutationVariables = Exact<{
  params: AddUserInput;
}>;


export type UserAddMutation = { __typename?: 'Mutation', userAdd: { __typename?: 'User', id: string, name: string, level: number, group: Color } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, level: number, group: Color } };


export const UserAddDocument = gql`
    mutation userAdd($params: AddUserInput!) {
  userAdd(userInput: $params) {
    id
    name
    level
    group
  }
}
    `;
export type UserAddMutationFn = Apollo.MutationFunction<UserAddMutation, UserAddMutationVariables>;

/**
 * __useUserAddMutation__
 *
 * To run a mutation, you first call `useUserAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAddMutation, { data, loading, error }] = useUserAddMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUserAddMutation(baseOptions?: Apollo.MutationHookOptions<UserAddMutation, UserAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserAddMutation, UserAddMutationVariables>(UserAddDocument, options);
      }
export type UserAddMutationHookResult = ReturnType<typeof useUserAddMutation>;
export type UserAddMutationResult = Apollo.MutationResult<UserAddMutation>;
export type UserAddMutationOptions = Apollo.BaseMutationOptions<UserAddMutation, UserAddMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    level
    group
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;