// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(); // callback to refresh App
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{isNew ? "Create Account" : "Login"}</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleAuth}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {isNew ? "Sign Up" : "Login"}
      </button>
      <p
        onClick={() => setIsNew(!isNew)}
        className="text-sm text-blue-600 mt-4 cursor-pointer text-center"
      >
        {isNew ? "Already have an account? Login" : "New here? Create account"}
      </p>
    </div>
  );
};

export default Login;
