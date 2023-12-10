import { Button } from "@nextui-org/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xbbc1ff78605c9f8c178d474e3d66aca2512b2d59838fac927f23320f5b101fca1b7ed14f387e0ff09a0ded2f6468be24f87e23328a472e7692ae25dae8d4f120/HelloWorld",
});
const collectionReference = db.collection("User");
export function CreateGroupButton() {
  const [name, setName] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [roomidFlag, setRoomIdFlag] = React.useState(false);
  const [roomid, setRoomId] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  function handleName(e: any) {
    console.log(e.target.value);
    setName(e.target.value);
  }

  async function Create() {
    try {
      setRoomIdFlag(true);
      const { data } = await axios.post(
        "https://api.huddle01.com/api/v1/create-room",
        {
          title: "Huddle01-Test",
          roomLock: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YUrGqz1EQRCpMGv4bkzrE5da8MYVlalA",
          },
        }
      );

      const recordData = await collectionReference.create([
        name,
        name,
        data.data.roomId,
      ]);

      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  }
  const handler = async () => {
    try {
      setRoomIdFlag(false);
    } catch (error) {
      // res.status(500).json(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Create Group ➕</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enjoy with Your friend With HelloWorld</DialogTitle>
          <DialogDescription>Please enter name without space</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Name</p>
            <Input
              onChange={(e: any) => {
                handleName(e);
              }}
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {!success ? (
            <div>
              {roomidFlag ? (
                <div> Creating Room id for channel</div>
              ) : (
                <Button
                  type="submit"
                  onClick={() => {
                    Create();
                  }}
                >
                  Create group
                </Button>
              )}
            </div>
          ) : (
            <div className="text-2xl text-green-400 p-3 border-solid border-2 border-white">
              Your channel is created successfully please refresh page and check{" "}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
