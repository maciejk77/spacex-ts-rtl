import { gql } from 'apollo-boost';

export const GET_DATA = gql`
  query GetDataQuery($rocketType: String!) {
    allRockets(rocketType: $rocketType) {
      id
      name
      description
      flickr_images
    }
  }
`;
