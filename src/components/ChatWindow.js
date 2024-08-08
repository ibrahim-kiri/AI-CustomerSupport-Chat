import { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);

  const [userMessage, setuserMessage] = useState('');

  const changeHandler = (e) => {
    setuserMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setuserMessage('');
  };

  return (
    <div className="flex flex-col w-3/5 md:w-1/2 mx-auto bg-red-400 p-10 gap-3 mt-12 md:mt-36 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
      <div
        className="flex text-wrap flex-col gap-5 bg-white p-6 overflow-y-scroll h-80 border border-gray-900 rounded-md"
        id="chatWindow "
      >
        {messages.map((msg) => {
          return (
            <div
              className={`${
                msg.role === 'user'
                  ? 'bg-green-300 self-end '
                  : 'bg-blue-400 self-start '
              } border border-black rounded text-xs md:text-base w-90 md:w-1/2 text-wrap px-2 py-1 flex flex-col gap-3 `}
            >
              <p className="text-sm opacity-40 font-bold border-b border-black border-opacity-35">
                {msg.role.toUpperCase()}:
              </p>
              <p> {msg.content}</p>
            </div>
          );
        })}
      </div>
      <div id="promptArea mt-3">
        <form onSubmit={submitHandler} className="flex flex-col gap-2 ">
          <textarea
            value={userMessage}
            onChange={changeHandler}
            className="px-3 py-1 rounded border border-gray-900  "
            placeholder="Insert your question here"
          />
          <button
            type="submit"
            className="bg-gray-200 hover:bg-white text-black m-auto py-2 px-4 border border-blue-700 rounded font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
