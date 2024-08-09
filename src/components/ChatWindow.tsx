'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatWindow() {
  type Messages = {
    role: string;
    content: string;
  }[];

  const [messages, setMessages] = useState<Messages>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);

  const chatBottomRef = useRef(null);

  const [userMessage, setUserMessage] = useState<string>('');
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);

  const wait = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  useEffect(() => {
    chatBottomRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages.length]);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setUserMessage('');
    setLoadingResponse(true);
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: userMessage }),
      cache: 'no-store',
    });

    if (response.status === 201) {
      const { assistantResponse } = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantResponse },
      ]);
    } else {
      const { error } = await response.json();
      setMessages((prev) => [...prev, { role: 'error', content: error }]);
    }
    setLoadingResponse(false);
  };

  return (
    <div className="flex flex-col w-4/5 md:w-1/2 mx-auto bg-red-400 p-5 md:p-10 gap-3 mt-12 md:mt-16 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
      <div
        className="flex text-wrap flex-col gap-5 bg-white p-6 overflow-y-scroll h-96 border border-gray-900 rounded-md "
        id="chatWindow "
      >
        {messages.map((msg, idx) => {
          return (
            <div
              key={idx}
              className={`${msg.role === 'user' ? 'bg-green-300 self-end ' : ''}
                  ${msg.role === 'assistant' ? 'bg-blue-400 self-start' : ''}
                   ${
                     msg.role === 'error' ? 'bg-red-500 self-center' : ''
                   } border border-black rounded text-xs md:text-base max-w-52 md:w-1/2 text-wrap px-2 py-1 flex flex-col gap-3 `}
            >
              <p className="text-sm opacity-40 font-bold border-b border-black border-opacity-35 ">
                {msg.role.toUpperCase()}:
              </p>
              <p className="break-words text-wrap"> {msg.content}</p>
            </div>
          );
        })}
        {loadingResponse && (
          <i className=" self-start fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
        )}

        <div ref={chatBottomRef} id="chatBottom"></div>
      </div>
      <div id="promptArea mt-3">
        <form onSubmit={submitHandler} className="flex flex-col gap-2 ">
          <textarea
            value={userMessage}
            onChange={changeHandler}
            className="px-3 py-1 rounded border border-gray-900  "
            placeholder="Insert your question here"
            required={true}
            rows={3}
          />
          <button
            type="submit"
            className="bg-gray-200 hover:bg-white text-black m-auto py-2 px-4 border border-blue-700 rounded-3xl font-bold"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
