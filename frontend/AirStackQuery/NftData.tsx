"use client";

import { init, useQuery } from "@airstack/airstack-react";
import { userPoap } from "@/graphql/userPoap";
import { Variable } from "lucide-react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";

init("1e8cf76e011624533995cae03c7cf2299");

// Replace with GraphQL Query

function FollowerData({ userID }: { userID: string }) {
  const { data, loading, error } = useQuery(`query MyQuery {
    Ethereum: TokenBalances(
      input: {
        filter: {
          owner: {
            _in: [
              "${userID}"
              
            ]
          }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: ethereum
        limit: 50
      }
    ) {
      TokenBalance {
        owner {
          identity
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
    Polygon: TokenBalances(
      input: {
        filter: {
          owner: {
            _in: [
              "${userID}"
         
            
            ]
          }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: polygon
        limit: 50
      }
    ) {
      TokenBalance {
        owner {
          identity
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
    Base: TokenBalances(
      input: {
        filter: {
          owner: {
            _in: [
              "${userID}"
             
            ]
          }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: base
        limit: 50
      }
    ) {
      TokenBalance {
        owner {
          identity
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }`);

  if (data) {
    return (
      <div>
        {data.Ethereum.TokenBalance.map(
          (item: any, index: Key | null | undefined) => {
            return (
              <div
                key={index}
                className="border-solid border-2 border-sky-500 m-3 p-3"
              >
                <p> token type = {item.tokenType}</p>
                <p> token address = {item.tokenAddress}</p>

                {item.tokenNfts.contentValue.image != null ? (
                  <img src={item.tokenNfts.contentValue.image.small} />
                ) : (
                  <div>Sorry This token dose not have any Image</div>
                )}
              </div>
            );
          }
        )}
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return <div>your Data is loading please wait</div>;
}

export default FollowerData;
