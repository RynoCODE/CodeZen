// import Image from "next/image";
// import { Appbar } from "../components/appbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-white bg-zinc-900 h-screen w-full pt-40">
      <h1 className="text-7xl font-serif font-bold">C o d e Z e n</h1>
      <p className="text-2xl font-thin text-zinc-600 mt-1 mb-2">
        A platform to practice coding
      </p>
      <div className="bg-zinc-800 flex gap-12 text-xl font-medium px-10 py-4 rounded-xl mt-5 shadow-lg shadow-orange-500">
        <a
          className="text-xl font-medium hover:text-orange-500"
          href="/dashboard"
        >
          Dashboard
        </a>
        <a
          className="text-xl font-medium hover:text-orange-500"
          href="/auth/signup"
        >
          signup
        </a>
        <a
          className="text-xl font-medium hover:text-orange-500"
          href="/auth/signin"
        >
          signin
        </a>
      </div>
    </div>
  );
}
