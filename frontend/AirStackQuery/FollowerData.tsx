"use client";

import { init, useQuery } from "@airstack/airstack-react";
import { userPoap } from "@/graphql/userPoap";
import { Variable } from "lucide-react";

init("1e8cf76e011624533995cae03c7cf2299");

// Replace with GraphQL Query

function FollowerData({ userID }: { userID: string }) {
  const { data, loading, error } = useQuery(`query MyQuery {
    Poaps(
      input: {
        filter: { owner: { _in: ["${userID}"] } }
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
  }`);

  if (data) {
    return <p>Data: {JSON.stringify(data)}</p>;
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
