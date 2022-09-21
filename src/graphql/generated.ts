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

export enum Color {
  Green = 'GREEN',
  Red = 'RED'
}

export type Coordinate = {
  __typename?: 'Coordinate';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type ExhumeResult = {
  __typename?: 'ExhumeResult';
  expPoint: Scalars['Int'];
  items: Array<Item>;
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

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['DateTime'];
  group: Color;
  oneCoordinate: Coordinate;
  otherCoordinate: Coordinate;
  otherSignId: Scalars['String'];
  polygonId?: Maybe<Scalars['String']>;
  signId: Scalars['String'];
};

export type MapInfo = {
  __typename?: 'MapInfo';
  links: Array<Link>;
  polygons: Array<Polygon>;
  signs: Array<Sign>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  attachItem: Array<Item>;
  attackSign: UpdateSignData;
  captureSign: Sign;
  changeItem: Array<Item>;
  connectSigns: MapInfo;
  deleteItem: Array<Item>;
  exhumeSign: ExhumeResult;
  healSign: UpdateSignData;
  predictImage: PredictResult;
  registSign: Sign;
  updateUser: User;
};


export type MutationAddUserArgs = {
  avatarUrl: Scalars['String'];
  group: Color;
  name: Scalars['String'];
};


export type MutationAttachItemArgs = {
  itemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationAttackSignArgs = {
  itemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationCaptureSignArgs = {
  signId: Scalars['String'];
};


export type MutationChangeItemArgs = {
  newItemId: Scalars['String'];
  oldItemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationConnectSignsArgs = {
  otherSignId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationExhumeSignArgs = {
  signId: Scalars['String'];
};


export type MutationHealSignArgs = {
  itemId: Scalars['String'];
  signId: Scalars['String'];
};


export type MutationPredictImageArgs = {
  file: Scalars['String'];
};


export type MutationRegistSignArgs = {
  registSignInput: RegistSignInput;
};


export type MutationUpdateUserArgs = {
  avatarUrl: Scalars['String'];
  name: Scalars['String'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<Coordinate>;
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
  scores?: Maybe<Array<Array<SuggestResult>>>;
  status: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  galleries: Array<Gallery>;
  items: Array<Item>;
  mapInfo: MapInfo;
  powerRatio: PowerRatio;
  requiredExp: Array<Scalars['Int']>;
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

export type Sign = {
  __typename?: 'Sign';
  baseSignTypes: Array<Scalars['Int']>;
  coordinate: Coordinate;
  createdAt: Scalars['DateTime'];
  group: Color;
  hitPoint: Scalars['Int'];
  id: Scalars['String'];
  imagePath: Scalars['String'];
  items: Array<Item>;
  linkNum: Scalars['Int'];
  maxHitPoint: Scalars['Int'];
  maxItemSlot: Scalars['Int'];
  maxLinkSlot: Scalars['Int'];
  owner: User;
};

export type SignInfo = {
  __typename?: 'SignInfo';
  baseSignTypes: Array<Scalars['Int']>;
  coordinate: Coordinate;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  imagePath: Scalars['String'];
  maxHitPoint: Scalars['Int'];
  maxItemSlot: Scalars['Int'];
  maxLinkSlot: Scalars['Int'];
};

export type SuggestResult = {
  __typename?: 'SuggestResult';
  score: Scalars['Float'];
  signName: Scalars['String'];
  signType: Scalars['Int'];
};

export type UpdateSignData = {
  __typename?: 'UpdateSignData';
  expPoint: Scalars['Int'];
  hitPointDiff: Scalars['Int'];
  sign: Sign;
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
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
  avatarUrl: Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, name: string, level: number, group: Color, avatarUrl: string } };

export type MapPageInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MapPageInfoQuery = { __typename?: 'Query', requiredExp: Array<number>, mapInfo: { __typename?: 'MapInfo', signs: Array<{ __typename?: 'Sign', id: string, imagePath: string, baseSignTypes: Array<number>, group: Color, maxHitPoint: number, hitPoint: number, linkNum: number, items: Array<{ __typename?: 'Item', effect: ItemEffect, id: string, level: number, name: string, value: number }>, coordinate: { __typename?: 'Coordinate', latitude: number, longitude: number } }>, polygons: Array<{ __typename?: 'Polygon', group: Color, coordinates: Array<{ __typename?: 'Coordinate', latitude: number, longitude: number }> }>, links: Array<{ __typename?: 'Link', group: Color, otherCoordinate: { __typename?: 'Coordinate', latitude: number, longitude: number }, oneCoordinate: { __typename?: 'Coordinate', latitude: number, longitude: number } }> }, user: { __typename?: 'User', name: string, level: number, expPoint: number, group: Color, avatarUrl: string }, powerRatio: { __typename?: 'PowerRatio', green: number, red: number } };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, level: number, group: Color, avatarUrl: string } };


export const AddUserDocument = gql`
    mutation addUser($name: String!, $group: Color!, $avatarUrl: String!) {
  addUser(name: $name, group: $group, avatarUrl: $avatarUrl) {
    id
    name
    level
    group
    avatarUrl
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
 *      avatarUrl: // value for 'avatarUrl'
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
export const MapPageInfoDocument = gql`
    query MapPageInfo {
  mapInfo {
    signs {
      id
      imagePath
      baseSignTypes
      group
      maxHitPoint
      hitPoint
      linkNum
      items {
        effect
        id
        level
        name
        value
      }
      coordinate {
        latitude
        longitude
      }
    }
    polygons {
      group
      coordinates {
        latitude
        longitude
      }
    }
    links {
      group
      otherCoordinate {
        latitude
        longitude
      }
      oneCoordinate {
        latitude
        longitude
      }
    }
  }
  user {
    name
    level
    expPoint
    group
    avatarUrl
  }
  powerRatio {
    green
    red
  }
  requiredExp
}
    `;

/**
 * __useMapPageInfoQuery__
 *
 * To run a query within a React component, call `useMapPageInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapPageInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapPageInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMapPageInfoQuery(baseOptions?: Apollo.QueryHookOptions<MapPageInfoQuery, MapPageInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MapPageInfoQuery, MapPageInfoQueryVariables>(MapPageInfoDocument, options);
      }
export function useMapPageInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MapPageInfoQuery, MapPageInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MapPageInfoQuery, MapPageInfoQueryVariables>(MapPageInfoDocument, options);
        }
export type MapPageInfoQueryHookResult = ReturnType<typeof useMapPageInfoQuery>;
export type MapPageInfoLazyQueryHookResult = ReturnType<typeof useMapPageInfoLazyQuery>;
export type MapPageInfoQueryResult = Apollo.QueryResult<MapPageInfoQuery, MapPageInfoQueryVariables>;
export const UserInfoDocument = gql`
    query userInfo {
  user {
    id
    level
    group
    avatarUrl
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