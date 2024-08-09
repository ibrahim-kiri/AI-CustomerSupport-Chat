'use client';

import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <>
      <div className="bg-clip-text bg-gradient-to-r from-white  to-gray-300">
        <h1 className="font-extrabold text-5xl md:text-6xl text-center mt-5 md:mt-7 text-transparent">
          AI CHAT
        </h1>
      </div>
      <ChatWindow />;
    </>
  );
}
