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
  Upload: any;
};

export type AttackResult = {
  __typename?: 'AttackResult';
  getExpPoint: Scalars['Int'];
  items: Array<Item>;
  lossHitPoint: Scalars['Int'];
};

export enum Color {
  Green = 'GREEN',
  Red = 'RED'
}

export type ExhumeResult = {
  __typename?: 'ExhumeResult';
  getExpPoint: Scalars['Int'];
  getItems: Array<ItemResult>;
};

export type Gallery = {
  __typename?: 'Gallery';
  baseSignType: Scalars['Int'];
  sign: Array<SignInfo>;
};

export type Item = {
  __typename?: 'Item';
  effect: ItemEffect;
  id: Scalars['String'];
  level: Scalars['Int'];
  name: Scalars['String'];
  value: Scalars['Float'];
};

export enum ItemEffect {
  Attack = 'ATTACK',
  Endurance = 'ENDURANCE',
  Heal = 'HEAL',
  Resistance = 'RESISTANCE'
}

export type ItemResult = {
  __typename?: 'ItemResult';
  item: Item;
  numberOfAcquisition: Scalars['Int'];
};

export type MapInfo = {
  __typename?: 'MapInfo';
  polygons: Array<Polygon>;
  segments: Array<Segment>;
  signs: Array<Sign>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: Array<Item>;
  addUser: User;
  attackSign: AttackResult;
  captureSign: Sign;
  changeItem: Array<Item>;
  deleteItem: Array<Item>;
  exhumeSign: Array<ExhumeResult>;
  predictImage: PredictResult;
  registSign: Sign;
  updateUser: User;
};


export type MutationAddItemArgs = {
  havingItemId: Scalars['String'];
};


export type MutationAddUserArgs = {
  group: Color;
  name: Scalars['String'];
};


export type MutationAttackSignArgs = {
  havingItemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationCaptureSignArgs = {
  signId: Scalars['String'];
};


export type MutationChangeItemArgs = {
  havingItemId: Scalars['String'];
  usingItemId: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  usingItemId: Scalars['String'];
};


export type MutationExhumeSignArgs = {
  signId: Scalars['String'];
};


export type MutationPredictImageArgs = {
  image: Scalars['Upload'];
};


export type MutationRegistSignArgs = {
  registSignInput: RegistSignInput;
};


export type MutationUpdateUserArgs = {
  name: Scalars['String'];
};

export type Polygon = {
  __typename?: 'Polygon';
  createdAt: Scalars['DateTime'];
  group: Color;
  id: Scalars['String'];
  signIds: Array<Scalars['String']>;
  surface: Scalars['Float'];
};

export type PowerRatio = {
  __typename?: 'PowerRatio';
  green: Scalars['Float'];
  red: Scalars['Float'];
};

export type PredictResult = {
  __typename?: 'PredictResult';
  scores?: Maybe<Array<SuggestResult>>;
  status: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  galleries: Array<Gallery>;
  items: Array<Item>;
  mapInfo: MapInfo;
  powerRatio: PowerRatio;
  sign: Sign;
  user: User;
};


export type QuerySignArgs = {
  signId: Scalars['String'];
};

export type RegistSignInput = {
  baseSignTypes: Array<Scalars['Int']>;
  imagePath: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Segment = {
  __typename?: 'Segment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  otherSignId: Scalars['String'];
  signId: Scalars['String'];
};

export type Sign = {
  __typename?: 'Sign';
  baseSignTypes: Array<Scalars['Int']>;
  group: Color;
  hitPoint: Scalars['Int'];
  id: Scalars['String'];
  imagePath: Scalars['String'];
  items: Array<Item>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  maxHitPoint: Scalars['Int'];
  maxItemSlot: Scalars['Int'];
  maxLinkSlot: Scalars['Int'];
  owner: User;
};

export type SignInfo = {
  __typename?: 'SignInfo';
  baseSignTypes: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  imagePath: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  maxHitPoint: Scalars['Int'];
  maxItemSlot: Scalars['Int'];
  maxLinkSlot: Scalars['Int'];
};

export type SuggestResult = {
  __typename?: 'SuggestResult';
  score: Scalars['Float'];
  signType: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  expPoint: Scalars['Int'];
  group: Color;
  id: Scalars['String'];
  level: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AddUserMutationVariables = Exact<{
  name: Scalars['String'];
  group: Color;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, name: string, level: number, group: Color } };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, level: number, group: Color } };


export const AddUserDocument = gql`
    mutation addUser($name: String!, $group: Color!) {
  addUser(name: $name, group: $group) {
    id
    name
    level
    group
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const UserInfoDocument = gql`
    query userInfo {
  user {
    id
    level
    group
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;