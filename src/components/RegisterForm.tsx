import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/authProvider";


export default function RegisterForm() {
    const {register, googleSignIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleEmailRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await register(email, password);
            router.push('/'); //Redirect to home page upon successful registration
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await googleSignIn();
            router.push('/'); //Redirect to home page upon successful registration
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-[24px] shadow-lg w-[500px] h-[450px] overflow-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleEmailRegister} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-[24px] w-full focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded-[24px] hover:bg-blue-600 transition-colors">
                        Register with Email
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="bg-red-500 text-white py-2 rounded-[24px] hover:bg-red-600 transition-colors"
                    >
                        Register with Google
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}