import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UserDataPage from "@/app/UserDataPage/page";
export default function Home() {
  return (
    <main className="flex items-center flex-col p-24">
      <ConnectButton />
      <UserDataPage />
    </main>
  );
}
