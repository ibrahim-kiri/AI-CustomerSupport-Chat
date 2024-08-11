import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/authProvider';

export default function LoginForm() {
  const { login, googleSignIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      router.push('/'); //Redirect to home page upon successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push('/'); //Redirect to home page upon successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md">
        <h2 className=" text-xl md:text-3xl font-bold text-center mb-6 text-gray-700 text-wrap">
          Welcome to Chat Support Assistant
        </h2>
        <div className="bg-white p-8 shadow-lg rounded-[24px] w-80 md:w-[500px] h-[400px] overflow-auto">
          {error && <p className="text-red-500 mb-4">error</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mt-1 px-3 py-2 border border-gray-300 rounded-[24px] w-full focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 px-3 py-2 border border-gray-300 rounded-[24px] w-full focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="on"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-[24px] hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-red-500 text-white py-2 rounded-[24px] hover:bg-red-600 transition-colors"
            >
              SignIn with Google
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
