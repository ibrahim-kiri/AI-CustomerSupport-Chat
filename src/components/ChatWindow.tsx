'use client';

import { useAuth } from '@/firebase/authProvider';
import { auth, firestore } from '@/firebase/firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'; // Added `orderBy`
import { useState, useEffect, useRef } from 'react';

export default function ChatWindow() {
  type Message = {
    role: string;
    content: string;
    timestamp: Date; // Added `timestamp` field
  };

  const { logout } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const q = query(
          collection(firestore, 'chats'),
          where('userId', '==', userId),
          orderBy('timestamp') // Added `orderBy` to ensure messages are fetched in chronological order
        );
        const querySnapshot = await getDocs(q);
        const fetchedMessages: Message[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            role: data.role,
            content: data.content,
            timestamp: data.timestamp.toDate(), // Convert Firestore timestamp to JS Date object
          };
        });

        // Set messages, ensuring initial assistant message is included if no messages exist

        setMessages(
          fetchedMessages.length > 0
            ? fetchedMessages
            : [
                {
                  role: 'assistant',
                  content:
                    "Hi! I'm the Headstarter support assistant. How can I help you today?",
                  timestamp: new Date(),
                },
              ]
        );
      }
    };

    fetchMessages();
  }, []); // Fetch messages on component mount

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [messages]); // Scroll to the bottom whenever messages are updated

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(), // Added `timestamp` to new user message
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setUserMessage('');
    setLoadingResponse(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: userMessage }),
        cache: 'no-store',
      });

      if (response.status === 201) {
        const { assistantResponse } = await response.json();
        const newAssistantMessage = {
          role: 'assistant',
          content: assistantResponse,
          timestamp: new Date(), // Added `timestamp` to new assistant message
        };

        setMessages((prev) => [...prev, newAssistantMessage]);
        setLoadingResponse(false);

        // Save both user and assistant messages to Firestore, with timestamps
        await addDoc(collection(firestore, 'chats'), {
          userId: user.uid,
          ...newUserMessage, // Save user message with timestamp
        });
        await addDoc(collection(firestore, 'chats'), {
          userId: user.uid,
          ...newAssistantMessage, // Save assistant message with timestamp
        });
      } else {
        const { error } = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: 'error', content: error, timestamp: new Date() }, // Added `timestamp` to error message
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-90 md:w-full max-w-3xl bg-white shadow-lg rounded-[24px]">
        <button
          onClick={handleLogout}
          className="absolute top-1 text-sm md:text-base md:top-3 right-3 bg-red-500 text-white p-2 rounded-[24px] hover:bg-red-600 transition-colors"
        >
          Logout
        </button>

        <div
          className="flex flex-col gap-3 bg-gray-50 p-2 overflow-y-scroll h-[480px] border border-gray-300 rounded-[24px] mb-2"
          id="chatWindow"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${
                msg.role === 'user'
                  ? 'bg-green-100 self-end'
                  : msg.role === 'assistant'
                  ? 'bg-blue-100 self-start'
                  : 'bg-red-100 self-center'
              } border border-gray-300 rounded-[24px] px-4 py-2 max-w-xs`}
            >
              <p className="text-xs font-medium text-gray-600">
                {msg.role.toUpperCase()}:
              </p>
              <p className="text-sm text-gray-800 break-words">{msg.content}</p>
            </div>
          ))}
          {loadingResponse && (
            <i className="self-start fa-solid fa-spinner fa-spin-pulse fa-xl text-gray-600"></i>
          )}
          <div ref={chatBottomRef} id="chatBottom"></div>
        </div>

        <form onSubmit={submitHandler} className="flex items-center gap-2 p-2">
          <textarea
            value={userMessage}
            onChange={changeHandler}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-[24px] focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Insert your question here"
            required
            rows={2}
            // style={{ width: 'calc(100% - 104px)' }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-[24px] hover:bg-blue-600 transition-colors"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
