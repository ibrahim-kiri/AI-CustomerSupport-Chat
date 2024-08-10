import ChatWindow from '@/components/ChatWindow';

export const metadata = {
  title: 'Support Chat',
  description: 'Customer Support Chat',
};

export default function Home() {
  return (
    <>
      <div className="bg-clip-text bg-gradient-to-r from-white  to-gray-300">
        <h1 className="font-extrabold text-2xl md:text-4xl text-center mt-2 mb-2 md:mt-3 text- text-gray-800">
          ai chat
        </h1>
      </div>
      <ChatWindow />;
    </>
  );
}
