"use client";
import { useState, useEffect } from "react";
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder, Decoder, WakuNode } from "@waku/sdk";
import protobuf from "protobufjs";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLightPush, useFilterMessages } from "@waku/react";
import { useAccount } from "wagmi";
import { Button, Input, button } from "@nextui-org/react";
import GroupList from "./GroupList/page";
import { useMyContext } from "../context/Appcontext";
function Waku() {
  const { setName, Name } = useMyContext();
  const { address } = useAccount();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const contentTopic = Name;
  const encoder = createEncoder({ contentTopic });
  const decoder = createDecoder(contentTopic);
  const { node, error, isLoading } = useWaku();
  const { messages: filterMessages } = useFilterMessages({ node, decoder });

  function FetchMessage() {
    console.log(messages);
    setMessages(
      filterMessages.map((wakuMessage) => {
        if (!wakuMessage.payload) return;
        return ChatMessage.decode(wakuMessage.payload);
      })
    );
  }
  useEffect(() => {
    console.log("hello");
  }, [Name]);
  // Render the list of messages
  useEffect(() => {
    if (filterMessages) {
      FetchMessage();
    }
  }, [filterMessages]);
  if (error) {
    return <div> there is some error in node {error}</div>;
  }

  // Update the inputMessage state as the user input changes
  const handleInputChange = (e: any) => {
    setInputMessage(e.target.value);
  };

  const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("sender", 2, "string"))
    .add(new protobuf.Field("message", 3, "string"))
    .add(new protobuf.Field("video", 4, "string"));

  const { push } = useLightPush({ node, encoder });

  // Send the message using Light Push
  const videoCall = async () => {
    try {
      if (!push || inputMessage.length === 0) return;

      // Create a new message object
      const timestamp = Date.now();
      const protoMessage = ChatMessage.create({
        timestamp: timestamp,
        sender: address,
        message: inputMessage,
        video: "yes",
      });
      const myDate = new Date(timestamp);
      // Serialise the message and push to the network
      const payload = ChatMessage.encode(protoMessage).finish();
      console.log(push);
      const { recipients, errors } = await push({ payload, timestamp: myDate });
      console.log(recipients);
      // Check for errors
      if (errors?.length === 0) {
        setInputMessage("");
        console.log("MESSAGE PUSHED");
      } else {
        console.log(errors);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = async () => {
    try {
      if (!push || inputMessage.length === 0) return;

      // Create a new message object
      const timestamp = Date.now();
      const protoMessage = ChatMessage.create({
        timestamp: timestamp,
        sender: address,
        message: inputMessage,
        video: "no",
      });
      const myDate = new Date(timestamp);
      // Serialise the message and push to the network
      const payload = ChatMessage.encode(protoMessage).finish();
      console.log(push);
      const { recipients, errors } = await push({ payload, timestamp: myDate });
      console.log(recipients);
      // Check for errors
      if (errors?.length === 0) {
        setInputMessage("");
        console.log("MESSAGE PUSHED");
      } else {
        console.log(errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {address ? (
        <div className="absolute w-full h-full">
          <div className="border-solid flex flex-row border-2 border-blue-500 w-full h-[100vh]">
            <div className="w-[400px] border-solid border-blue-500 border-2 ">
              <GroupList />
            </div>
            join any chat least that you want ❤️
          </div>
        </div>
      ) : (
        <div className="flex  items-center flex-col">
          <p className="text-2xl text-blue-400  justify-center mt-10">
            Please Connect wallet before continue
          </p>
          <ConnectButton />
        </div>
      )}
    </>
  );
}

export default Waku;
