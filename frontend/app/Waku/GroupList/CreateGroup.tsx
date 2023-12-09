import { Button } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Input } from "@/components/ui/input";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xbbc1ff78605c9f8c178d474e3d66aca2512b2d59838fac927f23320f5b101fca1b7ed14f387e0ff09a0ded2f6468be24f87e23328a472e7692ae25dae8d4f120/HelloWorld",
});
export function CreateGroupButton() {
  const [logo, setLogo] = React.useState("");
  function handleLogo(e: any) {
    console.log(e.target.files[0]);
    setLogo(e.target.files[0]);
  }

  async function Create() {
    if (logo != "") {
      const imageis = new FormData();
      imageis.append("file", logo);
      imageis.append("upload_preset", "ml_default");
      const ImageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dxfejxnvp/image/upload",
        {
          method: "POST",
          body: imageis,
        }
      );
      const data = await ImageResponse.json();
      console.log(data.secure_url);
    } else {
      alert("please select image");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Create Group ➕</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enjoy with Your friend With HelloWorld</DialogTitle>
          <DialogDescription>
            Anyone Can join your group and can talk with you with easy
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Name</p>
            <Input defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Group image</p>
            <Input defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
