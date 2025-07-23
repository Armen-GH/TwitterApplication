import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Twitter } from "lucide-react"; 
import { signupUser, loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    try {
      if (isLogin) {
        const data = await loginUser({ email, password });
        setStatus("Login successful!");
        console.log("Token:", data.token);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ⏩ Redirect to home page
        navigate('/');
      } else {
        const data = await signupUser({ username, email, password });
        setStatus("Account created!");
        console.log("Signed up:", data);

        // Optional: auto-login after sign up
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-6">
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

        {/* Messages */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {status && <p className="text-green-500 text-sm text-center">{status}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded font-semibold"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

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
