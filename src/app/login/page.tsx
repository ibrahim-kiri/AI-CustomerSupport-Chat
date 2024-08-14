"use client";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (

        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    backgroundImage: `url('./images/chatbot.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // filter: 'blur(3px)',
                    zIndex: -1,
                }}
            ></div>
        
            <div className="relative z-10">
                <LoginForm />
            </div>
    </div>

    );
}