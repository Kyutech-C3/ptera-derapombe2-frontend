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

export type BaseSign = {
  __typename?: 'BaseSign';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['Int'];
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

export type CoordinateInput = {
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
  baseSign: BaseSign;
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

export type NearlySign = {
  __typename?: 'NearlySign';
  distanse: Scalars['Float'];
  sign: Sign;
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
  nearlySigns: Array<NearlySign>;
  powerRatio: PowerRatio;
  requiredExp: Array<Scalars['Int']>;
  sign: Sign;
  user: User;
};


export type QueryNearlySignsArgs = {
  signId: Scalars['String'];
};


export type QuerySignArgs = {
  signId: Scalars['String'];
};

export type RegistSignInput = {
  baseSignTypes: Array<Scalars['Int']>;
  coordinate: CoordinateInput;
  imagePath: Scalars['String'];
};

export type Sign = {
  __typename?: 'Sign';
  baseSigns: Array<BaseSign>;
  coordinate: Coordinate;
  createdAt: Scalars['DateTime'];
  group?: Maybe<Color>;
  hitPoint?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  imagePath: Scalars['String'];
  items?: Maybe<Array<Item>>;
  linkNum: Scalars['Int'];
  maxHitPoint: Scalars['Int'];
  maxItemSlot: Scalars['Int'];
  maxLinkSlot: Scalars['Int'];
  owner?: Maybe<User>;
};

export type SignInfo = {
  __typename?: 'SignInfo';
  baseSigns: Array<BaseSign>;
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

export type PredictImageMutationVariables = Exact<{
  file: Scalars['String'];
}>;


export type PredictImageMutation = { __typename?: 'Mutation', predictImage: { __typename?: 'PredictResult', status: boolean, scores?: Array<Array<{ __typename?: 'SuggestResult', score: number, signType: number, signName: string }>> | null } };

export type RegistSignMutationVariables = Exact<{
  baseSignTypes: Array<Scalars['Int']> | Scalars['Int'];
  imagePath: Scalars['String'];
  coordinate: CoordinateInput;
}>;


export type RegistSignMutation = { __typename?: 'Mutation', registSign: { __typename?: 'Sign', id: string, coordinate: { __typename?: 'Coordinate', latitude: number, longitude: number }, baseSigns: Array<{ __typename?: 'BaseSign', id: string, name: string, type: number }> } };

export type IventoryItemQueryVariables = Exact<{ [key: string]: never; }>;


export type IventoryItemQuery = { __typename?: 'Query', galleries: Array<{ __typename?: 'Gallery', baseSign: { __typename?: 'BaseSign', id: string, name: string, type: number } }>, items: Array<{ __typename?: 'Item', effect: ItemEffect, id: string, level: number, name: string, value: number }> };

export type MapPageInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MapPageInfoQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, level: number, expPoint: number, group: Color, avatarUrl: string }, powerRatio: { __typename?: 'PowerRatio', green: number, red: number } };

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
export const PredictImageDocument = gql`
    mutation predictImage($file: String!) {
  predictImage(file: $file) {
    scores {
      score
      signType
      signName
    }
    status
  }
}
    `;
export type PredictImageMutationFn = Apollo.MutationFunction<PredictImageMutation, PredictImageMutationVariables>;

/**
 * __usePredictImageMutation__
 *
 * To run a mutation, you first call `usePredictImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePredictImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [predictImageMutation, { data, loading, error }] = usePredictImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function usePredictImageMutation(baseOptions?: Apollo.MutationHookOptions<PredictImageMutation, PredictImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PredictImageMutation, PredictImageMutationVariables>(PredictImageDocument, options);
      }
export type PredictImageMutationHookResult = ReturnType<typeof usePredictImageMutation>;
export type PredictImageMutationResult = Apollo.MutationResult<PredictImageMutation>;
export type PredictImageMutationOptions = Apollo.BaseMutationOptions<PredictImageMutation, PredictImageMutationVariables>;
export const RegistSignDocument = gql`
    mutation registSign($baseSignTypes: [Int!]!, $imagePath: String!, $coordinate: CoordinateInput!) {
  registSign(
    registSignInput: {baseSignTypes: $baseSignTypes, coordinate: $coordinate, imagePath: $imagePath}
  ) {
    coordinate {
      latitude
      longitude
    }
    id
    baseSigns {
      id
      name
      type
    }
  }
}
    `;
export type RegistSignMutationFn = Apollo.MutationFunction<RegistSignMutation, RegistSignMutationVariables>;

/**
 * __useRegistSignMutation__
 *
 * To run a mutation, you first call `useRegistSignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistSignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registSignMutation, { data, loading, error }] = useRegistSignMutation({
 *   variables: {
 *      baseSignTypes: // value for 'baseSignTypes'
 *      imagePath: // value for 'imagePath'
 *      coordinate: // value for 'coordinate'
 *   },
 * });
 */
export function useRegistSignMutation(baseOptions?: Apollo.MutationHookOptions<RegistSignMutation, RegistSignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistSignMutation, RegistSignMutationVariables>(RegistSignDocument, options);
      }
export type RegistSignMutationHookResult = ReturnType<typeof useRegistSignMutation>;
export type RegistSignMutationResult = Apollo.MutationResult<RegistSignMutation>;
export type RegistSignMutationOptions = Apollo.BaseMutationOptions<RegistSignMutation, RegistSignMutationVariables>;
export const IventoryItemDocument = gql`
    query IventoryItem {
  galleries {
    baseSign {
      id
      name
      type
    }
  }
  items {
    effect
    id
    level
    name
    value
  }
}
    `;

/**
 * __useIventoryItemQuery__
 *
 * To run a query within a React component, call `useIventoryItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useIventoryItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIventoryItemQuery({
 *   variables: {
 *   },
 * });
 */
export function useIventoryItemQuery(baseOptions?: Apollo.QueryHookOptions<IventoryItemQuery, IventoryItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IventoryItemQuery, IventoryItemQueryVariables>(IventoryItemDocument, options);
      }
export function useIventoryItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IventoryItemQuery, IventoryItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IventoryItemQuery, IventoryItemQueryVariables>(IventoryItemDocument, options);
        }
export type IventoryItemQueryHookResult = ReturnType<typeof useIventoryItemQuery>;
export type IventoryItemLazyQueryHookResult = ReturnType<typeof useIventoryItemLazyQuery>;
export type IventoryItemQueryResult = Apollo.QueryResult<IventoryItemQuery, IventoryItemQueryVariables>;
export const MapPageInfoDocument = gql`
    query MapPageInfo {
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