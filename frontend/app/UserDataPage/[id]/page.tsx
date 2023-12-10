"use client";
import React from "react";
import ProfileData from "@/AirStackQuery/ProfileData";
import NftData from "@/AirStackQuery/NftData";
import { useParams } from "next/navigation";
import PoapData from "@/AirStackQuery/Poap";
interface RouteParams {
  id: string;
}

const page = () => {
  const { id } = useParams();

  return (
    <div className="flex row p-20 absolute border-solid border-2 border-sky-500  rounded-2xl  w-fit">
      <div className=" border-solid h-fit border-2 felx flex-col border-sky-500 min-w-[40%]">
        <h1 className="flex justify-center text-4xl font-bold text-sky-500 p-10">
          User Profile
        </h1>
        <ProfileData userId={id} />
      </div>
      <div>
        <div className=" border-solid border-2 flex flex-col h-[50vh] overflow-scroll border-sky-500 ">
          <div>
            <h1 className="flex justify-center text-4xl font-bold text-sky-500 p-10">
              Nft Data
            </h1>
            <NftData userID={id} />
          </div>
        </div>
        <div className=" border-solid border-2 flex flex-col h-[50vh] overflow-scroll border-sky-500 ">
          <div>
            <h1 className="flex justify-center text-4xl font-bold text-sky-500 p-10">
              {" "}
              Poaps
            </h1>
            <PoapData userID={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
