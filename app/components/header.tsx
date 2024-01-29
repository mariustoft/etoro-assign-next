"use client";

import { useRouter } from "next/navigation";
export default function Header(props: { title?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/" + window.location.search)}
      className="text-4xl font-bold flex justify-around items-center text-center text-color-red m-1 relative"
    >
      <p className="text-4xl self-end px-1 font-bold hover:text-green-500  absolute left-0">
        ₿
      </p>
      {props.title?.toString()}
    </button>
  );
}
