"use client";

import { init, useQuery } from "@airstack/airstack-react";
import { User } from "lucide-react";
import Image from "next/image";
import image from "./people.png";
init("1e8cf76e011624533995cae03c7cf2299");
import AddressCopy from "@/components/AddressCopy";
const query = `YOUR_QUERY`; // Replace with GraphQL Query

function ProfileData({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(`query MyQuery {
    Domains(input: {filter: {name: {_eq: "${userId}"}}, blockchain: ethereum}) {
      Domain {
        tokenNft {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
            video {
              original
            }
          }
          erc6551Accounts(input: {filter: {address: {_eq: "${userId}"}}}) {
            nft {
              address
              chainId
            }
          }
        }
        dappName
        ownerDetails {
          addresses
          xmtp {
            id
            isXMTPEnabled
          }
        }
        subDomainCount
      }
    }
  }`);

  if (data) {
    const result = JSON.stringify(data.Domains);
    console.log(result);
    return (
      <div className=" w-full h-full bg-white overflow-hidden">
        {/* {data.Domains.Domain[0].ownerDetails.xmtp[0].isXMTPEnabled ? (
          <p>Xmtp id : {data.Domains.Domain[0].ownerDetails.xmtp[0].id}</p>
        ) : (
          <p>you dont have any Xmtp ID </p>
        )}

        <p>Dapp {data.Domains.Domain[0].dappName}</p> */}
        {/* <div className="flex"> */}
        {data.Domains.Domain[0].tokenNft.contentValue.image != null ? (
          <img
            className="w-full h-full object-cover bg-red-700"
            src={data.Domains.Domain[0].tokenNft.contentValue.image.extraSmall}
            alt=""
          />
        ) : (
          <Image
            src={image}
            alt=""
            height={1250}
            width={1250}
            className="w-full h-full object-cover bg-red-700"
          />
        )}
        {/* <AddressCopy address={userId} /> */}
        {/* </div> */}
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

export default ProfileData;
