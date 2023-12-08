import React from "react";

const page = () => {
  return (
    <div className="flex row p-20 border-solid border-2 border-sky-500  rounded-2xl  w-full h-full">
      <div className=" border-solid border-2 border-sky-500 min-w-[40%]">
        Left
      </div>
      <div className=" border-solid border-2 border-sky-500 min-w-[60%]">
        Right
      </div>
    </div>
  );
};

export default page;
