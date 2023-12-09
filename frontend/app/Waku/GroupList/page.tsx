import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { CreateGroupButton } from "./CreateGroup";
const page = () => {
  return (
    <div className="overflow-scroll  h-[100vh]">
      <div className="border-2 border-solid justify-center flex  border-white p-3 text-xl m-3 rounded-2xl">
        <CreateGroupButton />
        {/* <Input placeholder=" make group ➕" />
        <Button className="p-4 h-full" variant="ghost">
          Create
        </Button> */}
      </div>
      <div className="flex justify-center text-4xl m-4 text-purple-400 font-display">
        Group List
      </div>
      <div className="border-2 border-solid justify-center flex flex-col  border-white p-5    rounded-2xl">
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
        <div>GroupList</div>
      </div>
    </div>
  );
};

export default page;
