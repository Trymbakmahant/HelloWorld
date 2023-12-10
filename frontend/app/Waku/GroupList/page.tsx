import React, { useEffect, useState } from "react";
import { useMyContext } from "@/app/context/Appcontext";
import { CreateGroupButton } from "./CreateGroup";
import { Polybase } from "@polybase/client";
import Link from "next/link";
const db = new Polybase({
  defaultNamespace:
    "pk/0xbbc1ff78605c9f8c178d474e3d66aca2512b2d59838fac927f23320f5b101fca1b7ed14f387e0ff09a0ded2f6468be24f87e23328a472e7692ae25dae8d4f120/HelloWorld",
});
const collectionReference = db.collection("User");
const page = () => {
  const { Name, setName } = useMyContext();
  const [data, setData] = useState<any>();
  async function listRecords() {
    const records = await collectionReference.get();
    console.log(records.data);
    setData(records.data);
  }
  useEffect(() => {
    listRecords();
  }, []);
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
      <div className="border-2 border-solid justify-start h-[80vh] gap-2 flex flex-col  text-white border-white p-5    rounded-2xl">
        {data &&
          data.map((item: any, index: any) => {
            console.log(item.data.name);
            return (
              <div
                key={index}
                onClick={() => {
                  setName(item.data.roomid);
                }}
                className="cursor-pointer"
              >
                <div className="border-solid border-2 rounded-lg border-blue-400 text-2xl font-bold  p-3">
                  {" "}
                  <Link href={`./${item.data.name}`}>{item.data.name}</Link>
                </div>
                {/* <div className="border-solid border-2 rounded-lg border-blue-400 text-2xl font-bold  p-3">
                  {item.data.name}
                </div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
