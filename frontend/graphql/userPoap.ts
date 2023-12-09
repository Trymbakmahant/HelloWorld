import { gql } from "@apollo/client";
// Import DocumentNode from graphql package

export const userPoap = gql`
  query MyQuery {
    Poaps(
      input: {
        filter: {
          owner: { _in: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"] }
        }
        blockchain: ALL
      }
    ) {
      Poap {
        eventId
        tokenId
        poapEvent {
          eventName
          description
        }
      }
    }
  }
`;
