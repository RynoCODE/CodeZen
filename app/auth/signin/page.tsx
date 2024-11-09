// app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard"); // Redirect on successful sign-in
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white gap-5 bg-zinc-800">
      <div>
        <img
          className="h-96 w-auto rounded-xl m-2"
          src="https://img.freepik.com/free-photo/digital-art-style-illustration-graphic-designer_23-2151536971.jpg?t=st=1727182044~exp=1727185644~hmac=8ce892e261faa994453bdbc4618f7a55bda73fe88ac22bf6fd8586b520d717a7&w=1060"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-7xl text-white font-bold mb-5">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-white flex flex-col gap-2">
            <label className="mr-5">Email</label>
            <input
              className="bg-zinc-700 p-2 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="mr-5">Password</label>
            <input
              className="bg-zinc-700 p-2 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="py-2 mt-4 text-xl font-semibold rounded bg-green-500 hover:bg-green-600"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-gray-400 font-thin text-center mt-1">
              don't have an account ? ?{" "}
              <a
                className="text-white font-medium hover:underline"
                href="/auth/signup"
              >
                sign Up
              </a>
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
