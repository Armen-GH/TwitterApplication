import { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter } from "lucide-react"; // or use any Twitter icon SVG

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-6">
        {/* Twitter Logo */}
        <div className="flex justify-center">
          <Twitter size={36} className="text-blue-500" />
        </div>

        {/* Tabs */}
        <div className="flex justify-around">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-lg font-semibold py-2 px-4 rounded ${
              isLogin ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-semibold py-2 px-4 rounded ${
              !isLogin ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded font-semibold"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Platform Intro */}
        <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-700">
          <p>Discover what's happening in the world right now.</p>
          <Link
            to="/about"
            className="text-blue-400 hover:underline mt-2 inline-block"
          >
            Learn more about this platform →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
