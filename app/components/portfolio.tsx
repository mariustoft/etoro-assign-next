"use client";

import { useRouter } from "next/navigation";
import { PORTFOLIO } from "../constants";
import { getUpdatedUrl } from "../tools/getUpdatedUrl";

export default function Portfolio(props: {
  searchParams: { [key: string]: string };
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-black text-white">
      <h1 className="text-4xl mb-8 text-green-500">Portfolio</h1>
      {Object.entries(PORTFOLIO).map(([key, value]) => {
        return (
          <button
            key={key}
            className="flex flex-row items-center justify-between w-full max-w-md px-4 py-2 mb-4 bg-green-500 rounded"
            onClick={(e) => {
              window.history.replaceState(
                null,
                "",
                getUpdatedUrl({ coin: key, amount: value.toString() })
              );
            }}
          >
            <p className="text-lg font-bold">{key}</p>
            <p className="text-lg">{value}</p>
          </button>
        );
      })}
    </section>
  );
}
