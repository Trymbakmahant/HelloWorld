"use client";
import { useState, useEffect } from "react";
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder, Decoder, WakuNode } from "@waku/sdk";
import protobuf from "protobufjs";
import { useLightPush, useFilterMessages } from "@waku/react";

import "./page.css";

function Waku() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const contentTopic = "/waku-react-guide/1/chat/proto";
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

  // Create and start a Light Node

  // Create a message encoder and decoder

  // Create a message structure using Protobuf
  const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("message", 2, "string"));

  const { push } = useLightPush({ node, encoder });
  console.log(messages);
  // Send the message using Light Push
  const sendMessage = async () => {
    if (!push || inputMessage.length === 0) return;

    // Create a new message object
    const timestamp = Date.now();
    const protoMessage = ChatMessage.create({
      timestamp: timestamp,
      message: inputMessage,
    });
    const myDate = new Date(timestamp);
    // Serialise the message and push to the network
    const payload = ChatMessage.encode(protoMessage).finish();
    const { recipients, errors } = await push({ payload, timestamp: myDate });

    // Check for errors
    if (errors?.length === 0) {
      setInputMessage("");
      console.log("MESSAGE PUSHED");
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <div className="chat-interface">
        <h1>Waku React Demo</h1>
        <div className="chat-body">
          {messages.map((message: any, index: any) => (
            <div key={index} className="chat-message">
              <span>{new Date(message.timestamp).toUTCString()}</span>
              <div className="message-text">{message.message}</div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            id="message-input"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Waku;
