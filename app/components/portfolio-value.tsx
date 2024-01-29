"use client";

import { calculatePortfolioValue } from "../actions/calculatePortfolioValue";
import { PORTFOLIO } from "../constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function PortfolioValues(props: {
  portfolioValue?: Awaited<ReturnType<typeof calculatePortfolioValue>>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const timestamp = new Date().toLocaleString("da-DK", {
    timeZoneName: "short",
  });

  return (
    <section className="w-full p-4 gap-2">
      {Object.keys(PORTFOLIO).map((key) => {
        if (!searchParams.has(key)) return null;
        return (
          <input
            key={key}
            type="hidden"
            name={key}
            value={searchParams.get(key)?.toString()}
          />
        );
      })}

      <h1 className="text-2xl font-bold">Portfolio Value</h1>
      <div className="flex py-1">
        <h2 className="text-4xl font-bold">
          {Intl.NumberFormat("da-DK", {
            style: "currency",
            currency: "USD",
          }).format(props.portfolioValue || 0)}
        </h2>
        <sub className="text-xs">
          {/* {timestamp} */}
        </sub>
      </div>

      <button
        onClick={() => router.refresh()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Calculate
      </button>

      <button
        type="button"
        onClick={() => router.push("/" + window.location.search)}
        className="hover:font-black"
      >
        home
      </button>
    </section>
  );
}
