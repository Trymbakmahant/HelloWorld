"use client";
import { useState, useEffect } from "react";
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder, Decoder, WakuNode } from "@waku/sdk";
import protobuf from "protobufjs";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLightPush, useFilterMessages } from "@waku/react";
import { useAccount } from "wagmi";
import { useMyContext } from "../context/Appcontext";
import { Button, Input, button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import GroupList from "@/app/Waku/GroupList/page";
function Waku() {
  const { Name } = useMyContext();
  const { channel } = useParams();
  const route = useRouter();
  const { address } = useAccount();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const contentTopic = channel.toString();
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
      route.push(`./Meet/${Name}`);
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
          <div className="border-solid flex justify-end flex-col w-full border-blue-500 border-2 h-full">
            <div className="flex flex-grow-1 flex-col overflow-y-auto p-[10px]">
              {messages.map((message: any, index: any) => (
                <div key={index} className="chat-message">
                  <Link
                    href={`/UserDataPage/${message.sender}`}
                  >{`by  ${message.sender}`}</Link>
                  <div className=" text-white text-lg font-bold p-2 mt-2">
                    {message.message}
                  </div>

                  {message.video === "yes" && (
                    <Link href={`./Meet/${Name}`}>Join video call </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 w-[80%] pb-2 flex-row">
              <Input
                type="text"
                className="flex flex-grow-1 rounded-3"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
              />
              <button
                className="text-4xl p-1 rounded-2xl border-2 border-solid border-blue-400"
                onClick={sendMessage}
              >
                🚀
              </button>
              <button
                className="text-4xl p-1 rounded-2xl border-2 border-solid border-blue-400"
                onClick={videoCall}
              >
                Video Call
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  items-center flex-col">
          <p className="text-2xl text-blue-400">
            Please Connect wallet before continue
          </p>
          <ConnectButton />
        </div>
      )}
    </>
  );
}

export default Waku;
