import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Waku from "@/app/Waku/page";
import UserDataPage from "@/app/UserDataPage/[id]/page";
import Huddle from "./huddle/page";

export default function Home() {
  return (
    <main className="flex items-center flex-col p-24">
      <ConnectButton />
      <Waku />
      {/* <Huddle /> */}
    </main>
  );
}
