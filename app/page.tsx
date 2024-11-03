import Image from "next/image";
import { Appbar } from "./components/appbar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-white h-96 w-full">
      <h1 className="text-4xl font-serif font-bold">Leetcode</h1>
      <Appbar />
      <h1>Home</h1>
      <a href="/auth/signup">signup</a>
      <a href="/auth/signin">signin</a>
    </div>
  );
}
