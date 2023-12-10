"use client";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { CiVideoOn } from "react-icons/ci";
import { CiVideoOff } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import {
  useLocalVideo,
  useLocalAudio,
  usePeerIds,
} from "@huddle01/react/hooks";
import { useRoom } from "@huddle01/react/hooks";

import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import AcceptPeer from "./acceptPeer";
import { useParams } from "next/navigation";
const Huddle = () => {
  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
  const { stream: audioStream, enableAudio, disableAudio } = useLocalAudio();
  const [join, setJoin] = useState(false);
  const { roomid } = useParams();
  const [token, settoken] = useState<string>("");
  //
  const { joinRoom, leaveRoom } = useRoom({
    onJoin: () => {
      setJoin(true);
      console.log("Joined the room");
    },
    onLeave: () => {
      setJoin(false);
      console.log("Left the room");
    },
  });

  async function getserversideprops() {
    const accessToken = new AccessToken({
      apiKey: "YUrGqz1EQRCpMGv4bkzrE5da8MYVlalA",
      roomId: roomid.toString(),
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },

      // options: {
      //   metadata: {
      //      // you can add any custom attributes here which you want to associate with the user
      //     walletAddress: "axit.eth"
      //   },
      // },
    });

    const token = await accessToken.toJwt();
    settoken(token);
  }

  //getper id
  const { peerIds } = usePeerIds({ roles: [Role.HOST, Role.CO_HOST] });

  const videoRef = useRef<HTMLVideoElement>(null);

  const useEventListener = (eventName: any, callback: any) => {
    useEffect(() => {
      const eventHandler = (event: any) => {
        callback(event.detail);
      };

      window.addEventListener(eventName, eventHandler);

      return () => {
        window.removeEventListener(eventName, eventHandler);
      };
    }, [eventName, callback]);
  };

  useEventListener("app:cam-on", (stream: MediaStream) => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  });
  useEffect(() => {
    getserversideprops();
  }, [roomid]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        {peerIds.map((peerId: any) =>
          peerId ? <AcceptPeer key={peerId} peerId={peerId} /> : null
        )}
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-1/2 mx-auto border-2 rounded-xl border-blue-400"
      />

      <div className="flex justify-center items-end  flex-row gap-10">
        {" "}
        <div
          onClick={() => {
            if (isVideoOn) {
              disableVideo();
            } else {
              enableVideo();
            }
          }}
          className="bg-blue-400 h-[60px]  w-[75px] flex rounded-xl "
        >
          {!isVideoOn ? <CiVideoOn size="4xl" /> : <CiVideoOff size="4xl" />}
        </div>
        <div className="flex flex-col">
          {!join ? (
            <Button
              className="bg-blue-400 h-[60px]  w-[75px] rounded-xl p-3"
              onClick={() => joinRoom({ roomId: roomid.toString(), token })}
            >
              Join Room
            </Button>
          ) : (
            <Button
              className="bg-red-400 h-[60px]  w-[75px] rounded-xl p-3"
              onClick={() => leaveRoom()}
            >
              Leave Room
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Huddle;
