"use client";

import { init, useQuery } from "@airstack/airstack-react";

init("1e8cf76e011624533995cae03c7cf2299");

// Replace with GraphQL Query

function FollowerData({ userID }: { userID: string }) {
  console.log(userID);
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
          contentValue {
          
            image {
              extraSmall
            }
          }
        }
      }
    }
  }`);
  const showOverlay = (index: number) => {
    const overlay = document.getElementById(`overlay-${index}`);
    if (overlay) {
      overlay.style.opacity = "1";
    }
  };

  const hideOverlay = (index: number) => {
    const overlay = document.getElementById(`overlay-${index}`);
    if (overlay) {
      overlay.style.opacity = "0";
    }
  };

  if (data) {
    console.log(data);
    return (
      <div className="flex-wrap flex">
        {data.Poaps.Poap.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onMouseOver={() => showOverlay(index)}
              onMouseOut={() => hideOverlay(index)}
            >
              {/* <p>event name :- {item.poapEvent.eventName}</p> */}
              {item.poapEvent.contentValue.image != null && (
                <div>
                  <img
                    src={item.poapEvent.contentValue.image.extraSmall}
                    alt={`Image ${index + 1}`}
                    className="w-32 h-32 border border-gray-300 transition-transform transform hover:scale-110"
                  />
                  <div
                    id={`overlay-${index}`}
                    className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-black p-2 transition-opacity"
                  >
                    {item.poapEvent.eventName}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
