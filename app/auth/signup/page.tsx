// app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth/signin");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white gap-5">
      <div>
        <img
          className="h-96 w-auto rounded-xl m-2"
          src="https://img.freepik.com/free-photo/digital-art-style-illustration-graphic-designer_23-2151536971.jpg?t=st=1727182044~exp=1727185644~hmac=8ce892e261faa994453bdbc4618f7a55bda73fe88ac22bf6fd8586b520d717a7&w=1060"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-7xl text-white font-bold mb-5">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-white flex flex-col gap-2">
            <label className="mr-5">Email</label>
            <input
              className="bg-zinc-800 p-2 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="mr-5">Password</label>
            <input
              className="bg-zinc-800 p-2 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="py-2 mt-4 text-xl font-semibold rounded bg-green-500 hover:bg-green-600"
              type="submit"
            >
              Sign Up
            </button>
            <p className="text-gray-400 font-thin text-center mt-1">
              Already have an account ?{" "}
              <a
                className="text-white font-medium hover:underline"
                href="/auth/signin"
              >
                sign In
              </a>
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
