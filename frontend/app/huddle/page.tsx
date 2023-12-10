"use client";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import {
  useLocalVideo,
  useLocalAudio,
  usePeerIds,
} from "@huddle01/react/hooks";
import { useRoom } from "@huddle01/react/hooks";

import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import AcceptPeer from "./acceptPeer";
const Huddle = () => {
  const { stream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
  const { stream: audioStream, enableAudio, disableAudio } = useLocalAudio();
  const [roomid, setRoomId] = useState<string>("lgr-shul-chz");
  const [token, settoken] = useState<string>("");
  //
  const { joinRoom, leaveRoom } = useRoom({
    onJoin: () => {
      console.log("Joined the room");
    },
    onLeave: () => {
      console.log("Left the room");
    },
  });

  async function getserversideprops() {
    const accessToken = new AccessToken({
      apiKey: "YUrGqz1EQRCpMGv4bkzrE5da8MYVlalA",
      roomId: roomid,
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

  const handler = async () => {
    try {
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

      // res.status(200).json(data);
      console.log(data.data.roomId);
      setRoomId(data.data.roomId);
    } catch (error) {
      // res.status(500).json(error);
    }
  };

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
      <button className="bg-blue-400 p-3" onClick={handler}>
        create a room
      </button>
      <button
        className="bg-blue-400 p-3"
        onClick={() => joinRoom({ roomId: roomid, token })}
      >
        Join Lobby
      </button>

      <div
        className="bg-blue-400 p-3"
        onClick={() => {
          enableVideo();
        }}
      >
        Enable Video
      </div>
      <div
        className="bg-blue-400 p-3"
        onClick={() => {
          disableVideo();
        }}
      >
        Close video
      </div>

      {/* Mic */}
      <button
        className="bg-blue-400 p-3"
        onClick={async () => {
          await enableAudio();
        }}
      >
        Fetch and Produce Audio Stream
      </button>

      {isVideoOn && (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-1/2 mx-auto border-2 rounded-xl border-blue-400"
        />
      )}
      <div>
        {peerIds.map((peerId: any) =>
          peerId ? <AcceptPeer key={peerId} peerId={peerId} /> : null
        )}
      </div>
    </div>
  );
};

export default Huddle;
