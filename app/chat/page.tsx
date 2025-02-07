/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FlickerCursorWapper from "@/components/FlickerCursorWapper";
import React, { useState } from "react";
import Markdown from "react-markdown";

const handleStream = (response, onData) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let bufferObj: any;
  const isFirstMessage = true;
  function read() {
    let hasError = false;
    reader.read().then((result) => {
      buffer += decoder.decode(result.value, { stream: true });
      if (result.done) {
        return;
      }
      const lines = buffer.split("\n");
      try {
        lines.forEach((message) => {
          if (message.startsWith("data: ")) {
            // check if it starts with data:
            // console.log(message);
            try {
              bufferObj = JSON.parse(message.substring(6)); // remove data: and parse as json
            } catch (e) {
              // mute handle message cut off
              onData("", isFirstMessage, {
                conversationId: bufferObj?.conversation_id,
                messageId: bufferObj?.id,
              });
              return;
            }
            if (bufferObj.status === 400 || !bufferObj.event) {
              onData("");
              hasError = true;
              return;
            }
            onData(bufferObj.answer);
          }
        });
        buffer = lines[lines.length - 1];
      } catch (e) {
        hasError = true;
        return;
      }
      if (!hasError) {
        read();
      }
    });
  }
  read();
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { user: "You", text: input },
        { user: "Bot", text: "" },
      ]);
      setInput("");

      try {
        fetch("/v1/completion-messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"app-E62qov6Mvgpgiy2AJn0y1rD7"}`,
          },
          body: JSON.stringify({
            inputs: {},
            query: input,
            response_mode: "streaming",
            user: "user-003",
          }),
        }).then((response) => {
          if (!response.body) {
            throw new Error("No response body");
          }

          handleStream(response, (message: string) => {
            setMessages((prevMessages) => {
              const _message = [...prevMessages];
              const lastMessage = _message.pop()!;
              return [
                ..._message,
                {
                  ...lastMessage,
                  text: lastMessage.text + message,
                },
              ];
            });
          });
        });
      } catch (error) {
        console.error("Error fetching the API:", error);
      }
    }
  };
  console.log(messages);
  

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{message.user}:</strong>
            <FlickerCursorWapper isFlicker={true}>
              <Markdown>
                {message.text}
              </Markdown>
            </FlickerCursorWapper>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", padding: "10px" }}
        />
        <button
          onClick={handleSend}
          style={{ width: "18%", padding: "10px", marginLeft: "2%" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
